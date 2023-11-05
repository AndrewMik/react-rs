import { useState } from 'react';

type SearchSectionProps = {
  userInputString: string;
  handleSearch: () => void;
  setUserInputString: React.Dispatch<React.SetStateAction<string>>;
};

const SearchSection: React.FC<SearchSectionProps> = ({
  userInputString,
  handleSearch,
  setUserInputString,
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
    </section>
  );
};

export default SearchSection;
