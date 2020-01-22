import React from 'react';
import { Link } from 'react-router-dom';
import BlogList from './blogs/BlogList';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import { loadCSS } from 'fg-loadcss';
import MediaQuery from 'react-responsive';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);
  return (
    <div>
      <BlogList />
      <div className="fixed-action-btn">
        <Link to="/blogs/new">
        <MediaQuery maxWidth={600}>
        <div className={classes.root}>
        <Fab size="small" color="primary" aria-label="add" className={classes.margin}>
        <AddIcon />
      </Fab>
      </div>
       
        </MediaQuery>

        <MediaQuery minWidth={601}>
        <Button variant="contained" color="primary">
                Add Blog
                </Button>
        </MediaQuery>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
