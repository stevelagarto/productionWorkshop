import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function UIButton ({title}) {
  const classes = useStyles();
  return (
    <>
    <div className={classes.root}>
      <Button variant="contained" color="primary" size="small">
        {title}
      </Button>
    </div>
    </> 
  )
}