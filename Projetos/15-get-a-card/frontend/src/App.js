import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard';
import ProtectedRoutes from './middlewares/ProtectedRoutes';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Master from './components/Master/index.jsx';

const App = () => {
  return (
    <AuthProvider>
      <Master>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Master>
      
    </AuthProvider>
    
  );
};

export default App;
