import React from 'react';
import classnames from 'classnames';
import Button from '../Button/Button';

const Sort = ({ sortKey, onSort, activeSortKey, children }) => {
    const sortClass = classnames(
      'button-inline',
      { 'button-active': sortKey === activeSortKey },
    );

    return (
      <Button
        onClick={() => onSort(sortKey)}
        className={sortClass}
      >
        {children}
      </Button>);
};
Sort.propTypes = {
    sortKey: React.PropTypes.string.isRequired,
    onSort: React.PropTypes.func.isRequired,
    activeSortKey: React.PropTypes.string,
    children: React.PropTypes.string,
};
Sort.defaultProps = {
    activeSortKey: 'NONE',
    children: '',
};

export default Sort;
