import React from "react";
import {Box, CircularProgress} from "@mui/material";
import "./Loading.css";

export default function Loading() {
    return (
        <Box className='Loading h100'>
            <CircularProgress/>
        </Box>
    )
}
