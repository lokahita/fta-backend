
import { useEffect, useState } from 'react';
import Config from '../config.json';
import { getCookie } from '../Helpers';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import styled from "styled-components";

function Logout() {
    const [open, setOpen] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    useEffect(() => {

        const token = getCookie('CONTRIBUTOR_TOKEN');
        const url_logout = Config.api_domain + "/auth/logout";
        const postData = async () => {

            try {

                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                };
                const response = await fetch(url_logout, requestOptions)
                var json = await response.json();
                if (response.status === 200) {
                    if (json.status === 'success') {
                        //alert(json.message)
                        setSuccess(true);
                        setOpen(true);
                        setMessage("You are successfully logged out");
                        window.location.href = Config.base_domain + "/"
                    } else {
                        setSuccess(true);
                        setOpen(true);
                        setMessage(json.message)
                    }
                } else {
                    setSuccess(true);
                    setOpen(true);
                    setMessage(response.status)
                }

            } catch (error) {

                setSuccess(true);
                setOpen(true);
                setMessage(error)
            }

        };
        postData();
    }, []);

    return (
        <Container >
            <Backdrop open={true} sx={{color: "white", backgroundColor: "rgba(255, 255, 255, 0.8)", zIndex:100}}>
                <CircularProgress color="inherit" />
                Logout ...
            </Backdrop>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                {success ?
                    <Alert onClose={handleClose} severity="success">
                        {message}
                    </Alert>
                    :
                    <Alert onClose={handleClose} severity="error">{message}</Alert>
                }
            </Snackbar>
        </Container>
    )
}

export default Logout;

const Container = styled.div`
`;