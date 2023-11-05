import { NavLink, useSearchParams } from 'react-router-dom';

type CharactersProps = {
  characters: Character[];
};

export type Character = {
  name: string;
  height: number;
  mass: number | string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  url: string;
};

const getCharacterId = (url: string) => {
  const arr = url.split('/');
  return arr[arr.length - 2];
};

const Characters: React.FC<CharactersProps> = ({ characters }) => {
  const [searchParams] = useSearchParams();

  return (
    <ul className="cards">
      {characters?.length > 0 ? (
        characters.map((character: Character) => (
          <NavLink
            to={`${getCharacterId(character.url)}`}
            key={getCharacterId(character.url)}
            onClick={() => {
              localStorage.setItem('searchParams', searchParams.toString());
            }}
          >
            <div className="card-container">
              <div key={character.name} className="card">
                <h3 className="character-name">{character.name}</h3>
              </div>
            </div>
          </NavLink>
        ))
      ) : (
        <h3>No results were found.</h3>
      )}
    </ul>
  );
};

export default Characters;
