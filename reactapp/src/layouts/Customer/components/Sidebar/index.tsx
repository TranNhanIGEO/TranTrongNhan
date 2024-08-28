import "./style.scss";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-header element-flex-center">
        <div className="sidebar-logo">
          <img className="element-image" src="/logo.png" alt="" />
        </div>
        <button className="sidebar-toggle element-position__topRight mt-6 me-6">
          <span className="fs-1 fw-bolder">&times;</span>
        </button>
      </div>
      <hr className="sidebar-break my-1 mx-4" />
      <div className="sidebar-body">
        <div className="sidebar-wrapper">
          <ul className="sidebar-menu-items">
            <li className="element-flex-between mb-2 p-4">
              <Link className="ms-3 me-auto ff-inter fs-6" to="#">
                Trang chủ
              </Link>
            </li>
            <li className="element-flex-between mb-2 p-4">
              <Link className="ms-3 me-auto ff-inter fs-6" to="#">
                Giới thiệu
              </Link>
            </li>
            <li className="element-flex-between mb-2 p-4">
              <Link className="ms-3 me-auto ff-inter fs-6" to="#">
                Sản phẩm
              </Link>
              <button>&#10095;</button>
            </li>
            <li className="element-flex-between mb-2 p-4">
              <Link className="ms-3 me-auto ff-inter fs-6" to="#">
                Dịch vụ
              </Link>
              <button>&#10095;</button>
            </li>
            <li className="element-flex-between mb-2 p-4">
              <Link className="ms-3 me-auto ff-inter fs-6" to="#">
                Tin tức
              </Link>
            </li>
            <li className="element-flex-between mb-2 p-4">
              <Link className="ms-3 me-auto ff-inter fs-6" to="#">
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
