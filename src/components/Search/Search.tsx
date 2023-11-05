import { useState, useEffect } from 'react';
import './style.css';
import SearchResults from '../SearchResults/SearchResults';
import { searchCharacters } from '../../api/searchCharacters';
import { Character } from '../Characters/Characters';
import SearchSection from '../SearchSection/SearchSection';

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
  const [currentPage, setCurrentPage] = useState<number>(FIRST_PAGE);
  const [count, setCount] = useState<number | null>(null);
  const [itemsLimit] = useState<number>(ItemsLimit.TenItemsPerPage);

  const getSearchResults = async (searchTerm: string, pageQuery?: number) => {
    setLoading(true);
    try {
      const response: SearchCharactersResponse = await searchCharacters(
        searchTerm,
        pageQuery
      );

      setSearchResults(response.results);
      setCount(response.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const loadInitialData = async () => {
    const storedSearchString = localStorage.getItem('searchString') || '';

    if (storedSearchString) {
      setSearchString(storedSearchString);
      setUserInputString(storedSearchString);
    }

    getSearchResults(storedSearchString ? storedSearchString : searchString);
  };

  useEffect(() => {
    loadInitialData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async () => {
    const userSearchTerm = userInputString.trim();

    if (searchString === userSearchTerm) return;

    setCurrentPage(FIRST_PAGE);
    setSearchString(userSearchTerm);
    localStorage.setItem('searchString', userSearchTerm);

    getSearchResults(userSearchTerm);
  };

  const changePage = async (page: number): Promise<void> => {
    if (currentPage === page) return;

    setCurrentPage(page);

    getSearchResults(searchString, page);
  };

  return (
    <>
      <SearchSection
        userInputString={userInputString}
        setUserInputString={setUserInputString}
        handleSearch={handleSearch}
      />
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
