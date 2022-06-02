import React from 'react';
import Statistic from './components/Statistic';
import SignIn from './components/SignIn';
import {AuthContextProvider} from './contexts/AuthContext';
import './App.css';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {CheckAuth} from "./components/CheckAuth";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider theme={darkTheme}>
                <AuthContextProvider>
                    <Routes>
                        <Route path="/" element={<CheckAuth><Statistic/></CheckAuth>}/>
                        <Route path="/in" element={<CheckAuth isGuest><SignIn/></CheckAuth>}/>
                    </Routes>
                </AuthContextProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
