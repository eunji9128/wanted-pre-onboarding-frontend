import React from "react";
import styled from "styled-components";

const Singup = () => {
    return (
        <Background>
            <Container>
                <h1>Sign-up page</h1>
                <p>Join us our service!</p>
                <form>
                    <Box margin="20px">
                        <label data-testid="email-input">email: </label>
                        <input data-testid="email-input" type="email"/>
                    </Box>
                    <Box margin="20px">
                        <label data-testid="password-input">password: </label>
                        <input data-testid="password-input" type="password"/>
                    </Box>
                    <StyledBtn type="submit">회원 가입</StyledBtn>
                </form>
            </Container>
        </Background>
    )
}

const Background = styled.div`
    width: 100vw;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(#3eb7f2, #ae4dd7);
`

const Container = styled.div`
    width: 80vw;
    height: 100%;
    margin: 5%;
    padding: 5% 0;
    background-color: #ffffff;
`

const Box = styled.div`
    margin: ${props => props.margin || "0px"};
`

const StyledBtn = styled.button`
    padding: 10px 40px;
    margin: 10px;
    background-color: #ae4dd7;
    color: #ffffff;
    border: none;
    border-radius: 5px;
`

export default Singup