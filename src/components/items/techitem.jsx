import { makeStyles } from "@material-ui/core"
import React,{ useState } from "react";

const TechItem = (props) => {

  const styleArray = {
    phone: {
      width: "40%",
      logoWidth:"55px",
      logoHeight:"55px",
      biglogowidth:"70%",
      margin:"0.2%",
    },
    midTier: {
      width: "60%",
      logoWidth:"75px",
      logoHeight:"75px",
      biglogowidth:"80%",
      margin:"1%",
    },
    laptop: {
      width: "60%",
      logoWidth:"100px",
      logoHeight:"100px",
      biglogowidth:"100%",
      margin:"2%",
    },
    large: {
      width: "80%",
      logoWidth:"100px",
      logoHeight:"100px",
      biglogowidth:"100%",
      margin:"4%",
    },
  };

const smallLogos = ["Express","GCP","Pandas"];

const useStyles = makeStyles((theme) => ({
    item: {
        flex: "5",
      },
    logoImg: {
        width: styleArray[props.themeStyle].width,
        objectFit: "cover",
      },    
      biglogoImg: {
        width: styleArray[props.themeStyle].biglogowidth,
        objectFit: "cover",
      }, 
      logo: {
        paddingTop: "20px",
        width: styleArray[props.themeStyle].logoWidth,
        height: styleArray[props.themeStyle].logoHeight,
        float: "left",
        marginRight: styleArray[props.themeStyle].margin,
        
      },
      itemName:{
        width: "88%",
        float: "left",
        color : (props.themeState === "light" ? "white" : "black")
      },
      itemP: {
        paddingTop: "20px",
        color : (props.themeState === "light" ? "white" : "black")
      },
}));

    const classes = useStyles();
    return (
      <div className={classes.item}>
          {
            smallLogos.includes(props.name) ? 
            (
                <div className={classes.logo}>
                <img src={props.logo} alt={props.name} className={classes.biglogoImg}/>
                </div>
            )
            :
            (
                <div className={classes.logo}>
                <img src={props.logo} alt={props.name} className={classes.logoImg}/>
                </div>
            )
          }
        {/* <div className={classes.itemName}>
          <p className={classes.itemP}>{props.name}</p>
        </div> */}
      </div>
    );
  };

export default TechItem