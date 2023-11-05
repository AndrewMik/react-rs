import Search from './components/Search/Search';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Route as RoutePath } from './routes';
import Details from './components/Details/Details';
import { getCharacter } from './api/getCharacter';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={RoutePath.Home}
      element={<Search />}
      errorElement={<ErrorBoundary />}
    >
      <Route
        path=":id"
        element={<Details />}
        loader={async ({ params }) => {
          return getCharacter(params);
        }}
      ></Route>
    </Route>
  )
);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
