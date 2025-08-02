import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { appRoutes } from './appRoutes';
import Master from '../components/Master';

const AppRouter = () => (
  <BrowserRouter>
    <Master>
      <Routes>
        {appRoutes.map((route, index) =>
          route.children ? (
            <Route key={index} element={route.element}>
              {route.children.map((child, idx) => (
                <Route key={idx} path={child.path} element={child.element} />
              ))}
            </Route>
          ) : (
            <Route key={index} path={route.path} element={route.element} />
          )
        )}
      </Routes>
    </Master>
    
  </BrowserRouter>
);

export default AppRouter;
