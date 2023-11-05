import { useNavigation } from 'react-router';
import './style.css';
import CharacterDescription from '../CharacterDescription/CharacterDescription';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const Details: React.FC = () => {
  const navigation = useNavigation();

  return (
    <section className="details">
      <div className="description-container">
        {navigation.state === 'loading' ? (
          <LoadingSpinner />
        ) : (
          <CharacterDescription />
        )}
      </div>
    </section>
  );
};

export default Details;
