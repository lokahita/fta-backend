
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
    const [shapeFile, setShapeFile] = useState();
    const [fileName, setFileName] = useState();
    const [url, setUrl] = useState('Automatically generated from geoserver response');


    const contributor = getCookie('CONTRIBUTOR');

    const server = Config.geoserver_domain;
    const auth = Config.authorization;
    const workspace = 'fta';

    const url_upload = Config.api_domain + "/data/";
    const url_insert = Config.api_domain + "/contribution/";
    const url_reflect = Config.geoserver_domain + "wms/reflect?layers=" + workspace + ":";
    const url_featuretypes = Config.geoserver_domain + "rest/workspaces/" + workspace + "/datastores/" + fileName + "_" + contributor + "/featuretypes";
    const url_wms = Config.geoserver_domain + workspace + "/wms?service=WMS&version=1.1.0&request=GetMap&layers=" + workspace + ":";

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
        return !loading && selectedFile && selectedFile.length > 0 && name;
    }

    const postData = async () => {

        try {

            var dataFile = document.getElementById('dataFile'); //document.querySelector("#proposalFile");
            const formData = new FormData();
            formData.append('file', dataFile?.files[0]);
            formData.append("username", contributor);
            

            /*
             
                JSON.stringify({
                    "public_id": public_id,
                    "feature_name": featureName,
                    "notes": notes,
                    'is_public': idPublic === 1 ? true : false,
                    'filename': fileName
                })
            */
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
                    setSuccess(true);
                    setLoading(false);
                    setOpenBackdrop(false);
                    setOpen(true);
                    setMessage(json.message);

                    var reflect = document.getElementById('reflect');
                    reflect.innerHTML = "";
                    var p = document.createElement('p');
                    p.style.margin = '0px';
                    p.innerHTML = "successfully upload the file.. wait for WMS url from Geoserver.. ";
                    reflect.append(p);
                    console.log(shapeFile);
                    console.log(url_reflect);
                    var img = document.createElement('img');
                    var refl = url_reflect + shapeFile
                    img.src = refl.replace(".shp", "");
                    img.addEventListener('load', (event) => {
                        console.log('image has been loaded!');
                        console.log(event);
                        console.log(event.target.width);
                        console.log(event.target.height);
                        img.setAttribute("width", (event.target.width/2) + "px");
                        img.setAttribute("height", (event.target.height/2) + "px");
                        fetchGeoserver(event.target.width, event.target.height);
                    });
                    reflect.append(img);

                    //window.setTimeout(() => {
                    //    window.location.href = Config.base_domain + "/#/data"
                    //}, 2000);
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

    function onFileChange(event) {

        // Update the state
        if (event.target.files.length > 0) {
            setSelectedFile(event.target.files)


            var filesInput = event.target.files[0];
            var list = document.getElementById("list");

            JSZip.loadAsync(filesInput)                                   // 1) read the Blob
                .then(function (zip) {
                    setFileName(event.target.files[0].name.replace(".zip", ""))

                    var tabel = '<ul>';
                    var cek = false;
                    zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
                        //console.log(zipEntry.name);
                        if (zipEntry.name.includes(".shp")) {
                            if (!zipEntry.name.includes(".xml")) {
                                cek = true;
                                setShapeFile(zipEntry.name.replace(".xml", ""))
                                //fetchStore(zipEntry.name.replace(".xml", ""))
                            }

                        }
                        tabel += "<li>" + zipEntry.name + "</li>";
                        //$fileContent.append($("<li>", {
                        //    text: zipEntry.name
                        //}));
                    });
                    tabel += '</ul>';
                    if (cek) {
                        list.innerHTML = tabel;
                        //setList(tabel)
                    } else {
                        list.innerHTML = 'File not found in the given zip file';
                        setShapeFile();
                        //setList('File not found in the given zip file');
                    }
                }, function (e) {
                    console.log(e.message)
                });

        }

    }

    const fetchGeoserver = async (width, height) => {
        try {
            var myHeaders = new Headers(); //YWRtaW46Z2Vvc2VydmVy
            myHeaders.append("Authorization", auth);
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
            const response = await fetch(url_featuretypes + ".json", requestOptions)
            console.log(response)
            var json = await response.json();
            //var rsp = await response.text();
            //console.log(json);
            //console.log(json.status);

            if (response.status === 200) {

                //console.log(json);
                //console.log(json.featureTypes.featureType[0].name)
                //console.log(json.featureTypes.featureType[0].href)
                var name = json.featureTypes.featureType[0].name;
                fetch(json.featureTypes.featureType[0].href.replace("geoserver:8080","data.cifor.org"), requestOptions).then(res => res.json()).then(data => {
                    //console.log(name)
                    //console.log(data)
                    //console.log(width);
                    //console.log(height);
                    //console.log(json);
                    var srs = data.featureType.latLonBoundingBox.crs
                    var minx = data.featureType.latLonBoundingBox.minx
                    var miny = data.featureType.latLonBoundingBox.miny
                    var maxx = data.featureType.latLonBoundingBox.maxx
                    var maxy = data.featureType.latLonBoundingBox.maxy
                    var url_r = url_wms + name + "&bbox=" + minx + "," + miny + "," + maxx + "," + maxy + "&width=" + width + "&height=" + height + "&srs=" + srs + "&styles=&format=image/png"
                    setUrl(url_r)
                    saveData(url_r)
                    var reflect = document.getElementById('reflect');
                    var p = document.createElement('p');
                    p.innerHTML = "successfully fetch the geoserver.. ";
                    reflect.append(p);
                })
                //url_featuretypes
                //http://localhost/geoserver/rest/workspaces/cifor/datastores/emhayusa/featuretypes/TOPONIMI_PT_25K.json
                //shapeFile

                //fetch(url_featuretypes + "/" + shapeFile.replace(".shp", ".json"), requestOptions)
                /*
               
                */

            } else {
                setSuccess(false);
                setLoading(false);
                setOpen(true);
                setMessage(`Error ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            setSuccess(false);
            setLoading(false);
            setOpen(true);
            setMessage(`Error ${error}`);
        }

    };

    const saveData = async (url_r) => {

        try {
            // Fetch data from REST API
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    "name": name,
                    "filename": shapeFile,
                    "username": contributor,
                    "url": url_r
                })
            };

            const response = await fetch(url_insert, requestOptions)
            //console.log(response)

            var json = await response.json();
            //console.log(json);
            //console.log(json.status);

            if (response.status === 201) {
                setSelectedFile();
                setShapeFile();
                setFileName();

                console.log('sukses');
                console.log(json)
                //setGeoserverVisible(false);
                setSuccess(true);
                setLoading(false);
                setOpen(true);
                setMessage("You are successfully submit data vector");
                //window.location.href = "http://www.w3schools.com";
                //window.history.back()
                window.setTimeout(() => {
                    window.location.href = Config.base_domain + "/#/data"
                }, 2000);
            } else {
                setSuccess(false);
                setLoading(false);
                setOpen(true);
                setMessage(`Error ${response.status} ${response.statusText}`);
            }

        } catch (error) {
            setSuccess(false);
            setLoading(false);
            setOpen(true);
            setMessage(`Error ${error}`);
        }
    };


    return <Container>
        <Title>Add New Data</Title>
        <Wrapper>
            <Form>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Top>
                        <Left>
                            <Input>
                                <TextField fullWidth id="server" label="Server" color="secondary" size="small" value={server} disabled />
                            </Input>
                            <Input>
                                <TextField fullWidth id="workspace" label="Workspace" color="secondary" size="small" value={workspace} disabled />
                            </Input>
                            <Input>
                                <TextField fullWidth id="store" label="Store" color="secondary" size="small" value={contributor} disabled />
                            </Input>
                            <Input>
                                <TextField fullWidth id="name" label="Data Name" color="secondary" size="small" value={name}  onChange={e => setName(e.target.value)} />
                            </Input>
                         
                            <Input>
                                <label htmlFor="file">Upload Spasial Data (.zip)</label>
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