
import { useState } from 'react';
import styled from "styled-components";
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import ImageIcon from '@mui/icons-material/Image';

import MailIcon from '@mui/icons-material/Mail';
import ForumIcon from '@mui/icons-material/Forum';
import GridViewIcon from '@mui/icons-material/GridView';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PublicIcon from '@mui/icons-material/Public';
import MapIcon from '@mui/icons-material/Map';

import { useLocation } from 'react-router-dom'
export default function LeftMenu({ menu, setMenu }) {
    const [open, setOpen] = useState(true);
    const location = useLocation();

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="h1" id="nested-list-subheader">
                    Contributor Menu
                </ListSubheader>
            }
        >
            <StyledListItemButton active={location?.pathname === "/"? "true": undefined} component="a"  href="#/" >
                <ListItemIcon>
                    <HomeIcon color={location?.pathname === "/" ? '005d2d' : ''} />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </StyledListItemButton>
          
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <GridViewIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Data" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <StyledListItemButton sx={{ pl: 4 }}  active={location?.pathname.includes("/data")? "true": undefined} component="a" href="#/data">
                        <ListItemIcon >
                            <MapIcon color={location?.pathname.includes("/data")? '005d2d' : ''} />
                        </ListItemIcon>
                        <ListItemText primary="Upload Spatial Data" />
                    </StyledListItemButton>
                    <StyledListItemButton sx={{ pl: 4 }} active={location?.pathname.includes("/metadata")? "true": undefined} component="a" href="#/metadata">
                        <ListItemIcon>
                            <CollectionsBookmarkIcon color={location?.pathname.includes("/metadata")? '005d2d' : ''} />
                        </ListItemIcon>
                        <ListItemText primary="Upload Metadata" />
                    </StyledListItemButton>
                </List>
            </Collapse>
        </List>
    )
    //primary={menu === 'home'}
}
const StyledListItemButton = styled(ListItemButton)`
    border-right: ${props => props.active ? "#005d2d solid 5px !important" : ""};
    background-color: ${props => props.active ? "#eee!important" : "transparent"};
    color: ${props => props.active ? "#005d2d!important" : ""};
`;
/*background-color: ${props => props.active ? "#ccc!important" : "transparent"};*/
/*
   <Button>Normal</Button>
            <Button primary={true}>Primary</Button>
            <TomatoButton>Tomato Button</TomatoButton>
            <Button as={ReversedButton}>Custom Button with Normal Button styles</Button>
const Button = styled.button`
  /* Adapt the colors based on primary prop /
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

const ReversedButton = props => <Button {...props} children={props.children.split('').reverse()} />
*/