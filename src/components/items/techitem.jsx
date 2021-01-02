import { makeStyles } from "@material-ui/core"

const TechItem = (props) => {

const smallLogos = ["Express","GCP","Pandas"];

const useStyles = makeStyles((theme) => ({
    item: {
        flex: "5",
      },
    logoImg: {
        width: "60%",
        objectFit: "cover",
      },    
      biglogoImg: {
        width: "100%",
        objectFit: "cover",
      }, 
      logo: {
        width: "100px",
        height: "100px",
        float: "left",
        marginRight: "2%",
        
      },
      itemName:{
        width: "88%",
        float: "left",
        color : (props.themeState === "light" ? "white" : "black")
      },
      itemP: {
        paddingTop: "20px",
        color : (props.themeState === "light" ? "white" : "black")
      },
}));

    const classes = useStyles();
    return (
      <div className={classes.item}>
          {
            smallLogos.includes(props.name) ? 
            (
                <div className={classes.logo}>
                <img src={props.logo} alt={props.name} className={classes.biglogoImg}/>
                </div>
            )
            :
            (
                <div className={classes.logo}>
                <img src={props.logo} alt={props.name} className={classes.logoImg}/>
                </div>
            )
          }
        {/* <div className={classes.itemName}>
          <p className={classes.itemP}>{props.name}</p>
        </div> */}
      </div>
    );
  };

export default TechItem