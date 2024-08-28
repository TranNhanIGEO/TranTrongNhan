import "./style.scss";
import { FC } from 'react';
import MenuGroupList from './MenuGroupList';
import { Link } from 'react-router-dom';
import configs from 'configs';
import { IoCloseSharp } from "react-icons/io5";
import { SidebarProps } from "layouts/Admin/types/sidebarTypes";
import { MdOutlineAnalytics } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { PiFlowerTulip } from "react-icons/pi";
import { RiBillLine, RiDiscountPercentLine } from "react-icons/ri";
import { TbPhoto } from "react-icons/tb";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineFeedback } from "react-icons/md";

const linkGroups = [
  { title: "HOME", links: [
    { href: configs.routes.admin.dashboard, text: 'Bảng điều khiển', hasArrow: false, icon: <MdOutlineAnalytics size={16} /> },
  ]},
  { title: "SHOP", links: [
    { href: configs.routes.admin.category.root, text: 'Quản lý danh mục', hasArrow: false, icon: <TbCategory2 size={16} /> },
    { href: configs.routes.admin.product.root, text: 'Quản lý sản phẩm', hasArrow: false, icon: <PiFlowerTulip size={16} /> },
  ]},
  { title: "PROMOTION", links: [
    { href: configs.routes.admin.promotion.root, text: 'Quản lý khuyến mãi', hasArrow: false, icon: <RiDiscountPercentLine size={16} /> },
  ]},
  { title: "MARKETING", links: [
    { href: configs.routes.admin.banner.root, text: 'Quản lý băng rôn', hasArrow: false, icon: <TbPhoto size={16} /> },
    { href: configs.routes.admin.news.root, text: 'Quản lý tin tức', hasArrow: false, icon: <IoNewspaperOutline size={16} /> },
  ]},
  { title: "USER", links: [
    { href: configs.routes.admin.user, text: 'Quản lý người dùng', hasArrow: false, icon: <FaRegUserCircle size={16} /> },
    { href: configs.routes.admin.order.root, text: 'Quản lý đơn hàng', hasArrow: false, icon: <RiBillLine size={16} /> },
    { href: configs.routes.admin.feedback.root, text: 'Quản lý đánh giá', hasArrow: false, icon: <MdOutlineFeedback size={16} /> },
  ]},
];

const Sidebar: FC<SidebarProps> = ({ onToggleSidebar }) => {
  return (
    <div className="w-100 h-100">
      <div className="brand-logo d-flex align-items-center justify-content-between">
        <Link to={configs.routes.admin.dashboard} className="text-nowrap logo-img mx-auto">
          <img src="/logo.png" width="180" alt="Logo" />
        </Link>
        <div className="d-xl-none d-block cursor-pointer">
          <IoCloseSharp onClick={onToggleSidebar} />
        </div>
      </div>
      <nav className="sidebar-nav scroll-sidebar element-scrollable">
        <ul id="sidebarnav">
          <MenuGroupList groups={linkGroups} />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
