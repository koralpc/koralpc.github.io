import Typist from "react-typist";
import {
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import getUserLocale from "get-user-locale";
import profilePic from "../static/li_photo.jpg";
const HomeHeaderView = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "5%",
      display: "flex",
      //(props.themeState === "light" ? "black" : "white"),
      height: 400,
      width: "80%",
      justifyContent: "right",
      marginLeft: "5%",
      marginRight: "5%",
      textAlign: "right",
    },
    header: {
      color: "inherit",
      fontSize: 80,
      display: "flex",
      fontFamily: "Cinzel",
      paddingTop: "10%",
      paddingLeft: "10%",
      height: 200,
    },
    headerImg: {
      height: "100%",
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
        <Typography variant="h2">
          <Typist>
            <Typist.Delay ms={500} />
            <a>Hello! I am <a style= {{color:"orange"}}>Koralp.</a> </a>
          </Typist>
        </Typography>
      </div>
    </div>
  );
};

export default HomeHeaderView;
