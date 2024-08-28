import './style.scss';
import { FC, ReactNode } from 'react';
import { Footer, Header, Sidebar } from './components';
import AppToastContainer from 'components/UI/ToastContainer';
import clsx from 'clsx';
import useSidebarToggle from './hooks/useSidebarToggle';

const AdminLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const { isShowSidebar, handleToggleSidebar } = useSidebarToggle();

  const layoutClass = clsx('page-wrapper header-fixed sidebar-fixed', {
    'mini-sidebar': !isShowSidebar,
    'full-sidebar': isShowSidebar,
  });

  return (
    <div className={layoutClass}>
      <aside className="left-sidebar">
        <Sidebar onToggleSidebar={handleToggleSidebar} />
      </aside>
      <div className="body-wrapper">
        <header className="app-header bg-white">
          <Header onToggleSidebar={handleToggleSidebar} />
        </header>
        <main className="app-main container-fluid bg-light">
          {children}
        </main>
        <footer className="app-footer position-absolute bottom-0 w-100 bg-white">
          <Footer />
        </footer>
      </div>
      <AppToastContainer />
    </div>
  );
};

export default AdminLayout;
