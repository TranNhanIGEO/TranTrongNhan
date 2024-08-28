import { FC, ReactNode } from 'react';
import { Footer, Header, Sidebar } from './components';
import AppToastContainer from 'components/UI/ToastContainer';

const CustomerLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="page-wrapper" id="main-wrapper">
      <header className="header">
        <Header />
      </header>
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="main">
        {children}
      </main>
      <footer className="footer">
        <Footer />
      </footer>
      <AppToastContainer />
    </div>
  );
};

export default CustomerLayout;
