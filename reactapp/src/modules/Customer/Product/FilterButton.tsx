import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import { FilterButtonProps } from './types/filterButtonProps';

const FilterButton: FC<FilterButtonProps> = ({ filteringQuantity: filterQuantity, openModal }) => (
  <Button variant="outline-brown" className="d-flex align-items-center gap-1 position-relative" onClick={openModal}>
    <FaFilter />
    <span>Bộ lọc</span>
    {!!filterQuantity && (
      <span className="position-absolute top-0 end-0 fs-8 rounded-circle bg-warning" style={{ width: 16, height: 16 }}>
        {filterQuantity}
      </span>
    )}
  </Button>
);

export default FilterButton;
