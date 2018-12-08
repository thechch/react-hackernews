import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { Button } from '../Button';

const Sort = ({ sortKey, onSort, activeSortKey, children }) => {
  const sortClass = classnames('button-inline', {
    'button-active': sortKey === activeSortKey,
  });

  return (
    <Button onClick={() => onSort(sortKey)} className={sortClass}>
      {children}
    </Button>
  );
};

Sort.propTypes = {
  sortKey: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
  activeSortKey: PropTypes.string,
  children: PropTypes.string,
};

Sort.defaultProps = {
  activeSortKey: 'NONE',
  children: '',
};

export default Sort;
