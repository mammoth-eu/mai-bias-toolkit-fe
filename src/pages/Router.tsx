import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserControlPanel from '../components/layout/UserControlPanel';
import DashboardPage from './DashboardPage';
import DatasetPage from './DatasetPage';
import ModelPage from './ModelPage';
import RunsPage from './RunsPage';
import RunPage from './RunPage';
import ComponentPage from './ComponentPage';
import UsersPage from './UsersPage.tsx';

const router = createBrowserRouter([
   {
      path: '/',
      element: (
         <UserControlPanel>
            <DashboardPage />
         </UserControlPanel>
      )
   },
   {
      path: '/dashboard',
      element: (
         <UserControlPanel>
            <DashboardPage />
         </UserControlPanel>
      )
   },
   {
      path: '/dataset',
      element: (
         <UserControlPanel>
            <DatasetPage />
         </UserControlPanel>
      )
   },
   {
      path: '/model',
      element: (
         <UserControlPanel>
            <ModelPage />
         </UserControlPanel>
      )
   },
   {
      path: '/runs',
      element: (
         <UserControlPanel>
            <RunsPage />
         </UserControlPanel>
      )
   },
   {
      path: '/runs/run/:uuid',
      element: (
         <UserControlPanel>
            <RunPage />
         </UserControlPanel>
      )
   },
   {
      path: '/component',
      element: (
         <UserControlPanel>
            <ComponentPage />
         </UserControlPanel>
      )
   },
   {
      path: '/users',
      element: (
         <UserControlPanel>
            <UsersPage />
         </UserControlPanel>
      )
   }
]);

const Router = () => {
   return (
      <main style={{ minHeight: '85vh' }} className="has-background-white-bis">
         <RouterProvider router={router} />
      </main>
   );
};

export default Router;
