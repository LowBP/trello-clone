import './App.css';
import Root from './pages/root-page';
import Home from './pages/home-page';
import ErrorPage from './pages/error-page';
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom';
import { fetchWorkSpaceList } from './helpers/APILayers';

const router =  () => { 
  const boardListData = fetchWorkSpaceList();
  const defaultRoutePath = '/w/1/my-boards/1';
  const rootLoader = async () =>{
    return await boardListData;
  }

  // used latest react-router-dom https://reactrouter.com/en/6.6.1 
  return createBrowserRouter(
    createRoutesFromElements(<>
      <Route path="/" element={<Root/>} errorElement={<ErrorPage />} loader={rootLoader}>
        <Route
          path="w/:workspaceId/my-boards/:myBoardId"
          element={<Home />}
          loader={rootLoader}
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
