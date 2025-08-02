import { AuthProvider } from './contexts/AuthContext';
import Master from './components/Master';
import AppRouter from './routes';

const App = () => (
  <AuthProvider>
      <AppRouter />
  </AuthProvider>
);

export default App;
