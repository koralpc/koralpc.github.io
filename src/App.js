import AppToolBar from "./components/appbar";
import { createMuiTheme } from "@material-ui/core/styles";
import { useState,Suspense,Spinner } from "react";
import { MuiThemeProvider } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";
import ProjectHomeView from "./components/projects.home";
//import { makeStyles } from "@material-ui/core";
import Brightness3Icon from "@material-ui/icons/Brightness3";
import BrightnessHighIcon from "@material-ui/icons/BrightnessHigh";
import HomeHeaderView from "./components/home.header";
import InfoView from "./components/info.view";
import TechStackView from "./components/techstack.view";
import ProjectItem from "./components/items/projectItem";
import ScrollToTop from "./components/utils/scrollTop";

// const useStyles = makeStyles((theme) => ({
//   gridContainer: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "left",
//     marginTop: "2%",
//     paddingLeft:20,
//     height:500
//   },

//   item :{
//     justifyContent : "center"
//   },

//   cardImg: {
//     width: 400,
//     background:"transparent",
//     position:"fixed",
//     right:theme.spacing(1),
//     paddingRight:"2%"
//   },
//   cardText: {
//     height: 365,
//     //width:"50%",
//     background:"transparent",
//   },
//   cardMedia: {
//     height: 300,

//   },
// }));

function App() {
  const [themeState, setThemeState] = useState("dark");
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

  const toggleTheme = () => {
    if (themeState === "light") {
      setThemeState("dark");
    } else {
      setThemeState("light");
    }
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/">
            <ScrollToTop>
            <div>
              <AppToolBar
                position="sticky"
                toggleTheme={toggleTheme}
                brightnessIcon={brightnessIcon}
              />
              {/* <Grid container spacing={3} className={classes.gridContainer}> */}
              <HomeHeaderView id="header" themeState={themeState} />
              <InfoView id="about" themeState={themeState} />
              {/* </Grid> */}
              <TechStackView id="techstack" themeState={themeState} />
              <ProjectHomeView id="projects" themeState ={themeState}/>
            </div>
            </ScrollToTop>
          </Route>
          <Route
            path="/projects/:project_name"
            render={(props) =>
              <ScrollToTop>
              <ProjectItem {...props} />
              </ScrollToTop>      
            }
          />
          <Redirect to="/"/>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
