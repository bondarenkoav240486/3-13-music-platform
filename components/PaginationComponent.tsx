
import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// interface PaginationComponentProps {
//     count: number
//     onPageChange:
// }

// const PaginationComponent: React.FC<PaginationComponentProps> = ({ count, onPageChange }) => {
const PaginationComponent = ({ count, onPageChange }) => {
    const [page, setPage] = useState(1);

    const handleChange = (event, value) => {
        setPage(value);
        onPageChange(value);
    };

    return (
        <Stack spacing={2}>
            <Pagination
                count={count}
                page={page}
                onChange={handleChange}
                variant="outlined"
                color="primary"
                shape="rounded"
            />
        </Stack>
    );
};

export default PaginationComponent;
