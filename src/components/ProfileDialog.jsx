import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';

import styled from "styled-components";


import FormPassword from './Profile/FormPassword';
import FormInformation from './Profile/FormInformation';

function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}



function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};



export default function ProfileDialog({open, setOpen}) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
  
    const handleCloseDialog = () => {
        setOpen(false);
    };



    //onClose={handleCloseDialog}
            
    return (
        <Dialog
            open={open}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            fullWidth={true}
            maxWidth="sm"
        >
        <DialogTitle style={{ cursor: 'move', padding: '5px 10px', backgroundColor: '#f3f3f3' }} id="draggable-dialog-title">
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <span>Profile</span>
            <IconButton size="small" onClick={handleCloseDialog} >
                <Close />
            </IconButton>
        </div>
        </DialogTitle>
        <DialogContent style={{ padding: '0px' }}>
            <Paper square>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="profile"
                    variant="fullWidth"
                >
                    <Tab label="Personal Information" {...a11yProps(0)} />
                    <Tab label="Password" {...a11yProps(1)} />
                </Tabs>
            </Paper>
            <TabPanel value={value} index={0}>
                <FormInformation handleCloseDialog={handleCloseDialog} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                    <FormPassword handleCloseDialog={handleCloseDialog} />

            </TabPanel>
        </DialogContent>
    </Dialog>
    )
}



const FormInput = styled.div`
  margin:0px;
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