import { Component } from 'react';
import './style.css';
import SearchResults from '../SearchResults/SearchResults';
import { searchCharacters } from '../../api/searchCharacters';
import { Character } from '../Characters/Characters';

type SearchState = {
  searchResults: Character[];
  searchString: string;
  userInputString: string;
  loading: boolean;
};

export default class Search extends Component {
  state: SearchState = {
    searchResults: [],
    searchString: "",
    userInputString: "",
    loading: true,
  };

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = async () => {
    try {
      const results: Character[] = await searchCharacters();
      this.setState({ searchResults: results });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = async () => {
    const { searchString, userInputString } = this.state;

    if (searchString === userInputString) return;

    this.setState({ searchString: userInputString, loading: true });

    const results = await searchCharacters(userInputString);
    
    this.setState({ searchResults: results, loading: false });
    localStorage.setItem("searchString", userInputString);
  };

  render() {
    return (
      <>
        <section className="search">
          <input
            type="text"
            value={this.state.userInputString}
            onChange={(e) => this.setState({ userInputString: e.target.value })}
            placeholder="Search characters"
          ></input>
          <button onClick={this.handleSearch}>Search</button>
        </section>
        <SearchResults searchResults={this.state.searchResults} loading={this.state.loading} />
      </>
    );
  }
}
