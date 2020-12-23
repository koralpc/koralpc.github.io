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
import Brightness4Icon from '@material-ui/icons/Brightness4';


const useStyles = makeStyles((theme) => ({

  appBar:{
    position:"static",
    display:"flex",
    background: "inherit",
    color: "inherit"
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  rightMenuButton: {
    marginLeft: "auto",
  },
}));



export default function AppToolBar(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar  className={classes.appBar}>
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Koralp's page
          </Typography>
          <ButtonGroup
            className={classes.rightMenuButton}
            color="inherit"
            aria-label="button-group"
          >
            <IconButton onClick={props.toggleTheme} component ="span">
            {props.brightnessIcon()}
            </IconButton>
            <Button
              color="inherit"
              onClick={() => {
                history.push("/");
              }}
            >
              Main Page
            </Button>
            <Button
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
            </Button>
            {/* <Button color="inherit" href="mailto:mrkoralp@gmail.com">
              Contact
            </Button> */}
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
}
