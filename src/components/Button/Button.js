import React from 'react';
import './Button.css';

const Button = ({ onClick, className, children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    { children }
  </button>;

export default Button;
Button.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    children: React.PropTypes.string,
};
Button.defaultProps = {
    className: '',
    children: '',
};
