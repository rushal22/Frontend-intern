import React from 'react';
import { CircularProgress , Box ,Typography } from '@mui/material';



const Loadingpage = () => {
    return (
        <>
        <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight= '100vh'
        >
            <CircularProgress />
            <Typography variant='h6' mt={2}>
                Loading please wait...
            </Typography>
        </Box>
        </>
    );
};

export default Loadingpage;