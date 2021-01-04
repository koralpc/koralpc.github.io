import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link, useHistory } from "react-router-dom";

export default function ProjectCard(props) {
  
  const styleArray = {
    phone: {
      titlefontSize: "9px",
      bodyfontSize : "8px",
      descFontSize : "8px",
    },
    midTier: {
      titlefontSize: "15px",
      bodyfontSize : "13px",
      descFontSize : "11px",
    },
    laptop: {
      titlefontSize: "20px",
      bodyfontSize : "16px",
      descFontSize : "14px",
    },
    large: {
      titlefontSize: "28px",
      bodyfontSize : "24px",
      descFontSize : "16px",
    },
  };

  const useStyles = makeStyles({
    root: {
      //minWidth: 275,
      width: "90%",
      height: "380px",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: styleArray[props.themeStyle].titlefontSize,
    },
    pos: {
      marginBottom: 12,
      fontSize:styleArray[props.themeStyle].descFontSize,
    },
    body: {
      fontSize: styleArray[props.themeStyle].bodyfontSize,
    },
  });

  const classes = useStyles();
  const history = useHistory();
  return (
    <Card className={classes.root}>
      <CardContent style={{ height: "330px" }}>
        <Typography variant="caption" color="textSecondary" style = {{fontSize:styleArray[props.themeStyle].descFontSize}}>
          Blog Post
        </Typography>
        <Typography className={classes.title} component="h2">
          {props.title}
        </Typography>
        <Typography
          className={classes.pos}
          variant="subtitle2"
          color="textSecondary"
        >
          {props.date} | {props.duration} minute read
        </Typography>
        <Typography className={classes.body} component="p">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => history.push(`/projects/${props.slug}`)}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
