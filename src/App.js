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
            result: null,
            searchTerm: DEFAULT_QUERY,
            totalPages: null,
        };

        this.setSearchTopStories = this.setSearchTopStories.bind(this);
        this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }

    onDismiss(id) {
        const isNotId = item => item.objectID !== id;
        const updatedList = this.state.result.hits.filter(isNotId);

        this.setState({
            result: {...this.state.result, hits: updatedList},
        });
    }

    onSearchChange(event) {
        this.setState({
            searchTerm: event.target.value
        });
    }

    onSearchSubmit(event) {
        const {searchTerm} = this.state;
        this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
        event.preventDefault();
    }

    setSearchTopStories(result) {
        const {hits, page, nbPages} = result;

        const oldHits = page !== 0
            ? this.state.result.hits
            : [];

        const updatedHits = [
            ...oldHits,
            ...hits
        ];

        this.setState({
            result: {hits: updatedHits, page},
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
        this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE);
    }

    render() {
        const {result, searchTerm, totalPages} = this.state;
        const currentPage = (result && result.page) || 0;
        console.log(result);
        const modifier = totalPages ? currentPage + 1 === totalPages ? 0 : 1 : 0;

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
                {
                    result && <Table
                        list={result.hits}
                        onDismiss={this.onDismiss}
                    />
                }
                <div className="interactions">
                    <Button onClick={() => this.fetchSearchTopStories(searchTerm, currentPage + modifier)}>
                        More
                    </Button>
                </div>
            </div>
        );
    }
}

export default App;
