import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import EditProfile from '../pages/EditProfile';
import CardPage from '../pages/CardPage';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  EDIT_PROFILE:'/edit-profile',
  CARD:'/card/:id',
  OFFERS: '/offers/:userId'
};

export const appRoutes = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.LOGIN, element: <Login /> },
  { path: ROUTES.REGISTER, element: <Register /> },
  { path: ROUTES.CARD, element: <CardPage/>},
  {
    element: <ProtectedRoutes />,
    children: [
      { path: ROUTES.DASHBOARD, element: <Dashboard /> },
      { path: ROUTES.PROFILE, element: <Profile /> },
      { path: ROUTES.EDIT_PROFILE, element: <EditProfile/> }
    ],
  },
];
