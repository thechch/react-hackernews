import React from 'react';
import Button from '../Button/Button';

const Sort = ({ sortKey, onSort, children }) =>
    <Button
        onClick={() => onSort(sortKey)}
        className="button-inline"
    >
        {children}
    </Button>;
Sort.propTypes = {
    sortKey: React.PropTypes.string.isRequired,
    onSort: React.PropTypes.func.isRequired,
    children: React.PropTypes.string,
};
Sort.defaultProps = {
    children: '',
};

export default Sort;