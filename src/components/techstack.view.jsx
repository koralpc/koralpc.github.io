import { Grid, makeStyles, Typography } from "@material-ui/core"
import jsdata from "./data/jsStack.json";
import pythondata from "./data/pythonStack.json";
import otherdata from "./data/otherStack.json";
import TechItem from "./items/techitem"

const TechStackView = (props) => {

    const useStyles = makeStyles((theme) => ({
        root : {
            background : (props.themeState === "light" ? "#303030" : "#fafafa"),
            height:600,
            width:"100%",
            justifyContent:"center"
        },
        header : {
            color : theme.palette.background.default,
            textAlign:"center",
            paddingTop:"1%",
            fontFamily:"system-ui",
            fontWeight:800,
        },
        headerText : {
            color : theme.palette.background.default,
            textAlign:"center",
            paddingTop:"1%",
            fontFamily:"system-ui",
            fontWeight:800,
        },
        itemContainer: {
            width: "90%",
            marginLeft: "10%",
            marginRight:"15%",
            paddingTop: "5%",
            //display: "flex",
            justifyContent:"center"
          },
        gridItem :{
            height:"120px",
            justifyContent:"center",
        },
        techHeader:{
            float:"left",
            paddingTop:"15px",
            paddingRight:"5%",
            marginLeft:"10%",
            color: (props.themeState === "light" ? "#fafafa" : "#303030"),
            fontFamily:"system-ui",
            fontWeight:800,
            fontSize: 30 
        }
    }));

    const classes = useStyles();
    return (
        <div id={props.id} className={classes.root}>
            <div className = {classes.header}>
            <Typography  variant="h2" className={classes.headerText}>
                My Technology Stack
            </Typography>
            </div>
            <Grid container direction={'column'} className={classes.itemContainer}>
            <Grid item className={classes.gridItem}>
                <Typography className={classes.techHeader} variant="h5">
                    Python:
                </Typography>
            
            {pythondata.map((item) => (
          <TechItem {...item}  themeState ={props.themeState} key={item.name} />
            ))}
            </Grid>
            <Grid item className={classes.gridItem}>
                <Typography className={classes.techHeader} variant="h5">
                    Javascript:
                </Typography>
            
            {jsdata.map((item) => (
          <TechItem {...item}  themeState ={props.themeState} key={item.name} />
            ))}
            </Grid>
            <Grid item className={classes.gridItem}>
                <Typography className={classes.techHeader} variant="h5">
                    Other:
                </Typography>
            
            {otherdata.map((item) => (
          <TechItem {...item}  themeState ={props.themeState} key={item.name} />
            ))}
            </Grid>
            </Grid>
        </div>
    )
}

export default TechStackView