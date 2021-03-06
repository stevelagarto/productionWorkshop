import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBlog, editBlog } from '../../actions';
import Button from '@material-ui/core/Button';
import { Field, reduxForm } from 'redux-form'
import EditForm from './EditForm'

let BlogEdit= ({fetchBlog, match, blog, history, editBlog}) => {
  useEffect(()=>{
    fetchBlog(match.params._id);
  },[fetchBlog, match.params._id])
  
  console.log('PROPSSSS', blog);
  function submit (values) {
    console.log('values', values);
    editBlog();
    
  }

  if (!blog) {
    return '';
  }
  //console.log('route', props);
  
  const { title, content } = blog;

  return (
    <EditForm 
      onSubmit={submit}
      title={title} 
      content={content} 
      blog={blog}
      history={history}/>
  );
}


function mapStateToProps({ blogs }, ownProps) {
  return { blog: blogs[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBlog, editBlog })(BlogEdit);