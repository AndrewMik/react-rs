import { useState, useEffect } from 'react';
import './style.css';
import SearchResults from '../SearchResults/SearchResults';
import { searchCharacters } from '../../api/searchCharacters';
import { Character } from '../Characters/Characters';

type SearchCharactersResponse = {
  results: Character[];
  count: number;
};

enum ItemsLimit {
  TenItemsPerPage = 10,
  FiveItemsPerPage = 5,
}

const FIRST_PAGE = 1;

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [searchString, setSearchString] = useState<string>('');
  const [userInputString, setUserInputString] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(FIRST_PAGE);
  const [count, setCount] = useState<number | null>(null);
  const [itemsLimit] = useState<number>(ItemsLimit.TenItemsPerPage);

  const changePage = async (page: number): Promise<void> => {
    if (currentPage === page) return;

    setLoading(true);
    setCurrentPage(page);

    try {
      const response = await searchCharacters(searchString, page);

      setSearchResults(response.results);
      setCount(response.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
    setCurrentPage(FIRST_PAGE);

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
        count={count ?? 0}
        itemsLimit={itemsLimit}
        loading={loading}
        changePage={changePage}
      />
    </>
  );
};

export default Search;
