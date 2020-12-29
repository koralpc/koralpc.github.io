---
title: "Tweet Streaming and Visualization for Corona"
layout: post
date: 2020-04-09 12:24
tag: [Tweepy,MongoDB,Mapquest/Geocoding,Folium,]
projects: true
hidden: true # don't count this post in blog pagination
description: "This post carries on an extensive tutorial about creating a multimodal model using LSTM and CNN which will be used in a visual QA task"
author: Koralp Catalsakal
externalLink: false
---

Hello there! 
Today we will work on a project that is related to a recent topic around the world.
In this project, we will be visualizing a global distribution of tweets that are related to corona virus per country.
By doing this, the main aim is to practice data analysis over streaming data, further improve our visualization skills
and finally practice using custom API's through Python with MongoDB.

## Table Of Contents

* [Setup for the API's ](#setup)
* [Data Acquisition & Analysis](#analysis)
* [Visualization of the results ](#visualization)
* [Results](#results)


## Setup for the API's <a name ="setup">

First step for our program is to both import the necessary libraries
that are to be used.
```python
import pymongo
from pymongo import MongoClient
import tweepy
import json
import re
import requests
import pandas
import folium
import math
```
Then, it is necessary to acquire the API keys for the following
  * Twitter Developer : To be used for streaming tweets
  * Mapquest : Used in geocode querying per location name
  * MongoDB (IP & Port address) : Used by the cursor to locate the DB

```python
#Twitter Developer
consumer_key = 'cons_key_1'
consumer_secret = 'cons_secret_1'
access_token = 'accesss_token'
access_token_secret = 'access_token_secret'
#Mapquest API -> Do not touch the url
geocode_key = 'geocode_key'
geocode_secret = 'geocode_secret'
geocode_url = 'https://www.mapquestapi.com/geocoding/v1/address?key={0}&inFormat=kvp&outFormat=json&'.format(geocode_key)
```

Now, using `tweepy`, we can authoratize our application via the API keys we have gathered.

```python
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
api = tweepy.API(auth)
```

Furthermore, we also setup the `MongoClient` using pymongo, which will communicate with our MongoDB server at the backend.
If your server is local, this setup should be by default, so no need to change

```python
client = MongoClient()
client = MongoClient('localhost', 27017)
```

Hence, once the connection is established, we can have a peak at the DB.
Here, on my local computer, I have different databases, but I will be using `journaldev`
However, if you do not have a ready database for use, you can easily create from pymongo.

```python
client.list_database_names()
```

    ['journaldev', 'local', 'sample', 'test']

Furthermore, each DB has different collections. Here, we can list them and see.
For this task, I will be needing the `tweets` and `countries` collections.

```python
db = client.journaldev
db.list_collection_names()
```

    ['countries', 'users', 'tweets']

This command simply assigns a cursor to the variable, so we can directly operate over the collections via the variables.

```python
tweet_collection = db.get_collection('tweets')
country_collection = db.get_collection('countries')
```

Finally, the last step before streaming is to define the StreamListener class of `tweepy`.
Without overriding, the class has the functionality to stream data, but we want to make use of this to insert the streamed tweets to our MongoDB collections.
Since the streamer returns raw_data, we convert it into **JSON** format and insert to collection.
```python
class MyStreamListener(tweepy.StreamListener):
    def on_data(self, raw_data):
        try:
            data = json.loads(raw_data)
            #print(data)
            tweet_collection.insert_one(data)
            print('\n Inserted new tweet into DB!')
            #return data
        except :
            print('An Error Has Occured!')
```

## Data Acquisition & Analysis <a name = "analysis">
Then, we instantinate the StreamListener, and call it to track the global tweets that include the keyword `corona`.
The tracking can be made much more rigorous, but for this example, I believe a simple demo will do.
```python
myStreamListener = MyStreamListener()
myStream = tweepy.Stream(auth = api.auth, listener=myStreamListener)
myStream.filter(track = ['corona'])
```
    
     Inserted new tweet into DB!
    
     Inserted new tweet into DB!
    
     Inserted new tweet into DB!
    
     Inserted new tweet into DB!
    
     Inserted new tweet into DB!
    
     Inserted new tweet into DB!
    
     Inserted new tweet into DB!
    
     Inserted new tweet into DB!
    
     Inserted new tweet into DB!
    
     Inserted new tweet into DB!
    
     Inserted new tweet into DB!
    
     Inserted new tweet into DB!
    
     Inserted new tweet into DB!
    
     Inserted new tweet into DB!
    
     Inserted new tweet into DB!
    
If we examine some of the tweets, we see that the `user.location` field is sometimes `None` or 
in the form of an IP address. Since our geocoding library can't resolve these inputs, we delete these records from our collection.
```python
tweet_collection.delete_many({'user.location' : {'$regex': '[0-9]$'}})
tweet_collection.delete_many({'user.location' : None})
```

Now, we create an empty dictionary, which will hold the geo-location of each user.location

```python
locations_dict = {}
```

This will be our calling method. We will strip the location data from the JSON data for each tweet,
and then we will query the Mapquest API, and return the `latitude`,`longitude` and `country code` data per request.
However, not every query can return a country code, which we will have to take care of later.

```python
def request_loc(loc):
    req_url = geocode_url + 'location=' + loc + '&thumbMaps=false'
    r = requests.get(url = req_url) 
    data = r.json()['results'][0]['locations'][0]['latLng']
    return [data,r.json()['results'][0]['locations'][0]['adminArea1']]
```

At this stage, we have the lat-long values for each tweet in our collection, and the country code value for some of them.
Therefore, the next step is to assign a country value to each tweet.
We can do this in two ways:
 * If country code for tweet exists, assign the country with the corresponding code
 * If country code for tweet does not exist, use Euclidean distance to assign the closest country to the given geoloc.

Thus, the function below achieves this functionality.

```python
def minidx_dist(countries_df,df):
    includes_code = countries_df[countries_df['code'] == df['code']]
    if includes_code.shape[0] == 0:
        dists = countries_df.apply(lambda x : math.sqrt((x['lat'] - df['lat'])**2 + (x['lng'] - df['lng'])**2),axis = 1)
        return dists.idxmin()
    else:
        return includes_code.index[0]
```

Now, we can call the `request_loc` over each tweet, and store the reurning data.
Moreover, in our `locations_dict` dictionary defined above, we will hold the tweet count per location.

```python
for tweets in tweet_collection.find():
    loc = tweets['user']['location']
    data_pair = request_loc(loc)
    data = data_pair[0]
    data['code'] = data_pair[1]
    data['count'] = 1
    if loc in locations_dict.keys():
        locations_dict[loc]['count'] += 1
    else:
        locations_dict[loc] = data
```

Now, the final operation regarding the data analysis is that we will convert the dictionary to a dataframe.
Then, using the `minidx_dist` function, we will assign the tweets to their respective countries, and we will sum the total amount of tweet per country.
Finally, we will also update our databases accordingly.

```python
df = pandas.DataFrame.from_dict(locations_dict).transpose().reset_index()
#Internal mapquest error
df= df[(df['lat'] != 39.390897) & (df['lng'] != -99.066067)]
#
countries_df = pandas.read_csv('countries_loc.csv')
df['Country'] = df.apply(lambda x: countries_df.loc[minidx_dist(countries_df,x),'Country'],axis = 1)
df_country_summed = df.groupby('Country').agg({'count':'sum'})
df_country_summed.reset_index(inplace = True)
df_dict = df_country_summed.to_dict('records')
collection_df = pandas.DataFrame(list(country_collection.find({},{'_id':0})))
insert_collection = pandas.concat([collection_df, df_country_summed]).groupby(["Country"], as_index=False)["count"].sum()
insert_dict = insert_collection.to_dict('records')
country_collection.delete_many({})
country_collection.insert_many(insert_dict)
tweet_collection.delete_many({})
```

## Visualization <a name = "visualization">

For visualization, we need multiple features together. Therefore, we can first join the tables we have
for ease of use.

```python
merged_df = countries_df.merge(insert_collection, on = 'Country')
merged_df.head()
```

Here is an example of the final table we have:

<div>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Country</th>
      <th>geoloc</th>
      <th>lat</th>
      <th>lng</th>
      <th>code</th>
      <th>count</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>Afghanistan</td>
      <td>[{'lng': 65.664803, 'lat': 33.513199}, 'AF']</td>
      <td>33.513199</td>
      <td>65.664803</td>
      <td>AF</td>
      <td>4.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>Albania</td>
      <td>[{'lng': 20.168331, 'lat': 41.153332}, 'AL']</td>
      <td>41.153332</td>
      <td>20.168331</td>
      <td>AL</td>
      <td>5.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>Algeria</td>
      <td>[{'lng': 3.060066, 'lat': 36.775348}, 'DZ']</td>
      <td>36.775348</td>
      <td>3.060066</td>
      <td>DZ</td>
      <td>9.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>Angola</td>
      <td>[{'lng': 17.2801, 'lat': -12.2971}, 'AO']</td>
      <td>-12.297100</td>
      <td>17.280100</td>
      <td>AO</td>
      <td>2.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>Argentina</td>
      <td>[{'lng': -65.143982, 'lat': -35.189907}, 'AR']</td>
      <td>-35.189907</td>
      <td>-65.143982</td>
      <td>AR</td>
      <td>94.0</td>
    </tr>
  </tbody>
</table>
</div>


Now, we create a `folium` map with zoomed out enough to capture the world map 

```python
visual_map = folium.Map(location = [39.390897,-99.066067],zoom_start=2)
```

For each country in our table, we put a marker into the map, in which we write the total tweet count for that country

```python
merged_df.apply(lambda x: folium.Marker([x['lat'], x['lng']], popup='Total tweets: {0}'.format(x['count']), 
                                 tooltip='Info about: {}'.format(x['Country']))
                                 .add_to(visual_map),axis = 1)
```

Next step is to add a Choropleth layer on top our map, for better interpretability.
The geojson data is taken from an online resource.

```python
geoson_data_url = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
folium.Choropleth(
    geo_data=geoson_data_url,
    name='choropleth',
    data=insert_collection,
    columns=['Country', 'count'],
    key_on='properties.ADMIN',
    fill_color='YlGn',
    fill_opacity=0.7,
    line_opacity=0.2,
    legend_name='Tweet Count'
).add_to(visual_map)
```

Finally, we can visualize our map to observe the outcome and play with it.
```python
visual_map
```
<iframe src="..\assets\map.html" style="width:100%; height:500px;overflow:auto;"></iframe>

## Conclusion <a name ="conclusion">

In this project, we managed to build a geographical visualization of tweets related to corona from scratch.
While doing this, we have only used open-source technologies, or free accounts. Therefore, for mapquest and twitter developer, the amount of request are rather limited, and prevents this application to scale into production level.

However, for a hobby based project, you can try this example to practice various skills, and learn more about how you can use Python in conjunction to different technologies.
