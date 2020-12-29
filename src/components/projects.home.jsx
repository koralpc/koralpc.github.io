import { makeStyles, Typography } from "@material-ui/core"

const ProjectHomeView = (props) => {

    const useStyles = makeStyles((theme) => ({
        root : {
            display:"flex",
            background : (props.themeState === "light" ? "#fafafa" : "#303030"),
            height:400,
            width:"100%"
        },
        header : {
            color : (props.themeState === "light" ? "#303030" : "#fafafa"),
            textAlign:"center"
        }
    }));

    const classes = useStyles();
    return (
        <div id={props.id} className={classes.root}>
            <Typography className = {classes.header} variant="h2">
                My Projects
            </Typography>
        </div>
    )
}

export default ProjectHomeView