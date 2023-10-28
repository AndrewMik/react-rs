import { Component } from 'react';
import Search from './components/Search/Search';
import SearchResults from './components/SearchResults/SearchResults';

class App extends Component {
  render() {
    return (
      <>
        <Search />
        <SearchResults />
      </>
    );
  }
}

export default App;
