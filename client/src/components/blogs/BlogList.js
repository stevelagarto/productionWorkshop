import React, { Component, useEffect } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../actions';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
function BlogList (props) {
  useEffect(()=>{
    props.fetchBlogs();
  },[]) 
   
  

 
    const classes = useStyles();
    const print = map(props.blogs, blog => {
      return (
        <div className="card darken-1 horizontal" key={blog._id}>
          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title">{blog.title}</span>
              <p>{blog.content}</p>
            </div>
            <div className="card-action1">
              <Link to={`/blogs/${blog._id}`}> <div className={classes.root}>
             
             <Button variant="contained" color="primary" size="small">
               Read Me
             </Button>
             
           </div></Link>
            </div>
          </div>
        </div>
      );
    });
  


    return <div>{print}</div>;
  
}

function mapStateToProps({ blogs }) {
  return { blogs };
}

export default connect(mapStateToProps, { fetchBlogs })(BlogList);
