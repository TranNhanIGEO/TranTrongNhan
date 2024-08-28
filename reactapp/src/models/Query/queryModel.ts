import { TableSortDirections } from "components/Table/types/tableTypes";

export interface SortingModel<T> {
  sortBy?: keyof T;
  sortDirection?: TableSortDirections;
}

export interface PagingModel {
  pageSize: number;
  pageIndex: number;
}

export interface SearchingModel {
  searchTerm?: string;
}

export interface QueryModel<T> extends SortingModel<T>, PagingModel, SearchingModel {

}
