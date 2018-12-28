import PropTypes from 'prop-types';
import React, { useState } from 'react';

export const Search = ({
  initialValue = '',
  onSubmit,
  children = 'Search',
}) => {
  const [value, onChange] = useState(initialValue);

  const onFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={onFormSubmit}>
      {`${children} `}
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <button type="submit"> {children} </button>
    </form>
  );
};

Search.propTypes = {
  initialValue: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.string,
};
