import React from "react";
import styled from "styled-components";

const ErrorPage = function() {
    return (
        <Container>
            <Title>Oops!</Title>
            <h3>Something went wrong. We're sorry.</h3>   
            <p>if you want to go home, please <a href="/">click here</a>.</p>         
        </Container>
    )
};

const Container = styled.div`
    width: 100vw;
    height: 100%;
    text-align: center;
    padding: 40px;
`

const Title = styled.h1`
    color: #ae4dd7;
`

export default ErrorPage