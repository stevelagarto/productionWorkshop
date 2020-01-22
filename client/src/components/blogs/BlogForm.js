// BlogForm shows a form for a user to add input
import _ from 'lodash';
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import BlogField from './BlogField';
import formFields from './formFields';

const BlogForm = ({onBlogSubmit, handleSubmit}) => {
  
  const render = _.map(formFields, ({ label, name }) => {
    return (
      <Field
        key={name}
        component={BlogField}
        type="textArea"
        label={label}
        name={name}
      />
    );
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onBlogSubmit)}>
        {render}
        <Link to="/blogs" className="red btn-flat white-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
        </button>
      </form>
    </div>
  );
}

function validate(values) {
  const errors = {};

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'blogForm',
  destroyOnUnmount: false
})(BlogForm);
