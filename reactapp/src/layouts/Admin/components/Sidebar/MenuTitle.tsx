import { FC } from 'react';
import { BsThreeDots } from "react-icons/bs";

const MenuTitle: FC<{ title: string }> = ({ title }) => {
  return (
    <li className="nav-small-cap">
      <BsThreeDots className='nav-small-cap-icon' size={16} />
      <span className="hide-menu">{title}</span>
    </li>
  )
}

export default MenuTitle