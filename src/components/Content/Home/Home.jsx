import styled from "styled-components";
import ilustrasi from './illustration.jpg';

export default function Home() {
    return (
      <Container>
        <img src={ilustrasi} alt="illustration" style={{ width: "50vw"}} />
        <br />
        <h3>We are ready to contribute!</h3>
    </Container>
    )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

const TopContent = styled.div`
  height: 60%;
  display: flex;
  margin-bottom: 10px;
`;

const LeftContent = styled.div`
  width:30%;
  display: flex;
  flex-direction: column;
  padding-right: 10px;
`;

const Members = styled.div`
  flex-grow: 1;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 5px;
`;
const Gallery = styled.div`
  flex-grow: 1;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 5px;
  
`;
const Links = styled.div`
  flex-grow: 1;
  border: 1px solid #ddd;
  padding: 5px;
  
`;

const RightContent = styled.div`
  width:70%;
  display: flex;
  flex-direction: column;
`;

const Events = styled.div`
  flex-grow: 1;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 5px;
`;

const Publications = styled.div`
  flex-grow: 1;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 5px;
`;

const LastContent = styled.div`
  flex-grow: 1;
  display: flex;
`;
const Forums = styled.div`
  width: 40%;
  border: 1px solid #ddd;
  margin-right: 10px;
  padding: 5px;
`;
const Messages = styled.div`
  width: 60%;
  border: 1px solid #ddd;
  padding: 5px;
`;


const BottomContent = styled.div`
  height: 60%;
  padding: 10px;
  border: 1px solid #ddd;
`;

const DatabaseTitle = styled.p`
  font-size: 16px;
  margin-top: 0px;
`;