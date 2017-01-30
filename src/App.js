import React, {Component} from 'react';
import Search from './Search';
import Table from './Table';
import Button from './Button';
import './App.css';


const DEFAULT_QUERY = 'redux';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = '100';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage=';

//var url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}${DEFAULT_PAGE}`;

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

    needsToSearchTopStories(searchTerm) {
        return !this.state.results[searchTerm];
    }

    onDismiss(id) {
        const { searchKey, results} = this.state;
        const { hits, page} = results[searchKey];

        const isNotId = item => item.objectID !== id;
        const updatedHits = hits.filter(isNotId);

        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updatedHits, page}
            }
        });
    }

    onSearchChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    onSearchSubmit(event) {
        const {searchTerm} = this.state;
        this.setState({ searchKey: searchTerm });
        if(this.needsToSearchTopStories(searchTerm)){
            this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
        }
        event.preventDefault();
    }

    setSearchTopStories(result) {
        const {hits, page, nbPages} = result;
        const {searchKey, results} = this.state;
        console.log(result);

        const oldHits = results && results[searchKey]
            ? results[searchKey].hits
            : [];

        const updatedHits = [
            ...oldHits,
            ...hits
        ];

        this.setState({
            results: {
                ...results,
                [searchKey]: {hits: updatedHits, page},
            },
            totalPages: nbPages,
        });
    }

    fetchSearchTopStories(searchTerm, page) {
        fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
            .then(response => response.json())
            .then(result => this.setSearchTopStories(result));
    }

    componentDidMount() {
        const {searchTerm}  = this.state;
        this.setState( {searchKey: searchTerm});
        this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
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

        const modifier = totalPages ? page + 1 === totalPages ? 0 : 1 : 0;

        console.log(this.state);

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
                        More
                    </Button>
                </div>
            </div>
        );
    }
}

export default App;
