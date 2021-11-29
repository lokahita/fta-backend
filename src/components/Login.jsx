
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


import { useState } from 'react';
import styled from "styled-components";

import Config from '../config.json';

import { setCookie } from '../Helpers';
import background from '../background.jpg';

export default function Login({ setAuth }) {

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const url_login = Config.api_domain + "/auth/login";

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
            postData();

            //timer.current = window.setTimeout(() => {
            //    setSuccess(true);
            //    setLoading(false);
            //}, 2000);
        }
    };

    function validateForm() {
        return !loading && username.length > 0 && password.length > 0;
    }


    const postData = async () => {

        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                })
            };

            const response = await fetch(url_login, requestOptions)
            var json = await response.json();
            if (response.status === 200) {

                if (json.Authorization) {
                    setPassword("");
                    setCookie('CONTRIBUTOR_TOKEN', json.Authorization);
                    setCookie('CONTRIBUTOR', username);
                    setCookie('CONTRIBUTOR_PUBLIC_ID',  json.public_id);
                    //setCountry('CONTRIBUTOR', username);

                    setSuccess(true);
                    setLoading(false);
                    setOpen(true);
                    setMessage("You are successfully logged in");
                    //setAuth(true);
                    window.location.reload();
                } else {
                    setSuccess(false);
                    setLoading(false);
                    setOpen(true);
                    //setAuth(false);
                    setMessage(json.message);
                }
            } else {
                setSuccess(false);
                setLoading(false);
                setOpen(true);
                //setAuth(false);
                setMessage(`Error ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            setSuccess(false);
            setLoading(false);
            setOpen(true);
            //setAuth(false);
            setMessage(`Error ${error}`);
        }
    };


    return (
    <>
        <Container>
            <Centered>
                <Header>
                    <Title>Login As Contributor</Title>
                </Header>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <InputWrap>
                        <TextField required id="username" autoComplete="off" label="Username" color="secondary" size="small" value={username} onChange={e => setUsername(e.target.value)} />
                    </InputWrap>
                    <InputWrap>
                        <TextField required id="password" label="Password" color="secondary" size="small" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </InputWrap>
                    <ButtonWrapper>
                        <ButtonLogin fullWidth variant="outlined"
                            type="submit" disabled={!validateForm()}
                        >
                            Login
                        </ButtonLogin>
                        {loading && <CircularProgressExt size={24} />}
                    </ButtonWrapper>
                </form>
            </Centered>
            <Snackbar open={open} autoHideDuration={8000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                {success ?
                    <Alert onClose={handleClose} severity="success">
                        {message}
                    </Alert>
                    :
                    <Alert onClose={handleClose} severity="error">{message}</Alert>
                }
            </Snackbar>
       
        </Container>
     
        </>
    )
}
/*
     
*/
const Container = styled.div`
  background-color: antiquewhite;
  height:90.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image:url(${background});
  background-size: cover;
  background-position: center;
`;
/*
  backgroundImage: `url(${background})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
*/
const Centered = styled.div`
   width: 230px;
   height: 270px;
   background-color: white;
   position: absolute;
   margin: auto;
   border-radius: 10px;
`;

const Header = styled.div`
  padding-top: 25px;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  border-left: solid 5px #005D2D;
  color: #005D2D;
  padding-left: 10px;
`;

const InputWrap = styled.div`
  padding-top: 1em;
  padding-left: 1em;
  padding-right: 1em;
`;

const ButtonWrapper = styled.div`
  position: relative;
  padding-top: 2em;
  padding-left: 1em;
  padding-right: 1em;
`;


const ButtonLogin = styled(Button)`
  :hover{
      background-color: #EF4C4C!important;
      color: white;
  }
`;

const CircularProgressExt = styled(CircularProgress)`
    color: green;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: 5px;
    margin-left: -12px;
`;

/*


   buttonProgress: {
       color: green[500],
       position: 'absolute',
       top: '50%',
       left: '50%',
       marginTop: 5,
       marginLeft: -12,
   },
   buttonSuccess: {
       backgroundColor: green[500],
       color: "white",
       border: "none",
       '&:hover': {
           backgroundColor: green[700],
       },
   },
   icon: {
       fontSize: "16px",
       marginLeft: "-10px",
       marginRight: "5px"
   }
 //backgroundImage: url(${background}),
 //backgroundSize: 'cover',
 //backgroundPosition: 'center',
 //backgroundColor: "darkgrey",
 */