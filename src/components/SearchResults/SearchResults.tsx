import { Component } from 'react';
import './style.css';
import { getCharacters } from '../../api/getPeople';
import { Hourglass } from 'react-loader-spinner';

type Characters = {
  searchResults: Character[];
}

type Character = {
  name: string;
  height: number,
  mass: number,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: string,
}

export default class SearchResults extends Component {
  state: Characters = {
    searchResults: [],
  };

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData = async () => {
    const results: Character[] = await getCharacters();
    this.setState({ searchResults: results });
  }

  render() {
    const { searchResults } = this.state;

    return <section className='search-section'>
      <h2 className='search-results'>Search Results</h2>
      {searchResults.length > 0 ? (
        <ul className='cards'>
          {searchResults.map((character: Character) => (
            <li key={character.name} className='card'>
              <h3 className='character-name'>{character.name}</h3>
              <div className='description'>
                <div>Height: {character.height}</div>
                <div>Mass: {character.mass}</div>
                <div>Hair color: {character.hair_color}</div>
                <div>Skin color: {character.skin_color}</div>
                <div>Eye color: {character.eye_color}</div>
                <div>Birth year: {character.birth_year}</div>
                <div>Gender: {character.gender}</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#d7bf77', '#d7bf77']}
        />
      )}
    </section>;
  }
}
