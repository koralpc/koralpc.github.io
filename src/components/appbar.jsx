import { React } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import MenuIcon from "@material-ui/icons/Menu";
import { ButtonGroup } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {Link} from 'react-scroll'

export default function AppToolBar(props) {

  const styleArray = {
    phone: {
      fontSize : "10px",
      spacing: 1,
    },
    midTier: {
      fontSize : "12px",
      spacing: 2,
    },
    laptop: {
      fontSize : "18px",
      spacing: 3,
    },
    large: {
      fontSize : "20px",
      spacing: 4,
    },
  };

  const useStyles = makeStyles((theme) => ({

    appBar:{
      position:"sticky",
      display:"flex",
      background: "#303030",
      color: "#fafafa",
      width:"100%"
    },
    title :{
      color : "#fafafa"
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(styleArray[props.themeStyle].spacing),
    },
    rightMenuButton: {
      marginLeft: "auto",
    },
    scrollButton:{
      color: "#fafafa",
      fontSize:styleArray[props.themeStyle].fontSize,
      whiteSpace:"normal",
      wordBreak:"break-word",
    }
  }));
  
  const classes = useStyles();
  const history = useHistory();

  return (
    <div  className={classes.appBar}>
      <AppBar  className={classes.appBar}>
        <Toolbar>
          <Button>
          <Typography variant="h6" className={classes.title}  onClick={() => {
                history.push("/");
              }}>
            Koralp's page
          </Typography>
          </Button>
          <ButtonGroup
            className={classes.rightMenuButton}
            color="inherit"
            aria-label="button-group"
          >
            <IconButton onClick={props.toggleTheme} component ="span">
            {props.brightnessIcon()}
            </IconButton>
            {/* <Button
              color="inherit"
              onClick={() => {
                history.push("/about");
              }}
            >
              About
            </Button>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/projects");
              }}
            >
              Projects
            </Button> */}
            {/* <Button color="inherit" href="mailto:mrkoralp@gmail.com">
              Contact
            </Button> */}
          </ButtonGroup>

          <Button className={classes.scrollButton}>
          <Link to="header" spy={true} smooth={true} offset={-70}>Home</Link>
            </Button>
          <Button className={classes.scrollButton}>
          <Link to="about" spy={true} smooth={true} offset={-70}>About Me</Link>
            </Button>
            <Button className={classes.scrollButton}>
              <Link to="techstack" spy={true} smooth={true} offset={-60}>Technologies</Link>
            </Button>
            <Button className={classes.scrollButton}>
              <Link to="projects" spy={true} smooth={true} offset={-60}>Projects</Link>
            </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
