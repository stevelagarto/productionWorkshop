
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBlog } from '../../actions';
import Button from '@material-ui/core/Button';
import { Field, reduxForm, change } from 'redux-form'

const EditForm = ({handleSubmit, title, content, blog, history, initialize, dispatch}) => {
  useEffect(() => {
    initialize({ title: title, content: content });
    //dispatch(change('EditForm', 'title', 'value'));

  },[])
  if (!blog) {
    return '';
  }
  console.log('Title', title);
  function myFunction (values) {
    console.log('values', values);
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit(myFunction)}>
      <div>
        <label htmlFor="title">Title</label>
        <Field name="title"  component="input" type="text" />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <Field name="content"  component="textarea" type="text" />
      </div>
      <Button variant="contained" color="primary" onClick={() => history.goBack()}>
        Go back
      </Button>
      <Button style={{marginLeft:'10px'}}variant="contained" color="primary" type="submit">
        Submit
      </Button>
      </form>
    </div>
  );
}



export default reduxForm({
  // a unique name for the form
  form: 'EditForm'
})(EditForm)
