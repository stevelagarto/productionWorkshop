import React from 'react';

export default ({ input, label, type,  meta: { error, touched } }) => {
  console.log('META--------------->', type)
  return (
    <div className={input.name}>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
