import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserControlPanel from '../components/layout/UserControlPanel';
import DashboardPage from './DashboardPage';
import DatasetPage from './DatasetPage';
import ModelPage from './ModelPage';
import RunsPage from './RunsPage';
import RunPage from './RunPage';

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
      path: '/runs/run/:runId',
      element: (
         <UserControlPanel>
            <RunPage />
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
