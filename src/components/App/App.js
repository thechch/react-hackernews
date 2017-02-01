import React, { Component } from 'react';
import Search from '../Search/Search';
import Table from '../Table/Table';
import Button from '../Button/Button';
import './App.css';


const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            results: null,
            searchKey: '',
            searchTerm: DEFAULT_QUERY,
            totalPages: null,
        };

        this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }
    componentDidMount() {
        const { searchTerm } = this.state;
        this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
    }
    onSearchChange(event) {
        this.setState({
            searchTerm: event.target.value,
        });
    }
    onDismiss(id) {
        const { searchKey, results } = this.state;
        const { hits, page } = results[searchKey];

        const isNotId = item => item.objectID !== id;
        const updatedHits = hits.filter(isNotId);

        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page },
            },
        });
    }
    onSearchSubmit(event) {
        const { searchTerm } = this.state;
        this.setState({ searchKey: searchTerm });
        if (this.needsToSearchTopStories(searchTerm)) {
            this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
        }
        event.preventDefault();
    }
    setSearchTopStories(result) {
        const { hits, page, nbPages } = result;
        const { searchKey, results } = this.state;

        const oldHits = results && results[searchKey]
            ? results[searchKey].hits
            : [];

        const updatedHits = [
            ...oldHits,
            ...hits,
        ];

        this.setState({
            results: {
                ...results,
                [searchKey]: { hits: updatedHits, page },
            },
            totalPages: nbPages,
        });
    }
    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm];
    }
    fetchSearchTopStories(searchTerm, page) {
        this.setState({ searchKey: searchTerm });
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result));
    }
    render() {
        const {
            results,
            searchTerm,
            searchKey,
            totalPages,
        } = this.state;
        const page = (results && results[searchKey] && results[searchKey].page) || 0;
        const list = (results && results[searchKey] && results[searchKey].hits) || [];
        const modifier = totalPages && page + 1 !== totalPages
            ? 1
            : 0;
        return (
          <div className="page">
            <div className="interactions">
              <Search
                value={searchTerm}
                onChange={this.onSearchChange}
                onSubmit={this.onSearchSubmit}
              >
                        Search
                    </Search>
            </div>
            <Table
              list={list}
              onDismiss={this.onDismiss}
            />
            <div className="interactions">
              <Button onClick={() => this.fetchSearchTopStories(searchKey, page + modifier)}>
                        Give me more
              </Button>
            </div>
          </div>
        );
    }
}

export default App;

export {
    Button,
    Search,
    Table,
};
