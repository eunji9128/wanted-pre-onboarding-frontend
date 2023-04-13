import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";

const Main = function () {
    const navigate = useNavigate();

    return (
        <Container>
            <Box 
                color="#3eb7f2"
                onClick={() => {navigate('/signup')}}
            >
                <h1>Sign-up</h1>
                <p>Please join our service!</p>
            </Box>
            <Box 
                color="#ae4dd7"
                onClick={() => {navigate('/signin')}}
            >
                <h1>Sign-in</h1>
                <p>Do you already have the account? Login here!</p>
            </Box>
        </Container>
    )
};

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('/main-background.jpg');
    background-size: cover;
    background-repeat: no-repeat;
`

const Box = styled.div`
    width: 20vw;
    height: 60vh;
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column; 
    border-radius: 10px;
    background: ${props => props.color || '#ffffff'};
    opacity: 0.5;
    color: #ffffff;
`

export default Main