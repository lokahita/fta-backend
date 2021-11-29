import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import styled from "styled-components";
import { ArrowBack } from '@mui/icons-material';

import Config from '../../../config.json';
import { getCookie, dateToString } from '../../../Helpers';

import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export default function DataPreview() {


    const [loading, setLoading] = useState(false);

    const [idPublic, setIdPublic] = useState(0);
    const [name, setName] = useState("");
    const [timeUploaded, setTimeUploaded] = useState("");

    const [url, setUrl] = useState("");
    const [fileName, setFileName] = useState("");
    const [xml, setXml] = useState();
    const [status, setStatus] = useState();

    const token = getCookie('CONTRIBUTOR_TOKEN');
    const public_id = getCookie('CONTRIBUTOR_PUBLIC_ID');
    let { dataId } = useParams();

    const contributor = getCookie('CONTRIBUTOR');

    const url_get = Config.api_domain + "/metadata/id/" + dataId;
    const url_view = Config.api_domain + "/metadata/view/" + dataId;

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

                setStatus(data.status? 'Approved by admin': 'Waiting for approval');


            });

            const xmlOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'text/xml',
                    'Authorization': token
                }
            };
            fetch(url_view, xmlOptions)
                //.then(res => res).then(data => {
                .then(response => response.text())
                .then(str => 
                    //new window.DOMParser().parseFromString(str, "text/xml"))
                    {
                        setXml(str);
                    });
                //.then(data => {
                //    console.log(data)
                //    setXml(data);
                //});
        } catch (error) {
            alert(`Error ${error}`)
        }
    }, []);

    return <Container>
        <Title>Preview Metadata</Title>
        <Wrapper>
            <Form>
                <Top>
                    <Left>
                        <Input>
                            <TextField size="small" fullWidth label="Metadata File" color="secondary" value={fileName} onChange={(e) => setFileName(e.target.value)} disabled />
                        </Input>
                        <Input>
                            <TextField size="small" fullWidth label="Time Uploaded" color="secondary" value={timeUploaded} onChange={(e) => setTimeUploaded(e.target.value)} disabled />
                        </Input>
                        <Input>
                            <TextField size="small" fullWidth InputLabelProps={{ shrink: true }} label="Status" color="secondary" value={status} onChange={(e) => setStatus(e.target.value)} disabled />
                        </Input>
                        <Input>
                            <TextField size="small" fullWidth label="Metadata Content" color="secondary"
                                InputLabelProps={{ shrink: true }}
                                multiline
                                rows={10}
                                value={xml} onChange={(e) => setXml(e.target.value)} disabled />
                        </Input>
                    </Left>
                    <Right>
                        
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
