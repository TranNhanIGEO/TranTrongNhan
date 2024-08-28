import { FC } from "react";
import { TableContainerProps } from "components/Table/types/tableTypes";

const TableContainer: FC<TableContainerProps> = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export default TableContainer;