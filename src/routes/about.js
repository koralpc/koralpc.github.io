import { Typography } from '@material-ui/core';
import AppToolBar from './../components/appbar';
import { makeStyles } from '@material-ui/core/styles';
import Typist from 'react-typist';

const useStyles = makeStyles((theme) => (
  {
    infoText :{
        textAlign: "center",
        fontSize : 30,
        marginTop : 50,
    }
  }));

export default function AboutView(props) {

    const classes = useStyles();
    return(
        <div>
        <AppToolBar toggleTheme={props.toggleTheme} brightnessIcon ={props.brightnessIcon} />
        <Typist>
        <Typography className={classes.infoText}>
            I am Koralp Catalsakal
        </Typography>
        </Typist>
        </div>
    )
}