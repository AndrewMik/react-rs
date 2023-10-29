import { Component } from 'react';

type CharactersProps = {
  characters: Character[];
}

export type Character = {
  name: string;
  height: number,
  mass: number,
  hair_color: string,
  skin_color: string,
  eye_color: string,
  birth_year: string,
  gender: string,
}

export default class Characters extends Component<CharactersProps>  {
  render() {
    const { characters } = this.props;

    return (
      <ul className='cards'>
        {characters.map((character: Character) => (
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
    )
  }
}
