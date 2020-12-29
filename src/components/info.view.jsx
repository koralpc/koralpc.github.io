import {
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import {
  IconButton,
} from "@material-ui/core";
const InfoView = (props) => {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: "2%",
      //(props.themeState === "light" ? "black" : "white"),
      height: 450,
      width: "100%",
      //   textAlign: "center",
      //   justifyContent: "center",
      overflow: "hidden",
    },
    textContainer: {
      width: "70%",
      float: "left",
    },
    divider: {
      //color: (props.themeState === "light" ? "black" : "white"),
      backgroundColor: props.themeState === "light" ? "#303030" : "#fafafa",
      height: 1,
      justifyContent: "center",
      marginLeft: "5%",
      marginRight: "5%",
    },
    infoText: {
      paddingTop: "2%",
      justifyContent: "left",
      marginLeft: "7%",
      maxWidth: "70%",

    },
    infoCard: {
      paddingTop: "2%",
      float: "left",
    },
    mediaBox: {
      width: "20%",
      height: 300,
      border: "2px solidgray",
      float: "left",
    },
    image: {
      height: "80%",
      width: "80%",
      objectFit: "cover",
      float: "left",
    },
    iconButton : {
        paddingTop:"2%",
        height:100,
        width:100,
        "&:hover":{
            background:"silver"
        }
    },
    icon :{
        height:60,
        width:60
    }
  }));

  const classes = useStyles();

  return (
    <div id={props.id} className={classes.root}>
      <Divider className={classes.divider} />
      <div className={classes.textContainer}>
        <Typography variant="h4" className={classes.infoText}>
          I am a Junior Software Engineer (Working in AI industry)
          <Typography variant="body1">
            My main focus is over Artificial Intelligence. This is my personal
            webpage where I display the technologies I am currently using or I have
            used. You can also find my personal projects when you scroll further!
          </Typography>
          <Typography variant="overline">More about me:</Typography>
          <List>
          <ListItem>
              <ListItemIcon>
                <DoubleArrowIcon />
              </ListItemIcon>
              <ListItemText primary={"I am currently working in Belgium at Invitae. My responsibilities include deployment/implementation of machine learning models and sometimes full-stack development"} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DoubleArrowIcon />
              </ListItemIcon>
              <ListItemText primary={<a>I have completed my Master's degree in Computer Science at KU Leuven, Belgium.
              I wrote my thesis over applications of Shapley value in Machine Learning pipelines. My thesis was awarded with {' '}
              <a href="https://wms.cs.kuleuven.be/cs/english/News/news-items/two-master-thesis-awards-for-students-of-the-master-in-computer-science"
              target="_blank" style={{color:"inherit"}}><b>Excellent Thesis Award</b></a>  in Machine Learning category by Colruyt Group.</a>}/>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <DoubleArrowIcon />
              </ListItemIcon>
              <ListItemText primary="In my free time I code the projects displayed in this webpage or create new blogposts" />
            </ListItem>
          </List>
        </Typography>
      </div>
      <div className={classes.infoCard}>
        <Typography variant="h3"><a>For <a style= {{color:"orange"}}>more</a> info:</a></Typography>
        <IconButton
          aria-label="My LinkedIn account"
          href="https://www.linkedin.com/in/kcatalsakal/"
          target="_blank"
          rel="noreferrer"
          className={classes.iconButton}
        >
          <LinkedInIcon className={classes.icon}/>
        </IconButton>
        <IconButton
          aria-label="My Github account"
          href="https://github.com/koralpc"
          target="_blank"
          rel="noreferrer"
          className={classes.iconButton}
        >
          <GitHubIcon className={classes.icon}/>
        </IconButton>
        <IconButton
          aria-label="Mail Me!"
          href="mailto:mrkoralp@gmail.com"
          target="_blank"
          rel="noreferrer"
          className={classes.iconButton}
        >
          <MailOutlineIcon className={classes.icon}/>
        </IconButton>
        {/* </Card> */}
      </div>
    </div>
  );
};

export default InfoView;
