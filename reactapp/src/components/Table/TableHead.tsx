import { FC } from "react";
import { TableHeadProps } from "components/Table/types/tableTypes";

const TableHead: FC<TableHeadProps> = ({ children, ...props }) => {
  return <thead {...props}>{children}</thead>;
};

export default TableHead;