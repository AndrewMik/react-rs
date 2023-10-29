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
  error: Error | null;
};

export default class Search extends Component {
  state: SearchState = {
    searchResults: [],
    searchString: '',
    userInputString: '',
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = async () => {
    try {
      const searchString = localStorage.getItem('searchString') || '';
      if (searchString) {
        this.setState({
          searchString: searchString,
          userInputString: searchString,
        });
      }
      const results: Character[] = await searchCharacters(searchString);
      this.setState({ searchResults: results, loading: false });
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = async () => {
    const { searchString, userInputString } = this.state;
    const userSearchTerm = userInputString.trim();

    if (searchString === userSearchTerm) return;

    this.setState({ searchString: userSearchTerm, loading: true });

    const results = await searchCharacters(userSearchTerm);

    this.setState({ searchResults: results, loading: false });
    localStorage.setItem('searchString', userSearchTerm);
  };

  throwError = () => {
    this.setState({ error: new Error() });
  };

  render() {
    if (this.state.error)
      throw new Error('A custom Error occurred for RS School.');
    return (
      <>
        <section className="search">
          <h1 className="heading">Star Wars Character Search</h1>
          <div className="search-container">
            <input
              type="text"
              value={this.state.userInputString}
              onChange={(e) =>
                this.setState({ userInputString: e.target.value })
              }
              placeholder="Search characters"
            ></input>
            <button onClick={this.handleSearch}>Search</button>
          </div>
          <button className="error-button" onClick={this.throwError}>
            Throw an Error
          </button>
        </section>
        <SearchResults
          searchResults={this.state.searchResults}
          loading={this.state.loading}
        />
      </>
    );
  }
}
