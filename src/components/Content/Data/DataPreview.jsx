import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import styled from "styled-components";
import { ArrowBack } from '@mui/icons-material';

import Config from '../../../config.json';
import { getCookie, dateToString } from '../../../Helpers';

import MapDataPreview from "../../MapDataPreview";

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function DataPreview() {

    const [center, setCenter] = useState([117, 1.93]);
    const [zoom, setZoom] = useState(4);
    const [basemap, setBasemap] = useState('gray');

    const [loading, setLoading] = useState(false);

    const [idPublic, setIdPublic] = useState(0);
    const [name, setName] = useState("");
    const [timeUploaded, setTimeUploaded] = useState("");

    const [tematikName, setTematikName] = useState("");
    const [url, setUrl] = useState("");
    const [fileName, setFileName] = useState("");
    const [dataAttribute, setDataAttribute] = useState();

    const token = getCookie('CONTRIBUTOR_TOKEN');
    const public_id = getCookie('CONTRIBUTOR_PUBLIC_ID');
    let { dataId } = useParams();

    const contributor = getCookie('CONTRIBUTOR');

    const server = Config.geoserver_domain;
    const auth = Config.authorization;
    const workspace = 'fta';

    const url_get = Config.api_domain + "/contribution/id/" + dataId;




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

            fetch(url_get, requestOptions).then(res => res.json()).then(data => {
                //console.log(data)
                setUrl(data.url);
                setName(data.data_name);
                setFileName(data.filename);
                let dateISO = new Date(data.time_uploaded);
                //console.log(dateISO.getTimezoneOffset())
    
                let formatted_datetime = dateToString(dateISO);
                setTimeUploaded(formatted_datetime);
                
                var myHeaders = new Headers(); //YWRtaW46Z2Vvc2VydmVy
                myHeaders.append("Authorization", auth);
                var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                };
                let url_featuretypes = Config.geoserver_domain + "rest/workspaces/" + workspace + "/datastores/" + data.filename.replace(".shp", "") + "_" + contributor + "/featuretypes.json";
                console.log(url_featuretypes)
                
                fetch(url_featuretypes, requestOptions).then(res => res.json()).then(json => {
                    var name = json.featureTypes.featureType[0].name;
                    
                    fetch(json.featureTypes.featureType[0].href.replace("geoserver:8080","webgis.menlhk.go.id"), requestOptions).then(res => res.json()).then(data => {
                        console.log(data)
                        console.log(data.featureType.attributes.attribute)
                        setDataAttribute(data.featureType.attributes.attribute)
                    })
                });
                
            });
        } catch (error) {
            alert(`Error ${error}`)
        }
    }, []);

    function getRowsAttribute() {
        if (typeof (dataAttribute) !== 'undefined') {
            //var items=props.presensiDataLast.data;
            if (dataAttribute !== null) {

                if (dataAttribute.length > 0) {

                    return dataAttribute.map((row, index) => {
                        //console.log(row)
                        return (
                            <TableRow key={"att" + index} >
                                <TableCell></TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.length}</TableCell>
                                <TableCell></TableCell>

                            </TableRow>

                        )
                        ///cr = cr + 1
                        //return <tr><td className="p-2">{cr}</td><td className="p-2">{row.name}</td><td className="p-2">{row.sj}</td><td className="p-2">{row.kategori}</td><td className="p-2">{row.katalog}</td><td className="p-2 pointer"> <FileEarmarkText size={14} onClick={() => showMetadata(row)} className="mr-2" /> {' '} {row.viewable === 'true' ? <Eye onClick={() => showView(row)} className="mr-2" size={14} /> : ""} {' '} {row.downloadable === 'true' ? <Download size={12}  onClick={() => showDownload(row)} /> : ""}  </td></tr>
                    })
                } else {
                    return (
                        <TableRow colSpan={4}>
                            <TableCell>No attribute found</TableCell>
                        </TableRow>
                    )
                }
            } else {
                return (
                    <TableRow >
                        <TableCell colSpan={4}>No attribute found</TableCell>
                    </TableRow>
                )
            }
        } else {
            return (
                <TableRow>
                    <TableCell colSpan={4}>No attribute found</TableCell>
                </TableRow>
            )
        }
    }

    //http://localhost/geoserver/klhk/wms?service=WMS&version=1.1.0&request=GetMap&layers=klhk:ADMINISTRASIDESA_AR_25K2&bbox=110.20372127052524,-8.027838318513016,110.52130889700008,-7.767702428999936&width=646&height=768&srs=EPSG:4326&styles=&format=image/png
    return <Container>
        <Title>Preview Data</Title>
        <Wrapper>
            <Form>
                <Top>
                    <Left>
                        <MapDataPreview id="mapContainer" center={center} zoom={zoom} basemap={basemap} filename={fileName}
                        />
                        
                    </Left>
                    <Right>
                     
                        <Input>
                            <TextField size="small" fullWidth label="Data Name" color="secondary" value={name} onChange={(e) => setTematikName(e.target.value)} disabled />
                        </Input>
                        <Input>
                            <TextField size="small" fullWidth label="Filename" color="secondary" value={fileName} onChange={(e) => setFileName(e.target.value)} disabled />
                        </Input>
                        <Input>
                            <TextField size="small" fullWidth label="Time Uploaded" color="secondary" value={timeUploaded} onChange={(e) => setTimeUploaded(e.target.value)} disabled />
                        </Input>
                        <Input>
                            <TextField size="small" fullWidth label="URL Web Service" color="secondary" value={url} onChange={(e) => setUrl(e.target.value)} disabled />
                        </Input>
                      
                        <Attribute style={{ fontSize: "12px" }}>
                            <Title>Data Attribute {dataAttribute ? "(" + dataAttribute.length + ")" : ""}</Title>
                            <TableContainer style={{ maxHeight: 140, }} >
                                <Table stickyHeader size="small" aria-label="a dense table">
                                    <TableHead color="#ddd">
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Length</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            getRowsAttribute()
                                        }

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Attribute>
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
                        Back
                    </Button>
                </Bottom>
            </Form>

        </Wrapper>

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
  margin-bottom: 15px
`;

const Wrapper = styled.div`
    display: flex;
`;

const Form = styled.div`
    display: flex;
    flex-direction: column;
    flex:1;
`;
const Top = styled.div`
    display: flex;
   
`;
const Left = styled.div`
    width: 50%;
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
`;

const Attribute = styled.div`
`;
