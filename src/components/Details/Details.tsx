import { useNavigate } from 'react-router';
import './style.css';
import CharacterDescription from '../CharacterDescription/CharacterDescription';
import { useState } from 'react';
import { Route } from '../../routes';
import { useSearchParams } from 'react-router-dom';

const Details: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const closeHandler = () => {
    setIsVisible(false);
    navigate(Route.Home);
    setSearchParams(localStorage.getItem('searchParams') || '');
  };

  return (
    <>
      {isVisible && (
        <>
          <div className="details-left-side" onClick={closeHandler} />
          <section className="details">
            <div className="description-container">
              <button className="close-description" onClick={closeHandler}>
                x
              </button>
              <CharacterDescription />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Details;
