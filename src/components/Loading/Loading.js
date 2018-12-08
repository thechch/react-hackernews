import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './Loading.css';

const Loading = ({ className }) => (
  <div className={classnames('spinner', className)}>
    <div className="bounce1" />
    <div className="bounce2" />
    <div className="bounce3" />
  </div>
);

Loading.propTypes = {
  className: PropTypes.string,
};

Loading.defaultProps = {
  className: '',
};

export default Loading;
