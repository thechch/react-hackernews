import React from 'react';
import Button from '../Button/Button';
import Sort from '../Sort/Sort';
import { sortBy } from 'lodash';
import './Table.css';

const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENTS: list => sortBy(list, 'num_comments').reverse(),
    POINTS: list => sortBy(list, 'points').reverse(),
};

const largeColumn = { width: '40%',
};
const midColumn = { width: '30%',
};
const smallColumn = { width: '10%',
};

const Table = ({
    list,
    sortKey,
    onSort,
    onDismiss
}) =>
  <div className="table">
      <div className="table-header">
        <span style={{width: '40%'}}>
            <Sort
                sortKey={'TITLE'}
                onSort={onSort}
            >
                Title
            </Sort>
        </span>
        <span style={{width: '30%'}}>
            <Sort
                sortKey={'AUTHOR'}
                onSort={onSort}
            >
                Author
            </Sort>
        </span>
        <span style={{width: '10%'}}>
            <Sort
                sortKey={'COMMENTS'}
                onSort={onSort}
            >
                Comments
            </Sort>
        </span>
        <span style={{width: '10%'}}>
            <Sort
                sortKey={'POINTS'}
                onSort={onSort}
            >
                Points
            </Sort>
        </span>
        <span style={{width: '10%'}}>
            Archive
        </span>
      </div>
    {SORTS[sortKey](list).map(item =>
      <div key={item.objectID} className="table-row">
        <span style={largeColumn}>
          <a href={item.url}>{item.title} </a>
        </span>
        <span style={midColumn}>{item.author} </span>
        <span style={smallColumn}>{item.num_comments} </span>
        <span style={smallColumn}>{item.points} </span>
        <span style={smallColumn}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>)}
  </div>;

Table.propTypes = {
    list: React.PropTypes.array.isRequired,
    onDismiss: React.PropTypes.func.isRequired,
};

export default Table;


