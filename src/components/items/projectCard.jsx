import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    //minWidth: 275,
    width:"90%",
    height:"400px"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ProjectCard(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.root}>
      <CardContent style={{height:"350px"}}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Blog Post
        </Typography>
        <Typography variant="h5" component="h2">
          {props.title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.date} | {props.duration} minute read
        </Typography>
        <Typography variant="body2" component="p">
            {props.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => history.push(`/projects/${props.slug}`)}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
