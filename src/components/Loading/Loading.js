import React from 'react';
import './Loading.css';

const Loading = ({ className }) =>
  <div className={`spinner ${className}`} >
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </div>;

export default Loading;
