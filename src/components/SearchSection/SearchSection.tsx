import { useState } from 'react';
import { ItemsLimit } from '../../types/enum';

import './style.css';

type SearchSectionProps = {
  userInputString: string;
  handleSearch: () => void;
  setUserInputString: React.Dispatch<React.SetStateAction<string>>;
  setItemsLimit: React.Dispatch<React.SetStateAction<number>>;
  handleItemsPerPageChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
};

const SearchSection: React.FC<SearchSectionProps> = ({
  userInputString,
  handleSearch,
  setUserInputString,
  setItemsLimit,
  handleItemsPerPageChange,
}) => {
  const [error, setError] = useState<Error | null>(null);

  const throwError = () => {
    setError(new Error());
  };

  if (error) {
    throw new Error('A custom Error occurred for RS School.');
  }

  return (
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
      <div className="select-items-per-page">
        Items per page:
        <select
          onChange={(event) => {
            setItemsLimit(+event.target.value);
            handleItemsPerPageChange(event);
          }}
        >
          <option>{ItemsLimit.TenItemsPerPage}</option>
          <option>{ItemsLimit.FiveItemsPerPage}</option>
        </select>
      </div>
    </section>
  );
};

export default SearchSection;
