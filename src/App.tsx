import './App.css';
import Root from './pages/root-page';
import Home from './pages/home-page';
import ErrorPage from './pages/error-page';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';

const router =  () => { 
  const defaultRoutePath = '/w/1/my-boards/1';

  // used latest react-router-dom https://reactrouter.com/en/6.6.1 
  return createBrowserRouter(
    createRoutesFromElements(<>
      <Route path="/" element={<Root/>} errorElement={<ErrorPage />}>
        <Route
          path="w/:workspaceId/my-boards/:myBoardId"
          element={<Home />}
        />
        <Route
          path="/"
          element={<Navigate to={defaultRoutePath} />}
        />
      </Route>
      <Route
        path="*"
        element={<Navigate to={defaultRoutePath} />}
      />
    </>
    )
  )
 
}

function App() {
  
  return (
    <RouterProvider router={router()} />
  );
}

export default App;
