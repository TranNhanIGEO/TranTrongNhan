import { FC, useMemo } from 'react';
import { Button, Form } from 'react-bootstrap';
import { CategoryViewModel } from 'models/DTOs/categoryModel';
import { QueryModel } from 'models/Query/queryModel';
import { FilterOffcanvasProps } from './types/filterOffcanvas';
import OptionCheck from '../components/Form/OptionCheck';
import AppOffcanvas from 'components/UI/Offcanvas';
import configs from 'configs';
import useGetCategories from 'hooks/categoryCRUD/useGetCategories';

const priceRanges = [
  { fromValue: '0', toValue: '1000000', label: 'Dưới 1 triệu' },
  { fromValue: '1000000', toValue: '2000000', label: 'Từ 1-2 triệu' },
  { fromValue: '2000000', toValue: '4000000', label: 'Từ 2-4 triệu' },
  { fromValue: '4000000', toValue: '6000000', label: 'Từ 4-6 triệu' },
  { fromValue: '6000000', toValue: '8000000', label: 'Từ 6-8 triệu' },
  { fromValue: '8000000', toValue: '10000000', label: 'Từ 8-10 triệu' },
];

const categoryQueryModel: QueryModel<CategoryViewModel> = {
  ...configs.query.categories,
  pageSize: 50,
};

const FilterOffcanvas: FC<FilterOffcanvasProps> = ({ isOpenModal, closeModal, productQuery, onCategoryChange, onPriceRangeChange }) => {
  const { records: categoryRecords } = useGetCategories(categoryQueryModel);

  const categoryList = useMemo(() => {
    return categoryRecords.map(record => (
      <Form.Group key={record.id} className="col-6 p-1">
        <OptionCheck
          id={record.id}
          value={record.id}
          label={record.name}
          checked={productQuery.categoryIds?.includes(record.id)}
          onChange={onCategoryChange}
        />
      </Form.Group>
    ));
  }, [categoryRecords, productQuery.categoryIds, onCategoryChange]);

  const priceRangeList = useMemo(() => {
    return priceRanges.map(price => (
      <Form.Group key={price.label} className="col-6 p-1">
        <OptionCheck
          id={price.fromValue + '-' + price.toValue}
          value={price.fromValue + '-' + price.toValue}
          label={price.label}
          checked={productQuery.fromValues?.includes(price.fromValue) && productQuery.toValues?.includes(price.toValue)}
          onChange={onPriceRangeChange}
        />
      </Form.Group>
    ));
  }, [productQuery.fromValues, productQuery.toValues, onPriceRangeChange]);

  return (
    <AppOffcanvas title="Bộ lọc sản phẩm" isOpen={isOpenModal} onClose={closeModal}>
      <div className="mb-3">
        <h5 className="ff-roboto fw-medium">Danh mục</h5>
        <div className="my-6 d-flex flex-wrap">{categoryList}</div>
      </div>
      <div className="mb-3">
        <h5 className="ff-roboto fw-medium">Mức giá</h5>
        <div className="my-6 d-flex flex-wrap">{priceRangeList}</div>
      </div>
      <div className="mb-3 d-flex justify-content-center gap-3">
        <Button variant="brown" className="px-8 rounded-0" onClick={closeModal}>
          Xem kết quả lọc
        </Button>
      </div>
    </AppOffcanvas>
  );
};

export default FilterOffcanvas;
