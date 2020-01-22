// BlogNew shows BlogForm and BlogFormReview
import React, { useState } from 'react';
import { reduxForm } from 'redux-form';
import BlogForm from './BlogForm';
import BlogFormReview from './BlogFormReview';

const BlogNew =  (props) => {
  const [state, setState] = useState({ showFormReview: false });
  let render=null;
 
  if (state.showFormReview) {
    render = (
      <BlogFormReview
        onCancel={() => setState({ showFormReview: false })}
      />
    );
  } else {
    render = (
      <BlogForm
        onBlogSubmit={() => setState({ showFormReview: true })}
      />
    );
  }

  return (
    <div>
      {render}
    </div>
  );
}

export default reduxForm({
  form: 'blogForm'
})(BlogNew);
