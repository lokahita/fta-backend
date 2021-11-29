

import styled from "styled-components";

import { AddCircle } from "@mui/icons-material";
import Button from "@mui/material/Button";
import DataTable from "./DataTable";

export default function Data() {
  return (
    <Container>
      <Title>List Of Metadata</Title>
      <ButtonWrapper>
        <Button variant="contained" startIcon={<AddCircle />} component="a" href="#/metadata/add">
         Add New Metadata
        </Button>
      </ButtonWrapper>
      <DataTable />
    </Container>
  )
}

const Container = styled.div`
  padding: 1em;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  margin-top:20px;
`;
const Title = styled.h3`
  font-size: 16px;
  margin-top: 0px;
  padding: 10px;
  background-color: #dedede;
`;