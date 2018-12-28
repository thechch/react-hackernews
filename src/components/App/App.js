import React, { useEffect, useReducer } from 'react';
import { Search } from '../Search';
import { Table } from '../Table';
import { ButtonWithLoading } from '../Button';
import './App.css';

const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

function useSetState(initialState) {
  const [state, setState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    initialState,
  );
  return [state, setState];
}

function App() {
  const [state, setState] = useSetState({
    results: null,
    searchKey: DEFAULT_QUERY,
    totalPages: null,
    isLoading: false,
  });

  const fetchSearchTopStories = (searchKey, page) => {
    setState({
      isLoading: true,
    });

    fetch(
      `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchKey}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`,
    )
      .then((response) => response.json())
      .then((result) => setSearchTopStories(result, searchKey));
  };

  useEffect(() => {
    fetchSearchTopStories(state.searchKey, DEFAULT_PAGE);
  }, []);

  const setSearchTopStories = (result, searchKey) => {
    const { hits, page, nbPages } = result;
    const { results } = state;

    const oldHits =
      results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [...oldHits, ...hits];

    setState({
      results: {
        ...results,
        [searchKey]: {
          hits: updatedHits,
          page,
        },
      },
      totalPages: nbPages,
      isLoading: false,
    });
  };

  const onSearchSubmit = (searchKey) => {
    setState({ searchKey });

    if (!state.results || !state.results[searchKey]) {
      fetchSearchTopStories(searchKey, DEFAULT_PAGE);
    }
  };

  const onDismiss = (id) => {
    const { searchKey, results } = state;
    const { hits, page } = results[searchKey];

    const isNotId = (item) => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    setState({
      results: {
        ...results,
        [searchKey]: {
          hits: updatedHits,
          page,
        },
      },
    });
  };

  const { results, searchKey, totalPages, isLoading } = state;

  const page = (results && results[searchKey] && results[searchKey].page) || 0;
  const list = (results && results[searchKey] && results[searchKey].hits) || [];
  const modifier = totalPages && page + 1 !== totalPages ? 1 : 0;

  return (
    <div className="page">
      <div className="interactions">
        <Search initialValue={DEFAULT_QUERY} onSubmit={onSearchSubmit} />
      </div>
      <Table list={list} onDismiss={onDismiss} />
      <div className="interactions">
        <ButtonWithLoading
          isLoading={isLoading}
          className="green"
          onClick={() => fetchSearchTopStories(searchKey, page + modifier)}
        >
          Give me more
        </ButtonWithLoading>
      </div>
    </div>
  );
}

export default App;
