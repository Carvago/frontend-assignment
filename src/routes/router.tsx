import {createBrowserRouter} from 'react-router-dom';
import {ProtectedRoute} from './ProtectedRoute';
import {PATHS} from './paths';
import {LoginPage} from '../pages/LoginPage';
import {RegisterPage} from '../pages/RegisterPage';
import {OverviewPage} from '../pages/OverviewPage';
import {NewTaskPage} from '../pages/NewTaskPage';
import {EditTaskPage} from '../pages/EditTaskPage';
import {NotFoundPage} from '../pages/NotFoundPage';

export const router = createBrowserRouter([
  {path: PATHS.LOGIN, element: <LoginPage />},
  {path: PATHS.REGISTER, element: <RegisterPage />},
  {
    element: <ProtectedRoute />,
    children: [
      {path: PATHS.OVERVIEW, element: <OverviewPage />},
      {path: PATHS.NEW_TASK, element: <NewTaskPage />},
      {path: PATHS.EDIT_TASK, element: <EditTaskPage />},
    ],
  },
  {path: '*', element: <NotFoundPage />},
]);
