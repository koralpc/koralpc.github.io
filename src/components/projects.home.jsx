import React, { useState } from "react";
import axios from "axios";
import { makeStyles, Typography } from "@material-ui/core"
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import ProjectCard from "./items/projectCard";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
const ProjectHomeView = (props) => {

    const useStyles = makeStyles((theme) => ({
        root : {
            //display:"flex",
            background : (props.themeState === "light" ? "#fafafa" : "#303030"),
            height:400,
            width:"100%",
            alignContent:"center",
            justifyContent:"center"
        },
        header : {
            color : (props.themeState === "light" ? "#303030" : "#fafafa"),
            textAlign:"center",
            paddingTop:"1%",
            paddingBottom:"3%",
            fontFamily:"system-ui",
            fontWeight:600,
        },
        carousel: {
            "width":"50%"
            }
    }));
    const [projects, setProjects] = useState([]);
    const markdownURI = `http://127.0.0.1:4000/api/projects/`;

    const renderNext = () => {
        return <NavigateNextIcon style={{height:"50px",width:"50px"}}/>
    }

    const renderBefore = () => {
        return <NavigateBeforeIcon style={{height:"50px",width:"50px"}} />
    }

    React.useEffect(() => {
        setTimeout(() => { 
        axios
          .get(markdownURI)
          .then((response) => {
            const responseData = response.data;
            setProjects(responseData.collections);
          })
          .catch((err) => {
            setProjects([]);
          });}, 1000);}, []);

    let items = projects.map((projectData) => {
        return <div><ProjectCard {...projectData} themeStyle= {props.themeStyle} /></div>;
    })
    const responsive = {
        0: { items: 1 },
        1: { items: 2 },
        2: { items: 3 },
    };

    const classes = useStyles();
    return (
        <div id={props.id} className={classes.root}>
            <Typography className = {classes.header} variant="h2">
                My Projects
            </Typography>
            <AliceCarousel renderNextButton= {renderNext} renderPrevButton= {renderBefore} mouseTracking infinite paddingLeft={30} autoPlay animationDuration={1200} autoPlayInterval={6000} responsive={responsive} items={items} />
        </div>
    )
}

export default ProjectHomeView