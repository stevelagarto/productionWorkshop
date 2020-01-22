import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchBlog } from '../../actions';
import Button from '@material-ui/core/Button';

const BlogShow = ({fetchBlog, match, blog, history}) => {
  useEffect(()=>{
    fetchBlog(match.params._id);
  },[])

  function renderImage() {
    if (blog.imageUrl) {
      return (
        <img alt="none"
          src={
            'https://s3-us-west-2.amazonaws.com/my-blog-bucket-123/' +
            blog.imageUrl
          }
        />
      );
    }
  }

  function goBack() {
    history.goBack();
  }
  
  if (!blog) {
    return '';
  }

  const { title, content } = blog;

  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
      {renderImage()}
      <Button variant="contained" color="primary" onClick={() => history.goBack()}>
        Go back
      </Button>
    </div>
  );
}

function mapStateToProps({ blogs }, ownProps) {
  return { blog: blogs[ownProps.match.params._id] };
}

export default connect(mapStateToProps, { fetchBlog })(BlogShow);
