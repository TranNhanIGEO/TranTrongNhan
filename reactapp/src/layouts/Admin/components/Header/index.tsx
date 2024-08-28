import './style.scss';
import { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { TbBellRinging } from 'react-icons/tb';
import { TbLogin } from "react-icons/tb";
import { IoLogOutOutline } from 'react-icons/io5';
import { MdMenu } from 'react-icons/md';
import { RiProfileLine } from 'react-icons/ri';
import { MdManageAccounts } from 'react-icons/md';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { HeaderProps } from 'layouts/Admin/types/headerTypes';
import { AuthState } from 'stores/auth/authStateTypes';
import { authStore } from 'stores/auth/authSlice';

import useLogout from 'hooks/auth/useLogout';
import DropdownItem from './DropdownItem';
import configs from 'configs';

const userDropdownItems = [
  { text: 'Thông tin cá nhân', to: '/my-profile', icon: <RiProfileLine color="#5a6a85" /> },
  { text: 'Đổi mật khẩu', to: '/change-password', icon: <MdManageAccounts color="#5a6a85" /> },
];

const Header: FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user }: AuthState = useSelector(authStore);
  const { handleLogout } = useLogout();

  // const bellIcon = useMemo(
  //   () => (
  //     <Nav.Item>
  //       <TbBellRinging size={20} />
  //       <div className="notification bg-primary rounded-circle"></div>
  //     </Nav.Item>
  //   ),
  //   [],
  // );

  const userAvatar = useMemo(
    () => (
      <img 
        src={user.avatar ? `${process.env.REACT_APP_SERVER_DOMAIN}/${user.avatar}` : "/img/avatar.png"} 
        alt="User avatar" 
        className="rounded-circle" 
        width={24}
      />
    ), 
    [user.avatar]
  )

  const authButton = useMemo(() => {
    return user.id ? (
      <Link to="#" className="btn btn-outline-primary mx-3 d-flex align-items-center gap-2" onClick={handleLogout}>
        <IoLogOutOutline />
        <p className="mb-0">Logout</p>
      </Link>
    ) : (
      <Link to={configs.routes.auth.login} className="btn btn-outline-primary mx-3 d-flex align-items-center gap-2">
        <TbLogin />
        <p className="mb-0">Login</p>
      </Link>
    )
  }, [user.id, handleLogout])
  
  return (
    <Navbar expand="lg">
      <Nav>
        <Nav.Item className="d-block d-xl-none">
          <Nav.Link href="#" onClick={onToggleSidebar}>
            <MdMenu size={20} />
          </Nav.Link>
        </Nav.Item>
        {/* <NavDropdown title={bellIcon} align="start">
        {userDropdownItems.map(item => (
          <DropdownItem key={item.text} text={item.text} to={`${item.to}/${user.id}`} icon={item.icon} />
        ))}
        </NavDropdown> */}
      </Nav>
      <Navbar.Collapse className="show justify-content-end px-0">
        <Nav className="flex-row ms-auto align-items-center justify-content-end">
          <NavDropdown title={userAvatar} align="end">
            {userDropdownItems.map(item => (
              <DropdownItem key={item.text} text={item.text} to={`${item.to}/${user.id}`} icon={item.icon} />
            ))}
            <NavDropdown.Divider />
            {authButton}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
