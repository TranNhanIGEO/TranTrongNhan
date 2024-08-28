import { FC, ReactNode, useMemo } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { GrSort } from 'react-icons/gr';
import { FaSortAlphaDown, FaSortAlphaDownAlt } from 'react-icons/fa';
import { BsSortDown, BsSortDownAlt } from 'react-icons/bs';
import { SortButtonTypes, SortDropdownProps } from './types/sortDropdownTypes';

const sortButtons: SortButtonTypes[] = [
  { label: "Tên A-Z", field: "name", orderBy: "asc", icon: <FaSortAlphaDown /> },
  { label: "Tên Z-A", field: "name", orderBy: "desc", icon: <FaSortAlphaDownAlt /> },
  { label: "Giá cao-thấp", field: "price", orderBy: "desc", icon: <BsSortDown /> },
  { label: "Giá thấp-cao", field: "price", orderBy: "asc", icon: <BsSortDownAlt /> },
]
  
const SortDropdown: FC<SortDropdownProps> = ({ sortBy, sortDirection, handleSort }) => {
  const buttonTitle: ReactNode = useMemo(() => {
    const btn: SortButtonTypes | undefined = sortButtons.find(b => b.field === sortBy && b.orderBy === sortDirection);
    return <div className='d-flex align-items-center gap-1'><GrSort />{btn?.label ?? "Sắp xếp"}</div>
  }, [sortBy, sortDirection])

  return (
    <DropdownButton variant='outline-brown' title={buttonTitle}>
      {sortButtons.map(button => (
        <Dropdown.Item 
          key={button.label}
          className='d-flex align-items-center gap-1' 
          active={button.field === sortBy && button.orderBy === sortDirection}
          onClick={() => handleSort && handleSort(button.field, button.orderBy)}
        >
          {button.icon}
          {button.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  )
};

export default SortDropdown;
