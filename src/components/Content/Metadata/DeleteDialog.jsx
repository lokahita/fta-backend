import { useState, useEffect } from 'react';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Close, Download } from '@mui/icons-material';

import styled from "styled-components";
import Config from '../../../config.json';

import { getCookie } from '../../../Helpers';

import DataDelete from "./DataDelete";

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


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#005d2d",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#eee" //theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export default function DeleteDialog({ open, setOpen, dataId, setRefresh }) {
   
    const handleCloseDialog = () => {
        setOpen(false);
    };



    return (
        <Dialog
            open={open}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            fullWidth={true}
            maxWidth="xs"
        >
            <DialogTitle style={{ cursor: 'move', padding: '5px 10px', backgroundColor: '#f3f3f3' }} id="draggable-dialog-title">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Delete data </span>
                    <IconButton size="small" onClick={handleCloseDialog} >
                        <Close />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent style={{ padding: '0px' }}>
                <DataDelete dataId={dataId} setOpenDialog={(e) => setOpen(e)} setRefresh={(e) => setRefresh(e)} />
            </DialogContent>
        </Dialog>
    )
}

/*
<IconButton color="success" aria-label="unduh data" component="a" href={Config.api_domain + "/download/pnunjukkws_ar_250k/12/"+random}>
                            Aceh <Download />
                      </IconButton>
                      <IconButton color="success" aria-label="unduh data" component="a" href={Config.api_domain + "/download/pnunjukkws_ar_250k/13/"+random}>
                            Sumatera Barat <Download />
                      </IconButton>
<TableContainer component={Paper}>
                    
                </TableContainer>
    */

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