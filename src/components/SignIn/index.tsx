import React, {useCallback, useState} from "react";
import "./SignIn.css";
import {Button, FormControl, FormHelperText, FormLabel} from "@mui/material";
import {useAuth} from '../../contexts/AuthContext';
import TextField from '@mui/material/TextField';

export default function SignIn() {
    const {signIn} = useAuth()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [process, setProcess] = useState<boolean>(false)


    const onChangeEmail = useCallback((e: any) => {
        setEmail(e?.target?.value)
        setError('')
    }, [setEmail, setError])

    const onChangePassword = useCallback((e: any) => {
        setPassword(e?.target?.value)
        setError('')
    }, [setPassword, setError])

    const signInCallback = useCallback((event: any) => {
        event.preventDefault();
        setProcess(true)
        signIn(email, password)
            .then(() => setError(''))
            .catch((e: any) => setError(e.message))
            .finally(() => setProcess(false))

    }, [signIn, email, password, setError, setProcess])

    return (
        <form onSubmit={signInCallback} className='FormContainer'>
            <FormControl sx={{m: 6}} error={!!error} variant="standard" className='Form'>
                <FormLabel>Sign In</FormLabel>
                <div className='FormFieldContainer'>
                    <TextField
                        label="Email"
                        value={email}
                        onChange={onChangeEmail}
                        disabled={process}
                    />
                </div>
                <div className='FormFieldContainer'>
                    <TextField
                        label="Password"
                        value={password}
                        onChange={onChangePassword}
                        type='password'
                        disabled={process}
                    />
                </div>
                {error && (
                    <div className='FormFieldContainer'>
                        <FormHelperText>{error}</FormHelperText>
                    </div>
                )}
                <div>
                    <Button type="submit" variant="outlined" disabled={process}>
                        Submit
                    </Button>
                </div>
            </FormControl>
        </form>
    );
}
