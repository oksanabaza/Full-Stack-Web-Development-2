import React from 'react';
import Pagination from '@mui/material/Pagination';
import { useTheme } from '@mui/material/styles';

interface CustomPaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({ count, page, onChange }) => {
  const theme = useTheme();

  const maxPages = Math.min(count, 500);

  return (
    <Pagination
      count={maxPages}
      page={page}
      onChange={onChange}
      color="primary"
      sx={{
        '& .MuiPaginationItem-root': {
          color: theme.palette.mode === 'dark' ? 'white' : theme.palette.text.primary,
        },
        '& .MuiPaginationItem-ellipsis': {
          color: theme.palette.mode === 'dark' ? 'white' : theme.palette.text.primary,
        },
      }}
    />
  );
};

export default CustomPagination;
