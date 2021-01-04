import Typist from "react-typist";
import {
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import getUserLocale from "get-user-locale";
import profilePic from "../static/li_photo.jpg";
import React,{ useState } from "react";

const HomeHeaderView = (props) => {

  const styleArray = {'phone':{'imgSize':"60%","fontSize":"30px","marginLeft":"2%","marginTop":"10%","height":200,"paddingTop":"10%"},
    'midTier':{"imgSize":"75%","fontSize":"40px","marginLeft":"10%","marginTop":"5%","height":150,"paddingTop":"7%"},
    'laptop':{"imgSize": "90%","fontSize":"60px","marginLeft":"8%","marginTop":"7%","height":300,"paddingTop":"10%"},
    'large':{"imgSize": "80%","fontSize":"100px","marginLeft":"18%","marginTop":"5%","height":500,"paddingTop":"8%"}};
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: styleArray[props.themeStyle].marginTop,
      display: "flex",
      //(props.themeState === "light" ? "black" : "white"),
      //maxHeight: "10%",
      height:styleArray[props.themeStyle].height,
      width: "80%",
      justifyContent: "right",
      marginLeft: styleArray[props.themeStyle].marginLeft,
      marginRight: "5%",
      textAlign: "right",
    },
    header: {
      color: "inherit",
      fontSize: styleArray[props.themeStyle].fontSize,
      display: "flex",
      fontFamily: "Cinzel",
      marginTop: styleArray[props.themeStyle].paddingTop,
      paddingLeft: "4%",
      height: "5%",
    },
    headerText:{
      'fontSize': styleArray[props.themeStyle].fontSize,
      //marginTop: styleArray[themeStyle].paddingTop,
    },
    headerImg: {
      height: styleArray[props.themeStyle].imgSize,
      objectFit: "cover",
      borderRadius: "50%",
    },
    navButton: {
      height: 20,
      width: "20%",
      paddingTop: "-15%",
      justifyContent: "center",
      //display: "flex",
      marginLeft: "40%",
      position: "relative",
    },
  }));

  const classes = useStyles();
  const userLocale = getUserLocale();
  return (
    <div id={props.id} className={classes.root}>
      <img
        src={profilePic}
        alt="I like smiling!"
        className={classes.headerImg}
      />
      <div className={classes.header}>
        <Typography variant="h2" className={classes.headerText}>
          <Typist>
            <Typist.Delay ms={500} style={{width: "80%",marginLeft: styleArray[props.themeStyle].paddingTop}}/>
            <a>Hello! I am <a style= {{color:"orange"}}>Koralp.</a> </a>
          </Typist>
        </Typography>
      </div>
    </div>
  );
};

export default HomeHeaderView;
