import Search from './components/Search/Search';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Route as RoutePath } from './routes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={RoutePath.Home}
      element={<Search />}
      errorElement={<ErrorBoundary />}
    />
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
