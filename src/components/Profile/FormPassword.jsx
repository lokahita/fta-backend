import styled from "styled-components";
import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import Config from '../../config.json';
import { getCookie } from '../../Helpers';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function FormPassword({handleCloseDialog}) {

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const token = getCookie('CONTRIBUTOR_TOKEN');
    const public_id = getCookie('CONTRIBUTOR_PUBLIC_ID');
    const url_password = Config.api_domain + "/user/password/";

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = (e) => {

        e.preventDefault();
        
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            setOpenBackdrop(true);
            postData();
        }
    };

    function validateForm() {
        return !loading && password.length > 0 && newPassword.length > 0 && repeatPassword.length > 0;
    }

    const postData = async () => {

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token
                 },
                body: JSON.stringify({
                    "public_id": public_id,
                    "current_password": password,
                    "new_password": newPassword,
                    "repeat_password": repeatPassword
                })
            };

            const response = await fetch(url_password, requestOptions)
            var json = await response.json();
            if (response.status === 200) {

                if (json.status === 'success') {
                    setSuccess(true);
                    setLoading(false);
                    setOpenBackdrop(false);
                    setOpen(true);
                    setMessage(json.message);
                    setPassword("");
                    setNewPassword("");
                    setRepeatPassword("");
                    //setAuth(true);
                    //window.location.reload();
                } else {
                    setSuccess(false);
                    setLoading(false);
                    setOpenBackdrop(false);
                    setOpen(true);
                    //setAuth(false);
                    setMessage(json.message);
                }
            } else {
                setSuccess(false);
                setLoading(false);
                setOpenBackdrop(false);
                setOpen(true);
                //setAuth(false);
                setMessage(`Error ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            setSuccess(false);
            setLoading(false);
            setOpenBackdrop(false);
            setOpen(true);
            //setAuth(false);
            setMessage(`Error ${error}`);
        }
    };



    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', minHeight: "30vh" }}>
            <form onSubmit={(e) => handleSubmit(e)}>
                <FormInput>
                    <Label>Current Password</Label>
                    <Entry>
                        <TextField id="outlined-basic" variant="outlined" type="password" size="small" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
                    </Entry>
                </FormInput>
                <FormInput>
                    <Label>New Password</Label>
                    <Entry>
                        <TextField id="outlined-basic" variant="outlined" type="password" size="small" fullWidth value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                    </Entry>
                </FormInput>
                <FormInput>
                    <Label>Repeat Password</Label>
                    <Entry>
                        <TextField id="outlined-basic" variant="outlined" type="password" size="small" fullWidth value={repeatPassword} onChange={e => setRepeatPassword(e.target.value)} />
                    </Entry>
                </FormInput>

                <Button type="submit" disabled={!validateForm()} variant="contained" color="primary" fullWidth size="small">Change Password</Button>

            </form>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseDialog}
                size="small"
                style={{ marginTop: "10px" }}
            >
                Cancel
            </Button>
            <Backdrop open={openBackdrop} sx={{ color: "#1976d2", backgroundColor: "rgba(255, 255, 255, 0.6)", zIndex: 100 }}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={open} autoHideDuration={8000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                {success ?
                    <Alert onClose={handleClose} severity="success">
                        {message}
                    </Alert>
                    :
                    <Alert onClose={handleClose} severity="error">{message}</Alert>
                }
            </Snackbar>
        </div>

    )
}


const FormInput = styled.div`
  margin:10px;
  display: flex;
`;

const Label = styled.div`
    width: 150px;
`;
const Entry = styled.div`
    flex-grow: 1;
    display: flex;
`;

const EntryMiddle = styled.div`
    flex-grow: 1;
    padding-right: 10px;
`;