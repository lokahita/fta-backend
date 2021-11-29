
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';

import { useState, useEffect } from 'react';
import styled from "styled-components";
import { ArrowBack, Save } from '@mui/icons-material';

import Config from '../../../config.json';
import { getCookie } from '../../../Helpers';

import MenuItem from '@mui/material/MenuItem';
import JSZip from 'jszip';
//import FormTambah from "./FormTambah";

export default function DataAdd() {

    const [openBackdrop, setOpenBackdrop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);

    const [name, setName] = useState("");

    const [selectedFile, setSelectedFile] = useState();

    const contributor = getCookie('CONTRIBUTOR');


    const url_upload = Config.api_domain + "/metadata/";

    const token = getCookie('CONTRIBUTOR_TOKEN');
    const public_id = getCookie('CONTRIBUTOR_PUBLIC_ID');

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
        return !loading && selectedFile && selectedFile.length > 0;
    }

    const postData = async () => {

        try {

            var dataFile = document.getElementById('dataFile'); //document.querySelector("#proposalFile");
            const formData = new FormData();
            formData.append('file', dataFile?.files[0]);
            formData.append("username", contributor);
            formData.append('statusMetadata', false)
            

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': token
                },
                body: formData
            };

            const response = await fetch(url_upload, requestOptions)
            var json = await response.json();
            if (response.status === 201) {

                if (json.status === 'success') {

                    setSelectedFile();
                    setOpenBackdrop(false);
                    setSuccess(true);
                    setLoading(false);
                    setOpen(true);
                    setMessage("You are successfully submit metadata");
                    //window.location.href = "http://www.w3schools.com";
                    //window.history.back()
                    window.setTimeout(() => {
                        window.location.href = Config.base_domain + "/#/metadata"
                    }, 2000);

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

    function onFileChange(event) {

        // Update the state
        if (event.target.files.length > 0) {
            setSelectedFile(event.target.files)
        }

    }

    return <Container>
        <Title>Add New Metadata</Title>
        <Wrapper>
            <Form>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Top>
                        <Left>
                            <Input>
                                <label htmlFor="file">Upload Metadata File (.xml)</label>
                            </Input>

                            <label htmlFor="dataFile">
                                <input
                                    id="dataFile"
                                    name="btn-upload"
                                    style={{ display: 'none' }}
                                    type="file"
                                    onChange={(e) => onFileChange(e)}
                                />
                                <Button
                                    className="btn-choose"
                                    variant="outlined"
                                    component="span" size="small" >
                                    Choose Files
                                </Button>
                            </label>

                            <div className="file-name">
                                {selectedFile && selectedFile.length > 0 ? selectedFile[0].name : null}
                            </div>
                            <List id="list">

                            </List>
                        </Left>
                        <Right>
                            <div id="reflect"></div>
                        </Right>
                    </Top>

                    <Bottom >
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<ArrowBack />}
                            onClick={() => window.history.back()}
                            size="small"
                            style={{ marginRight: '1em' }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Save />}
                            type="submit"
                            disabled={!validateForm()}
                            size="small"
                        >
                            Save
                        </Button>
                    </Bottom>
                </form>
            </Form>

        </Wrapper>
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

    </Container>;
}

const Container = styled.div`
  padding: 1em;
`;

const Title = styled.h3`
  font-size: 16px;
  margin-top: 0px;
  padding: 10px;
  background-color: #dedede;
`;


const Wrapper = styled.div`
    display: "flex";
    margin-top: 15px;
`;

const Form = styled.div`
    flex: 1;
`;

const Top = styled.div`
    display: flex;
   
`;
const Left = styled.div`
    width: 40%;
`;
const Right = styled.div`
    width: 50%;
    padding: 0px 15px 15px 15px;
`;

const Input = styled.div`
    margin-bottom: 1em;
`;


const Bottom = styled.div`
    margin-top: 1em;
`;

const List = styled.div`
    margin-top: 2em;
    font-size: 12px;
`;