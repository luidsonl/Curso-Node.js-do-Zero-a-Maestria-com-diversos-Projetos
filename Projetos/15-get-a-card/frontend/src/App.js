import { AuthProvider } from './contexts/AuthContext';
import AppRouter from './routes';

const App = () => (
  <AuthProvider>
      <AppRouter />
  </AuthProvider>
);

export default App;
