import logo from "./logo.svg";
import "./App.css";
import AppToolBar from "./components/appbar";
import { createMuiTheme } from "@material-ui/core/styles";
import { useState } from "react";
import {
  CardMedia,
  MuiThemeProvider,
  Card,
  CardContent,
  CardActions,
  IconButton,
  CardHeader,
  Link,
} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AboutView from "./routes/about";
import ProjectView from "./routes/projects";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import profilePic from "./static/my_pic.jpg";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
  },
  card: {
    maxWidth: 400,
  },
  cardMedia: {
    height: 400,
  },
}));

function App() {
  const formatname = (user) => {
    return user.firstName + " " + user.lastName;
  };

  const [themeState, setThemeState] = useState("dark");
  const user = { firstName: "Koralp", lastName: "Catalsakal" };
  const theme = createMuiTheme({
    palette: {
      type: themeState === "dark" ? "dark" : "light",
    },
  });

  function brightnessIcon(props) {
    if (themeState === "dark") {
      return <BrightnessHighIcon />;
    } else {
      return <Brightness3Icon />;
    }
  }

  const classes = useStyles();

  const toggleTheme = () => {
    if (themeState === "light") {
      setThemeState("dark");
    } else {
      setThemeState("light");
    }
  };

  const element = <h1>Hello {formatname(user)}</h1>;
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <div>
              <AppToolBar
                position="sticky"
                toggleTheme={toggleTheme}
                brightnessIcon={brightnessIcon}
              />
              <Grid container spacing={2} className={classes.gridContainer}>
                <Grid item>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      src={profilePic}
                      component="img"
                    />
                    <CardActions spacing={theme.spacing(2)}>
                      <IconButton
                        aria-label="My LinkedIn account"
                        href="https://www.linkedin.com/in/kcatalsakal/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <LinkedInIcon />
                      </IconButton>
                      <IconButton
                        aria-label="My Github account"
                        href="https://github.com/koralpc"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <GitHubIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Mail Me!"
                        href="mailto:mrkoralp@gmail.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MailOutlineIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item>
                  <Card className={classes.card}>
                    <CardHeader
                      title="Koralp Catalsakal"
                      subheader="Software Engineer, speciality in AI"
                    />
                    <hr
                      style={{
                        color: "red",
                        backgroundColor: "red",
                        height: 3,
                      }}
                    />
                    <CardContent>
                      <Typography variant="h5" fontSize={"5rem"}>
                        About me
                      </Typography>
                      <Typography>
                        {"I'm a Junior Software Engineer currently working in "}
                        <Link
                          href="https://www.invitae.com/en"
                          color="inherit"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Invitae
                        </Link>
                        . My main interest is Machine Learning. I am from
                        Ankara, Turkey but I have been living in Belgium since 3
                        years.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Typography variant="h6" align="center">
                Thanks for visiting my page
              </Typography>
              <Typography align="center">
                Don't forget to check my detailed CV and projects!
              </Typography>
            </div>
          </Route>
          <Route path="/about">
            <AboutView
              toggleTheme={toggleTheme}
              brightnessIcon={brightnessIcon}
            />
          </Route>
          <Route path="/projects">
            <ProjectView
              toggleTheme={toggleTheme}
              brightnessIcon={brightnessIcon}
            />
          </Route>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
