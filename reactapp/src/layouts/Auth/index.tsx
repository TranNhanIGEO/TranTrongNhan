import './style.scss';
import { FC, ReactNode } from 'react';
import AppToastContainer from 'components/UI/ToastContainer';

const AuthLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="position-relative overflow-hidden">
      <div className="element-overlay bg-light-primary position-absolute w-100 h-100" />
      <div className="container element-flex-center position-relative w-100vw h-100vh">{children}</div>
      <AppToastContainer />
    </main>
  );
};

export default AuthLayout;
