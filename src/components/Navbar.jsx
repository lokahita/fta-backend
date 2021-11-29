import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Notifications from '@mui/icons-material/Notifications';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import { useState } from 'react';
import styled from "styled-components";
import { getCookie } from '../Helpers';
import logo from '../fta-logo.png';

export default function Navbar({ auth, setOpen }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const contributor = getCookie('CONTRIBUTOR');


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
        handleClose();
    };


    return (
        <AppBarWhite position="static" elevation={1}>
            <Toolbar>
                <Wrapper>

                    <LeftMenu>
                       
                        <WrapTitle>
                            <Title>
                                Forests, Trees and Agroforestry
                            </Title>
                            <Date>
                                Livelihoods, Landscapes and Governance
                            </Date>
                        </WrapTitle>
                    </LeftMenu>
                   
                   
                        <RightMenu>
                        <Logo>
                            <img src={logo} alt="logo FTA" width="150x" />
                        </Logo>
                        {
                        auth &&
                            <>
                            <Welcome>
                                Hi, {contributor}
                            </Welcome>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle fontSize="large" />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClickOpen}>Profile</MenuItem>
                                <MenuItem onClick={handleClose} component="a" href="#/logout">Logout</MenuItem>
                            </Menu>
                            </>
                        }
                            
                        </RightMenu>
                    
                </Wrapper>
            </Toolbar>
        </AppBarWhite>
    )
}
/*
  <Link>Unstyled, boring Link</Link>
                            <StyledLink>Styled, exciting Link</StyledLink>
const Link = ({ className, children }) => (
    <a className={className}>
        {children}
    </a>
);

const StyledLink = styled(Link)`
    color: palevioletred;
    font-weight: bold;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;
 <Input defaultValue="@geelen" type="text" inputColor="rebeccapurple" />
*/
const AppBarWhite = styled(AppBar)`
  background-color: #FFFFFF !important;
  border-bottom: solid #ccded5 4px;
  
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  color: #3f7e32;
`;

const LeftMenu = styled.div`
  display: flex;
  align-items: flex-start;
`;
const Logo = styled.div`
  display: flex;
  margin-right: 20px;
`;

const WrapTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 25px;
  font-weight: 600;
  margin: 0px;
  color: #3f7e32;
  margin-block-end: -10px;
`;

const Date = styled.span`
  font-weight: 320;
  font-size: 17px;
`;

const RightMenu = styled.div`
  display: flex;
  align-items: center;

`;

const Welcome = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0px;
  padding-right: 5px;
`;

