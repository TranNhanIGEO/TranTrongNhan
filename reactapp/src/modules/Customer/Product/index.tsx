import { FC, useMemo } from 'react'
import { Container } from 'react-bootstrap';
import { ProductViewModel } from 'models/DTOs/productModel';
import { QueryModel } from 'models/Query/queryModel';
import { ProductQueryModel } from 'models/Query/productQueryModel';
import configs from 'configs';
import LoadMoreButton from './LoadMoreButton';
import ProductList from './ProductList';
import FilterOffcanvas from './FilterOffcanvas';
import FilterButton from './FilterButton';
import SortDropdown from './SortDropdown';
import useQuery from 'hooks/common/useQuery';
import useGetProducts from 'hooks/productCRUD/useGetProducts';
import useModal from 'components/UI/hooks/useModal';
import useProductQuery from './hooks/useProductQuery';
import { useGetQueryParams, usePostQueryParams } from 'hooks/common/useQueryParams';
import useUpdateCart from 'hooks/cartCRUD/useUpdateCart';

const queryModel: QueryModel<ProductViewModel> = {
  ...configs.query.products,
  pageSize: 12,
};

const productQueryModel: ProductQueryModel = {
  categoryIds: [],
  fromValues: [],
  toValues: [],
}

const Product: FC = () => {
  const { isOpenModal, openModal, closeModal } = useModal();
  const { productQuery, debouncedProductQuery, handleCategoryChange, handlePriceRangeChange } = useProductQuery(productQueryModel);
  const { hasSearchParams, searchModel } = useGetQueryParams<QueryModel<ProductViewModel> & ProductQueryModel>();
  const { query, debouncedQuery, handleSort, handlePageIndex } = useQuery(hasSearchParams ? searchModel : queryModel);
  const { pageIndex, pageSize, sortBy, sortDirection } = query;
  
  const { handleCartClick } = useUpdateCart();
  
  const debouncedQueryModel = useMemo(() => {
    return {...debouncedQuery, ...debouncedProductQuery}
  }, [debouncedQuery, debouncedProductQuery])

  const queryParams = useMemo(() => {
    return {...query, ...productQuery}
  }, [query, productQuery])
  
  usePostQueryParams(queryParams);
  const { records, totalRecords, isLoading } = useGetProducts(debouncedQueryModel, true);

  const filteringQuantity: number = useMemo(() => {
    return Number(productQuery.categoryIds?.length) + Number(productQuery.fromValues?.length)
  }, [productQuery])

  const remainingQuantity: number = useMemo(() => {
    return totalRecords - pageIndex * pageSize
  }, [totalRecords, pageIndex, pageSize])

  return (
    <Container>
      <div className="d-flex justify-content-between p-3 mt-6 rounded-2 bg-light">
        <FilterButton 
          openModal={openModal} 
          filteringQuantity={filteringQuantity} 
        />
        <SortDropdown 
          sortBy={sortBy} 
          sortDirection={sortDirection} 
          handleSort={handleSort} 
        />
      </div>
      <ProductList products={records} onAddCart={handleCartClick} />
      {remainingQuantity > 0 &&
        <LoadMoreButton 
          remainingQuantity={remainingQuantity} 
          isLoading={isLoading}
          onClick={() => handlePageIndex(Number(pageIndex) + 1)} 
        />
      }
      <FilterOffcanvas 
        isOpenModal={isOpenModal} 
        closeModal={closeModal} 
        productQuery={productQuery}
        onCategoryChange={handleCategoryChange} 
        onPriceRangeChange={handlePriceRangeChange} 
      />
    </Container>
  )
}

export default Product