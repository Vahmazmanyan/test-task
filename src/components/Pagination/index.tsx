import React from "react";
import { Pagination as AntPagination } from "antd";

interface Props {
  total: number;
  changePage: (page: number) => void;
  current: number;
}

const Pagination: React.FC<Props> = ({ total, changePage, current }) => {
  return (
    <AntPagination
      defaultCurrent={1}
      current={current}
      total={total}
      showSizeChanger={false}
      style={{
        marginTop: 15,
      }}
      onChange={changePage}
    />
  );
};

export default Pagination;
