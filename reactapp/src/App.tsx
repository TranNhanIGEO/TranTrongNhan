import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { AdminLayout, AuthLayout, CustomerLayout } from 'layouts';
import { NotRequiredAuth, RequiredAdminRole, RequiredAuth } from 'middlewares/RouterAuth';
import configs from 'configs';
import SessionManager from 'middlewares/SessionManager';
import TokenManager from 'middlewares/TokenManager';

const App: FC = () => {
  const { authPages, commonPages, publicPages, privatePages, errorPage } = configs.pages;

  return (
    <Router>
      <TokenManager>
        <Routes>
            <Route element={<NotRequiredAuth />}>
              {authPages.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <AuthLayout>
                      <route.element />
                    </AuthLayout>
                  }
                />
              ))}
            </Route>
            <Route element={<RequiredAuth />}>
              {commonPages.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <AuthLayout>
                      <route.element />
                    </AuthLayout>
                  }
                />
              ))}
            </Route>
            <Route element={<RequiredAdminRole />}>
              {privatePages.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <AdminLayout>
                      <route.element />
                    </AdminLayout>
                  }
                />
              ))}
            </Route>
            <Route element={<Outlet />}>
              {publicPages.map(route => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <CustomerLayout>
                      <SessionManager>
                        <route.element />
                      </SessionManager>
                    </CustomerLayout>
                  }
                />
              ))}
            </Route>
            <Route path={errorPage.path} element={<errorPage.element />} />
        </Routes>
      </TokenManager>
    </Router>
  );
};

export default App;
