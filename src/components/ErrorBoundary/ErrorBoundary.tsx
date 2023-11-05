import { Link } from 'react-router-dom';
import './style.css';
import { Route } from '../../routes';

const ErrorBoundary = () => {
  return (
    <>
      <div className="search">
        <h2 className="heading">Something went wrong.</h2>
      </div>
      <div className="search-section">
        <Link to={Route.Home}>
          <button className="button restart-button">
            Click here to restart
          </button>
        </Link>
      </div>
    </>
  );
};

export default ErrorBoundary;
