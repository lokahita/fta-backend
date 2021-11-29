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

export default function FormInformation({handleCloseDialog}) {

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);


    const [user, setUser] = useState(null);
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");

    const token = getCookie('CONTRIBUTOR_TOKEN');
    const public_id = getCookie('CONTRIBUTOR_PUBLIC_ID');
    const url_profile = Config.api_domain + "/user/id/";
    const url_update = Config.api_domain + "/user/update/";

    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {

        try {
            // Fetch data from REST API
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            };

            fetch(url_profile + public_id, requestOptions).then(res => res.json()).then(data => {
                setUser(data);
                setFullname(data.fullname);
                setEmail(data.email);
                //  if (data.status === "Expired token") {
            });

        } catch (error) {
            alert(`Error ${error}`)
        }
    }, []);

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
        return !loading && fullname.length > 0 && email.length > 0;
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
                    "fullname": fullname,
                    "email": email
                })
            };

            const response = await fetch(url_update, requestOptions)
            var json = await response.json();
            if (response.status === 200) {

                if (json.status === 'success') {
                    setSuccess(true);
                    setLoading(false);
                    setOpenBackdrop(false);
                    setOpen(true);
                    setMessage(json.message);
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
                <Label>Public Id</Label>
                <Entry>
                    <TextField id="outlined-basic" variant="outlined" value={user?.public_id} disabled size="small" fullWidth />
                </Entry>
            </FormInput>
            <FormInput>
                <Label>Username</Label>
                <Entry>
                    <TextField id="outlined-basic" variant="outlined" value={user?.username} disabled size="small" fullWidth />
                </Entry>
            </FormInput>
            <FormInput>
                <Label>Full Name</Label>
                <Entry>
                    <TextField id="outlined-basic" variant="outlined" value={fullname} size="small" fullWidth onChange={e => setFullname(e.target.value)} />
                </Entry>
            </FormInput>
            <FormInput>
                <Label>Email</Label>
                <Entry>
                    <TextField id="outlined-basic" type="email" variant="outlined" value={email} size="small" fullWidth onChange={e => setEmail(e.target.value)} />
                </Entry>
            </FormInput>
            
            <Button type="submit"  disabled={!validateForm()} variant="contained" color="primary" fullWidth size="small">Update</Button>
         
            </form>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleCloseDialog}
                size="small"
                style={{marginTop: "10px"}}
            >
                Cancel
            </Button>
            <Backdrop open={openBackdrop}  sx={{color: "#1976d2", backgroundColor: "rgba(255, 255, 255, 0.6)", zIndex:100}}>
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