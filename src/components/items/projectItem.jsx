import axios from "axios";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import ReactMarkdownWithHtml from "react-markdown/with-html";
import { makeStyles } from "@material-ui/core/styles";
import CodeBlock from "./codeblock";
import { Avatar, Divider, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Button, Box } from "@material-ui/core";
import Loader from "react-loader-spinner";
//import markdownURI from './foo2.md';

const ProjectItem = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      background: "#fafafa",
    },
    container: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "70%",
      overflow: "hidden",
      background: "#fafafa",
      color: "#303030",
      // justifyContent : "center",
      // alignContent: "center",
    },
    headerContainer: {
      //textAlign : "center",
      width: "50%",
    },
    header: {
      color: "inherit",
      paddingLeft: "5%",
      paddingTop: "2%",
      fontSize: 30,
      display: "flex",
      fontFamily: "Cinzel",
      marginBottom: "-75px",
      height: 200,
    },
    divider: {
      //color: (props.themeState === "light" ? "black" : "white"),
      backgroundColor: "#303030",
      marginTop: "2%",
      height: 2,
      justifyContent: "center",
    },
    backButton: {
      color: "#303030",
      border: "2px solid silver",
      marginLeft: "15%",
      marginTop: "5%",
    },
    avatar: {
      marginLeft: "60%",
      // marginTop : "20px",
      marginBottom: "-100px",
      paddingTop: "10px",
      float: "left",
    },
    loader:{
        marginLeft:"45%",
        marginRight: "45%",
        paddingTop:"5%"
    },
    loaderHeader :{
        color:"black",
        backgroundClip:"black",
        marginLeft:"20%",
        marginRight:"10%",
        paddingTop:"10%"
    }
  }));

  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState({
    title: "",
    description: "",
    markdown: "",
    duration: "0",
    date: "",
  });
  const [loading, setLoading] = useState(true);
  const markdownURI = `https://koralp-page-backend.herokuapp.com/projects/${props.match.params.project_name}`;

  React.useEffect(() => {
    setTimeout(() => { 
    axios
      .get(markdownURI)
      .then((response) => {
        const itemCount = Object.keys(response.data.content).length;
        if (itemCount > 0){
            const responseData = { ...response.data.content };
            setData(responseData);
            setLoading(false);
        }
        else{
            history.push('/')
        }

      })
      .catch((err) => {
        console.log(err);
        setData({
          title: "",
          description: "",
          markdown: "",
          duration: "0",
          date: "",
        });
        setLoading(false);
      });}, 2000);}, [markdownURI]);
  return (
    <div className={classes.root}>
      {loading ? (
        <div style={{height:"1200px"}}>
            <Typography variant="h2" className={classes.loaderHeader}>
                Page is loading, please wait.
            </Typography>
          <Loader type="Rings" color="black" className={classes.loader}/>
        </div>
      ) : (
        <div className={classes.root}>
          <Button
            onClick={() => history.push("/")}
            className={classes.backButton}
          >
            Back
          </Button>
          <div className={classes.container}>
            <Typography variant="h2" className={classes.header}>
              {data.title}
            </Typography>
            <div className={classes.avatar}>
              <Typography style={{ float: "left", marginTop: "10px" }}>
                {data.date} | {data.duration} minute read
              </Typography>
              <Box ml={3} style={{ float: "left" }} />
              <Avatar style={{ float: "right" }}>K</Avatar>
            </div>
            <div className={classes.headerContainer}>
              <Typography variant="caption">{data.description}</Typography>
            </div>
            <Divider className={classes.divider} />
            <ReactMarkdownWithHtml
              children={data.markdown}
              allowDangerousHtml
              renderers={{ code: CodeBlock }}
              //   transformImageUri={uri =>
              //     uri.startsWith("http") ? uri : `http://localhost:3000/${uri}`
              //   }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectItem;
