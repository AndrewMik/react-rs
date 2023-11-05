import { useNavigation } from 'react-router';
import './style.css';
import CharacterDescription from '../CharacterDescription/CharacterDescription';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { useEffect, useState } from 'react';

const Details: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const navigation = useNavigation();

  useEffect(() => {
    setIsVisible(true);
  }, [navigation]);

  return (
    <>
      {isVisible && (
        <>
          <div
            className="details-left-side"
            onClick={() => setIsVisible(false)}
          />
          <section className="details">
            <div className="description-container">
              <button
                className="close-description"
                onClick={() => setIsVisible(false)}
              >
                x
              </button>
              {navigation.state === 'loading' ? (
                <LoadingSpinner />
              ) : (
                <CharacterDescription />
              )}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Details;
