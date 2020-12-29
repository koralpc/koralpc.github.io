import { Typography } from "@material-ui/core";
import AppToolBar from "./../components/appbar";
import { makeStyles } from "@material-ui/core/styles";
import Typist from "react-typist";
import { Container, Link,Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  infoText: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 50,
  },
}));

export default function AboutView(props) {
  const classes = useStyles();
  return (
    <div>
      <AppToolBar
        toggleTheme={props.toggleTheme}
        brightnessIcon={props.brightnessIcon}
      />
      <Typist>
        <Typography className={classes.infoText}>Know me better!</Typography>
      </Typist>
      <Container maxWidth="lg">
        <Typography variant="h5">Background</Typography>
        <Box/>
        <Typography >
          I am 24 years old. I have lived in Ankara,Turkey for most of my life,
          where I have completed my Bachelor's in Electrical and Electronical
          Engineering. Upon completing my Bachelors, I moved to Belgium, where I
          earned my Master's degree in Computer Science from KU Leuven. I
          specialized in Machine Learning over my masters education and
          delivered my thesis over Machine Learning in Shapley Space. In my
          thesis I researched about possible applications of{" "}
          <Link
            href="https://en.wikipedia.org/wiki/Shapley_value"
            color="inherit"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Shapley Value
          </Link>{" "}
          in machine learning pipelines mainly for performance and
          interpretability improvement. 
          In my research I implemented a new model-agnostic (Independent of model) machine learning pipeline
          which showed improvements compared to various other known pipelines. More details over my 
          thesis can be found <Link
            href="https://github.com/koralpc/shapley-bootstrapping"
            color= "inherit"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            here.
          </Link>
        </Typography>
      </Container>
      <Box mt={3}/>
      <Container maxWidth="lg">
        <Typography variant="h5">What I do</Typography>
        <Box/>
        <Typography >
            I am currently working as a Software Engineer.
            At work my main focus is over Machine Learning, where I work with different fields and 
            deploy new models/pipelines to either local or cloud resources. More specificly, I use NLP techniques
            to parse and classify medical journals and articles or implement a sequence based neural network arhitecture
            for classification tasks based on gene sequences.
            <br/>Outside of work I focus my attention into two topics: Data Science and Full stack development.
        </Typography>
      </Container>
      <Box mt={3}/>
      <Container maxWidth="lg">
        <Typography variant="h5">Misc</Typography>
        <Box/>
        <Typography >
        </Typography>
      </Container>
    </div>
  );
}
