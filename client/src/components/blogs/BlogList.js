import React, { useEffect } from 'react';
import map from 'lodash/map';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchBlogs } from '../../actions';
import UIButton from '../Button'

const BlogList = ({fetchBlogs, blogs}) => {
  useEffect(()=>{
    fetchBlogs();
  },[]) 
  
  const print = map(blogs, blog => {
    return (
      <div className="card darken-1 horizontal" key={blog._id}>
        <div className="card-stacked">
          <div className="card-content">
            <span className="card-title">{blog.title}</span>
            <p>{blog.content.substring(0, 200)}...</p>
          </div>
          <div className="card-action1">
            <Link to={`/blogs/${blog._id}`}> 
              <UIButton title="Read Me" />
            </Link>
            <Link to={`/blogs/edit/${blog._id}`}> 
              <UIButton title="Edit" />
            </Link>
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
