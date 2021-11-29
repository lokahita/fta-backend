

import styled from "styled-components";

export default function Footer() {
    return (
        <Container>
            <Copyright>Copyright &copy; CIFOR - 2021. All rights reserved.</Copyright>
        </Container>
    )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: #eee;
  width: 100%;
`;

const Copyright = styled.p`
  font-size: 12px;
  font-weight: 600;
  margin: 15px;
`;