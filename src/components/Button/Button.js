import React from 'react';
import PropTypes from 'prop-types';

import { Loading } from '../Loading';
import './Button.css';

export const Button = ({ onClick, className = '', children = '' }) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.string,
};

const withLoading = (Component) => {
  return function WrappedWithLoading({ isLoading, ...rest }) {
    return isLoading ? <Loading {...rest} /> : <Component {...rest} />;
  };
};

export const ButtonWithLoading = withLoading(Button);
