
// import React, { useState } from 'react';
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

// // interface PaginationComponentProps {
// //     count: number
// //     onPageChange:
// // }

// // const PaginationComponent: React.FC<PaginationComponentProps> = ({ count, onPageChange }) => {
// const PaginationComponent = ({ count, onPageChange }) => {
//     const [page, setPage] = useState(1);

//     const handleChange = (event, value) => {
//         setPage(value);
//         onPageChange(value);
//     };

//     return (
//         <Stack spacing={2}>
//             <Pagination
//                 count={count}
//                 page={page}
//                 onChange={handleChange}
//                 variant="outlined"
//                 color="primary"
//                 shape="rounded"
//             />
//         </Stack>
//     );
// };

// export default PaginationComponent;





// import React from 'react';
// import Pagination from '@material-ui/lab/Pagination';
// import { Box } from '@material-ui/core';

// interface PaginationComponentProps {
//     page: number;
//     count: number;
//     onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
// }

// const PaginationComponent: React.FC<PaginationComponentProps> = ({ page, count, onPageChange }) => {
//     return (
//         <Box display="flex" justifyContent="center" marginTop={2}>
//             <Pagination
//                 count={count}
//                 page={page}
//                 onChange={onPageChange}
//                 color="primary"
//             />
//         </Box>
//     );
// };

// export default PaginationComponent;




import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// import Pagination from '@material-ui/lab/Pagination';


interface PaginationComponentProps {
    count: number; // Кількість сторінок
    onPageChange: (page: number) => void; // Функція зміни сторінки
    page: number
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ count, onPageChange, page }) => {
    const [pageToPagination, setPageToPagination] = useState(page);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPageToPagination(value);
        onPageChange(value);
    };

    return (
        <Stack spacing={2}>
            <Pagination
                count={count}
                page={pageToPagination}
                onChange={handleChange}
                // variant="outlined"
                color="primary"
                // shape="rounded"
            />
      {/* <Pagination count={count} color="secondary" /> */}

        </Stack>
    );
};

export default PaginationComponent;

