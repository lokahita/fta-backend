
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import IconButton from '@mui/material/IconButton';
import Upload from '@mui/icons-material/Upload';
import { Delete, Download, Edit, Description, Preview } from '@mui/icons-material';

import { useState, useEffect } from 'react';

import DeleteDialog from "./DeleteDialog";

import Config from '../../../config.json';
import { getCookie, dateToString } from '../../../Helpers';

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
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function DataTable() {

  const token = getCookie('CONTRIBUTOR_TOKEN');
  const public_id = getCookie('CONTRIBUTOR_PUBLIC_ID');
  const contributor = getCookie('CONTRIBUTOR');

  const [list, setList] = useState(null);
  
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [dataId, setDataId] = useState();

  const url_list = Config.api_domain + "/metadata/username/" + contributor;

  const handleClickOpen = (dataId) => {
    setOpen(true);
    setDataId(dataId)
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

      fetch(url_list, requestOptions).then(res => res.json()).then(data => {
        setList(data.data);
        //console.log(data.data)
        //  if (data.status === "Expired token") {
      });

    } catch (error) {
      alert(`Error ${error}`)
    }
  }, []);

  
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

      fetch(url_list, requestOptions).then(res => res.json()).then(data => {
        //console.log(data)
        if (data)
          setList(data.data);
        //  if (data.status === "Expired token") {
      });
      setRefresh(false)

    } catch (error) {
      alert(`Error ${error}`)
    }
  }, [refresh]);
  

  function getRows() {
    if (typeof (list) !== 'undefined') {
      //var items=props.presensiDataLast.data;
      if (list !== null) {

        if (list.length > 0) {

          return list.map((row, index) => {
            //console.log(row)
            //let countries = row.user.countries;
            let dateISO = new Date(row.time_uploaded);
            //console.log(dateISO.getTimezoneOffset())

            let formatted_datetime = dateToString(dateISO);
            return (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  {index+1}
                </StyledTableCell>
              
                <StyledTableCell>{row.filename}</StyledTableCell>
                <StyledTableCell>{formatted_datetime}</StyledTableCell>
                <StyledTableCell>{row.status? 'Approved by admin': 'Waiting for approval'}</StyledTableCell>
                <StyledTableCell>
                  <IconButton aria-label="post message" component="a" href={"#/metadata/preview/" + row.id}>
                    <Preview />
                  </IconButton>
                  <IconButton aria-label="post message" component="a" href={Config.api_domain + "/metadata/download/" + row.id} >
                    <Download />
                  </IconButton>
                  <IconButton aria-label="post message" onClick={() => handleClickOpen(row.id)}>
                    <Delete />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            )
          })
        } else {
          return (
            <StyledTableRow >
              <StyledTableCell component="th" scope="row" colSpan="6">
                No data found.
              </StyledTableCell>
            </StyledTableRow>
          )
        }
      } else {
        return null
      }
    } else {
      return null
    }
  }
 
  return (
    <TableContainer component={Paper} style={{ maxHeight: 440 }} >
      <DeleteDialog open={open} setOpen={(e)=>setOpen(e)} dataId={dataId} setRefresh={(e)=>setRefresh(e)} />
      <Table stickyHeader sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Metadata File</StyledTableCell>
            <StyledTableCell>Time Uploaded</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell width="160px">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            getRows()
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}