import { useState, useEffect } from 'react';
import './style.css';
import SearchResults from '../SearchResults/SearchResults';
import { searchCharacters } from '../../api/searchCharacters';
import { Character } from '../Characters/Characters';
import SearchSection from '../SearchSection/SearchSection';
import {
  Outlet,
  useNavigate,
  useNavigation,
  useSearchParams,
} from 'react-router-dom';
import { ItemsLimit } from '../../types/enum';
import { Route } from '../../routes';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

export type SearchCharactersResponse = {
  results: Character[];
  count: number;
};

const FIRST_PAGE = 1;

const Search: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Character[]>([]);
  const [searchString, setSearchString] = useState<string>('');
  const [userInputString, setUserInputString] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(FIRST_PAGE);
  const [count, setCount] = useState<number | null>(null);
  const [itemsLimit, setItemsLimit] = useState<number>(
    ItemsLimit.TenItemsPerPage
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const getSearchResults = async (
    searchTerm: string,
    pageQuery: number = FIRST_PAGE,
    changedLimit?: ItemsLimit
  ) => {
    setLoading(true);

    try {
      let response: SearchCharactersResponse | null;
      if (
        changedLimit ||
        changedLimit === ItemsLimit.FiveItemsPerPage ||
        (!changedLimit && itemsLimit === ItemsLimit.FiveItemsPerPage)
      ) {
        if (changedLimit) {
          response = await searchCharacters(searchTerm, FIRST_PAGE);
          if (response) {
            setSearchResults(response.results.slice(0, changedLimit));
          }
        } else {
          response = await searchCharacters(
            searchTerm,
            Math.ceil(pageQuery / 2)
          );

          if (response) {
            pageQuery % 2
              ? setSearchResults(
                  response.results.slice(0, changedLimit ?? itemsLimit)
                )
              : setSearchResults(
                  response.results.slice(changedLimit ?? itemsLimit)
                );
          }
        }
      } else {
        response = await searchCharacters(searchTerm, pageQuery);
        if (response) {
          setSearchResults(response.results);
        }
      }
      if (response) {
        setCount(response.count);
      }

      if (changedLimit) {
        setItemsLimit(changedLimit);
        setCurrentPage(FIRST_PAGE);
      } else {
        setCurrentPage(pageQuery ?? FIRST_PAGE);
      }

      setSearchParams(
        `page=${pageQuery ?? FIRST_PAGE}&limit=${changedLimit ?? itemsLimit}`
      );
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

    setSearchString(userSearchTerm);
    localStorage.setItem('searchString', userSearchTerm);

    getSearchResults(userSearchTerm);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    navigate(Route.Home);
    setItemsLimit(+event.target.value);
    getSearchResults(searchString, currentPage, +event.target.value);
  };

  const changePage = (page: number): void => {
    if (currentPage !== page) getSearchResults(searchString, page);
  };

  return (
    <>
      <SearchSection
        userInputString={userInputString}
        setUserInputString={setUserInputString}
        handleSearch={handleSearch}
        setItemsLimit={setItemsLimit}
        handleItemsPerPageChange={handleItemsPerPageChange}
      />
      {navigation.state === 'loading' ? (
        <div className="global-spinner-container">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <SearchResults
            searchResults={searchResults}
            currentPage={currentPage}
            count={count}
            itemsLimit={itemsLimit}
            loading={loading}
            changePage={changePage}
          />
          <Outlet />
        </>
      )}
    </>
  );
};

export default Search;
