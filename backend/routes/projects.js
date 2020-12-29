var express = require('express');
var fs = require('fs');
const db  = require("monk")('localhost:27000/personalpage')
var router = express.Router();

function readFiles(dirname, onFileContent, onError) {
    let fileCount = [];
    fs.readdirSync(dirname, function (err, filenames) {
      if (err) {
        onError(err);
        return;
      }
      filenames.forEach(function (filename) {
        fs.readFile(dirname + filename, "utf-8", function (err, content) {
          if (err) {
            onError(err);
            return;
          }
          fileCount.push(filename);
          onFileContent(filename, content);
        });
      });

    });
    console.log(fileCount)
    return fileCount
  }

const onError = (err) => {
    console.log(err);
}

const onFileContent = (fileName,content) => {
    console.log(fileName);
}

/* GET projects listing. */
router.get('/', function(req, res , next) {
  const fileDir = './public/projects/'
  let files = [];
  try{
    const collection = db.get('projects')
    const allProjects = collection.find()
    .then((docs) => {
        // docs contains the documents inserted with added **_id** fields
        // Inserted 3 documents into the document collection
        res.json({'collections':docs})
    })
    .then(() => db.close())
  }
  catch (err) {
    res.json({'collections':[]})
    console.log(err);
  }
});

router.get('/:slug/preview', function(req, res , next) {
    const fileDir = './public/projects/'
    let files = [];
    const fileName = req.params.slug
    try{
        //fileContent = fs.readFileSync(fileDir + fileName + '.md',encoding="utf-8");
        const projects = db.get('projects')
        const doc = projects.findOne({'slug':fileName})
        .then((doc)=>{
            res.json({'content':{'title':doc.title,'description':doc.description}});
        }   
        )
        .then(() => db.close())
        
    }
    catch (err) {
      console.log(err);
      res.json({'content':[]})
    }
    
  });

module.exports = router;