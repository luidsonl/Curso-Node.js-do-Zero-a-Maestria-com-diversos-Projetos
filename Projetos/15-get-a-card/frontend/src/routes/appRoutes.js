import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import ProtectedRoutes from './middlewares/ProtectedRoutes';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile'
};

export const appRoutes = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.LOGIN, element: <Login /> },
  { path: ROUTES.REGISTER, element: <Register /> },
  {
    element: <ProtectedRoutes />,
    children: [
      { path: ROUTES.DASHBOARD, element: <Dashboard /> },
      { path: ROUTES.PROFILE, element: <Profile /> }
    ],
  },
];
