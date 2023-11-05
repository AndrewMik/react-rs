import { useLoaderData } from 'react-router';
import { Character } from '../Characters/Characters';

const CharacterDescription: React.FC = () => {
  const character = useLoaderData() as Character;

  return (
    <>
      <h3 className="character-name">{character.name}</h3>
      <div className="description">
        <div>Height: {character.height} cm</div>
        <div>
          Mass:{' '}
          {character.mass !== 'unknown'
            ? character.mass + ' kg'
            : character.mass}{' '}
        </div>
        <div>Hair color: {character.hair_color}</div>
        <div>Skin color: {character.skin_color}</div>
        <div>Eye color: {character.eye_color}</div>
        <div>Birth year: {character.birth_year}</div>
        <div>Gender: {character.gender}</div>
      </div>
    </>
  );
};

export default CharacterDescription;
