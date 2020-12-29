import AppToolBar from "./../components/appbar";
import {
  Avatar,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Card,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { useState } from "react";
import React from "react";
import authorPic from "../static/author_pic.jfif";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2%",
    marginLeft : "2%"
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  avatar: {
    width : theme.spacing(10),
    height : theme.spacing(10)
  },
  previewCard :{
    //maxHeight : 400,
    maxWidth : 450,
    height : 400
  }
}));

const fetchProject = (e) => {
  const projectName = e.currentTarget.getAttribute("projectname");
  axios
    .get(`http://localhost:4000/projects/${projectName}`)
    .then((res) => {
      return;
    })
    .catch((error) => {
      console.log(error);
    });
};

const RenderProject = (project) => {
  const classes = useStyles();
  return (
    <div>
      {/* <Grid container className={classes.container}> */}
        <Card className ={classes.previewCard}>
          <CardHeader
            // avatar={
            //   <Avatar aria-label="author" className = {classes.avatar} alt="Koralp Catalsakal" src ={authorPic}/>
            // }
            title={<Typography variant ="h5"> {project.params.title}</Typography>}
            subheader={<Typography variant ="subtitle2">Around {project.params.duration} mins of reading</Typography>}
          ></CardHeader>
          <CardContent>
            <Typography>{project.params.description}</Typography>
          </CardContent>
        </Card>
      {/* </Grid> */}
    </div>
  );
};

export default function ProjectView(props) {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:4000/projects/`)
      .then((res) => {
        if (res.data.collections.length > 0) {
          setPosts(res.data.collections);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const projectRenders = posts.map((post) => (
    <Grid item key={post.slug}>
    <RenderProject
      params={{
        title: post.title,
        description: post.description,
        duration: post.duration
      }}
    />
    </Grid>
  ));

  return (
    <div>
      <AppToolBar
        toggleTheme={props.toggleTheme}
        brightnessIcon={props.brightnessIcon}
      />
      <Grid container className={classes.root} spacing={4}>
        {(posts.length > 0) ? 
        projectRenders 
        :
        null}
      </Grid>
      {/* <Button onClick={fetchProject} projectname="visualqa">Click me!</Button> */}
      {/* <ReactMarkdown source={stateContent} open ={openState}/> */}

    </div>
  );
}
