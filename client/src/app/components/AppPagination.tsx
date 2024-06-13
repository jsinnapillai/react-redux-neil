import { Box, Typography, Pagination } from "@mui/material";
import React from "react";
import { MetaData } from "../models/pagination";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

const AppPagination = ({ metaData, onPageChange }: Props) => {
  const { CurrnetPage, TotalCount, TotalPages, PageSize } = metaData;
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        Displaying {(CurrnetPage - 1) * PageSize + 1}-
        {CurrnetPage * PageSize > TotalCount
          ? TotalCount
          : CurrnetPage * PageSize} 
        of {TotalCount} items 
      </Typography>
      <Pagination
        count={TotalPages}
        page={CurrnetPage}
        onChange={(e,page) => onPageChange(page)}
        color="secondary"
        size="large"
      />
    </Box>
  );
};

export default AppPagination;
