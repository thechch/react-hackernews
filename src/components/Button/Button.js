import React from 'react';
import Loading from '../Loading/Loading';
import './Button.css';

const Button = ({ onClick, children }) =>
  <button
    onClick={onClick}
    type="button"
  >
    { children }
  </button>;
Button.propTypes = {
    onClick: React.PropTypes.func.isRequired,
    children: React.PropTypes.string,
};
Button.defaultProps = {
    children: '',
};

const withLoading = (Component) => ({ isLoading, ...rest }) =>
    isLoading ? <Loading { ...rest } /> : <Component { ...rest } />;

const ButtonWithLoading = withLoading(Button);

export default ButtonWithLoading;

