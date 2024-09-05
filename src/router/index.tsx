import { createBrowserRouter } from 'react-router-dom';

// Auth Pages
import Login from '../modules/auth/pages/Login';
import Register from '../modules/auth/pages/Register';
import ForgotPassword from '../modules/auth/pages/ForgotPassword';
import PageNotFound from '../shared/pages/PageNotFound';
import Tasklist from '../modules/tasks/pages/TaskList';

// Components that allows to validate of auth session
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const router = createBrowserRouter([
  {
    path: '/auth/',
    element: <PublicRoute />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
    ],
  },
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <Tasklist />,
      },
    ],
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

export default router;
