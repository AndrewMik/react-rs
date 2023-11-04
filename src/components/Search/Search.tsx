import { useState, useEffect } from 'react';
import './style.css';
import SearchResults from '../SearchResults/SearchResults';
import { searchCharacters } from '../../api/searchCharacters';
import { Character } from '../Characters/Characters';

type SearchCharactersResponse = {
  results: Character[];
  count: number;
};

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [searchString, setSearchString] = useState<string>('');
  const [userInputString, setUserInputString] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [itemsLimit] = useState<number>(10);

  const changePage = (page: number): void => {
    setCurrentPage(page);
  };

  const loadInitialData = async () => {
    let response: SearchCharactersResponse;
    const storedSearchString = localStorage.getItem('searchString') || '';

    try {
      if (storedSearchString) {
        setSearchString(storedSearchString);
        setUserInputString(storedSearchString);
        response = await searchCharacters(storedSearchString);
      } else {
        response = await searchCharacters(searchString);
      }

      setSearchResults(response.results);
      setCount(response.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async () => {
    const userSearchTerm = userInputString.trim();

    if (searchString === userSearchTerm) return;

    setLoading(true);

    try {
      const response: SearchCharactersResponse =
        await searchCharacters(userSearchTerm);

      setSearchResults(response.results);
      setCount(response.count);
      setSearchString(userSearchTerm);
      localStorage.setItem('searchString', userSearchTerm);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const throwError = () => {
    setError(new Error());
  };

  if (error) {
    throw new Error('A custom Error occurred for RS School.');
  }

  return (
    <>
      <section className="search">
        <h1 className="heading">Star Wars Character Search</h1>
        <div className="search-container">
          <input
            type="text"
            value={userInputString}
            onChange={(e) => setUserInputString(e.target.value)}
            placeholder="Search characters"
          ></input>
          <button onClick={handleSearch}>Search</button>
        </div>
        <button className="error-button" onClick={throwError}>
          Throw an Error
        </button>
      </section>
      <SearchResults
        searchResults={searchResults}
        currentPage={currentPage}
        count={count}
        itemsLimit={itemsLimit}
        loading={loading}
        changePage={changePage}
      />
    </>
  );
};

export default Search;
