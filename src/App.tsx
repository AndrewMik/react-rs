import Search from './components/Search/Search';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Search />
    </ErrorBoundary>
  );
};

export default App;
