import { useEffect, useState } from 'react';
import { getCookie } from './Helpers';
import Config from './config.json';
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Grid from '@mui/material/Grid';
import styled from "styled-components";

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import LeftMenu from './components/LeftMenu';

import ProfileDialog from './components/ProfileDialog';
import Login from './components/Login';

import MenuRouting from './MenuRouting';

function App() {
  const [auth, setAuth] = useState(false);

  const token = getCookie('CONTRIBUTOR_TOKEN');
  const [tokenValid, setTokenValid] = useState(false);

  const url_valid = Config.api_domain + "/auth/validUser";
  const [open, setOpen] = useState(false);


  useEffect(() => {

    const postData = async () => {

      try {
        // Fetch data from REST API

        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        };
        const response = await fetch(url_valid, requestOptions)

        var json = await response.json();

        if (response.status === 200) {

          if (json.status === 'success') {
            setTokenValid(true)
            setAuth(true)
          } else {
            setTokenValid(false)
          }
        } else {
          setTokenValid(false)
        }

      } catch (error) {
        alert(`Error ${error}`)
      }

    };
    postData();
  }, [token, tokenValid, url_valid]);

  if (!tokenValid) return (
    <div>
      <p style={{ position: 'absolute', bottom: '10px', opacity: 0.7, right: '10px', background: '#fff', padding: '5px', fontSize: '12px' }}>
        Photo by <a href="https://unsplash.com/@imatbagjagumilar?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Imat Bagja Gumilar</a> on <a href="https://unsplash.com/s/photos/forest?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
      </p>
      <Navbar />
      <Login />

    </div>
  );


  return (
    <Router>
      <Container>
        <Navbar sx={{ height: '8vh' }} auth={auth} setOpen={(e) => setOpen(e)} />
        <ProfileDialog open={open} setOpen={(e) => setOpen(e)} />
        <Grid container sx={{ height: '83.5vh' }}>
          <Grid item sm={2} xs={2} sx={{ borderRight: '1px solid #eee', marginTop: '5px' }}>
            <LeftMenu />
          </Grid>
          <Grid item sm={10} xs={10} sx={{ padding: '10px', maxHeight: '84vh', overflowY: 'auto' }} >
            <MenuRouting />
          </Grid>
        </Grid>
        <Footer sx={{ height: '5vh' }} />
      </Container>
    </Router>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;


export default App;
