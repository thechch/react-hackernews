import React from 'react';

const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    {`${children} `} <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>;

export default Search;
Search.propTypes = {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    children: React.PropTypes.string,
};
Search.defaultProps = {
    value: '',
    children: 'Search',
};
