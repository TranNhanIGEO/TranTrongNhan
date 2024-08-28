import "./style.scss";
import { useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { Button, Col, FormControl, NavDropdown } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { TbLogin } from "react-icons/tb";
import { BsCart3 } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { RiProfileLine } from 'react-icons/ri';
import { MdManageAccounts } from 'react-icons/md';
import { authStore } from "stores/auth/authSlice";
import { AuthState } from "stores/auth/authStateTypes";
import { shoppingSessionStore } from "stores/shoppingSession/shoppingSessionSlice";
import { ShoppingSessionState } from "stores/shoppingSession/shoppingSessionStateTypes";
import configs from "configs";
import useLogout from "hooks/auth/useLogout";
import DropdownItem from "layouts/Admin/components/Header/DropdownItem";
import useGetProducts from "hooks/productCRUD/useGetProducts";
import useQuery from "hooks/common/useQuery";

const userDropdownItems = [
  { text: 'Thông tin cá nhân', to: '/my-profile', icon: <RiProfileLine color="#5a6a85" /> },
  { text: 'Đổi mật khẩu', to: '/change-password', icon: <MdManageAccounts color="#5a6a85" /> },
  // { text: 'Đơn hàng của tôi', to: '/my-order', icon: <RiBillLine color="#5a6a85" /> },
];

const socials = [
  { imageUrl: "/svg/facebook.svg", to: "https://www.facebook.com" },
  { imageUrl: "/svg/tiktok.svg", to: "https://www.tiktok.com" },
  { imageUrl: "/svg/instagram.svg", to: "https://www.instagram.com" },
];

const pages = [
  { title: "Trang chủ", to: configs.routes.customer.home },
  { title: "Giới thiệu", to: configs.routes.customer.about },
  { title: "Sản phẩm", to: configs.routes.customer.product.root },
  { title: "Tin tức", to: configs.routes.customer.news.root },
  { title: "Liên hệ", to: configs.routes.customer.contact },
]

const Header = () => {
  const navigate: NavigateFunction = useNavigate();
  const { user }: AuthState = useSelector(authStore);
  const { handleLogout } = useLogout();
  const isNavigated = useRef<boolean>(true);
  const { record: session }: ShoppingSessionState = useSelector(shoppingSessionStore);
  const { query, debouncedQuery, handleSearchChange } = useQuery(configs.query.products);
  useGetProducts(debouncedQuery);

  useEffect(() => {
    if (debouncedQuery.searchTerm?.trim()) {
      isNavigated.current = false;
      return;
    }
  }, [debouncedQuery, isNavigated])
  
  useEffect(() => {
    if (!isNavigated.current) {
      navigate(configs.routes.customer.product.root);
      isNavigated.current = true;
    }
  }, [debouncedQuery.searchTerm, isNavigated, navigate])

  const socialList = useMemo(() => {
    return socials.map(social => (
      <a key={social.to} href={social.to} className="cursor-pointer">
        <img src={social.imageUrl} alt="" loading="lazy" />
      </a>
    ))
  }, [])

  const pageList = useMemo(() => {
    return pages.map(page => (
      <li key={page.to} className="p-3 cursor-pointer">
        <Link className="mx-2 ff-inter fs-6 fw-bolder text-nowrap text-uppercase" to={page.to}>
          {page.title}
        </Link>
      </li>
    ))
  }, [])

  const userAvatar = useMemo(
    () => (
      <div className="d-flex align-items-center">
        <img 
          src={user.avatar ? `${process.env.REACT_APP_SERVER_DOMAIN}/${user.avatar}` : "/img/avatar.png"} 
          alt="User avatar" 
          className="rounded-circle pe-1" 
          width={24}
        />
        <span>Tài khoản</span>
      </div>
    ), 
    [user]
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
    <div className="container-sm">
      <div className="header-wrapper">
        <div className="d-flex justify-content-between border-bottom">
          <Link to="/cart" className="d-flex align-items-center p-3">
            <span className="position-relative pe-3">
              <BsCart3 size={20} />
              <span className="position-absolute top-0 end-0 fs-8 rounded-circle bg-danger text-white text-center" style={{ width: 16, height: 16 }}>
                {session.quantity}
              </span>
            </span>
            <span className="ff-inter fs-7">Giỏ hàng</span>
          </Link>
          <div className="p-3">
            <NavDropdown title={userAvatar}>
              {userDropdownItems.map(item => (
                <DropdownItem key={item.text} text={item.text} to={!!user.id ? `${item.to}/${user.id}` : configs.routes.auth.login} icon={item.icon} />
              ))}
              <NavDropdown.Divider />
              {authButton}
            </NavDropdown>
          </div>
        </div>
        <div className="header-content d-flex align-items-center flex-md-row flex-column-reverse">
          <Col md={4}>
            <div className="header-socials me-auto">
              {socialList}
            </div>
          </Col>
          <Col md={4}>
            <div className="header-logo mx-auto">
              <img className="object-fit-cover" src="/logo.png" alt="" />
            </div>
          </Col>
          <Col md={4}>
            <div className="header-action ms-auto">
              <FormControl name="searchTerm" className="pe-6" placeholder="Tìm kiếm..." autoComplete="off" value={query.searchTerm} onChange={handleSearchChange} />
              <IoIosSearch className="position-absolute end-0 top-50 translate-middle" />
            </div>
          </Col>
        </div>
        <div className="header-navigation d-flex justify-content-md-center justify-content-start border-top">
          <ul className="d-md-flex d-none align-items-center">
            {pageList}
          </ul>
          <div className="d-md-none d-block">
            <Button variant="" className="m-1 p-2 rounded-circle bg-light">
              <FiMenu size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
