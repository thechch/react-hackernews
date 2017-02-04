import React from 'react';
import Loading from '../Loading/Loading';
import './Button.css';

const Button = ({ onClick, className, children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    { children }
  </button>;

Button.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    children: React.PropTypes.string,
};

Button.defaultProps = {
    className: '',
    children: '',
};

const withLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <Loading {...rest} /> : <Component {...rest} />;

const ButtonWithLoading = withLoading(Button);

export default ButtonWithLoading;

