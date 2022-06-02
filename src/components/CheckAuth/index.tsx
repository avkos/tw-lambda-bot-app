import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {Button} from "@mui/material";
import Container from "@mui/material/Container";

export const CheckAuth = (props: any) => {
    const {isGuest = false, children} = props;
    const {isAuthenticated = false, user, signOut} = useAuth();

    const noNeedRedirect = isGuest ? !isAuthenticated : isAuthenticated
    const redirectUrl = noNeedRedirect ? false : (isGuest ? '/' : '/in')


    if (redirectUrl) {
        return (
            <Navigate
                replace
                to={redirectUrl}
            />
        )
    }
    if (isGuest) {
        return children
    }

    return (
        <>
            <div className='NavBar'>
                <h1 className='TotalText'>{user?.email}</h1>
                <Button onClick={() => signOut()}>Sign out</Button>
            </div>
            <Container maxWidth="xl" className='h100'>
                {children}
            </Container>
        </>
    )
};
