import React, { useState } from "react";
import styled from "styled-components";
import API from "../api/axios.js"
import { redirect, useNavigate } from "react-router-dom";

// test account
// email: test@email1234
// pwd: test1234

export async function loader() {
    let isAuth = !!localStorage.getItem("active_user");
    if (isAuth) return redirect('/todo');
    return null;
}

const Signin = () => {
    let [emailState, setEmailState] = useState(false);
    let [pwdState, setPwdState] = useState(false);
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const navigate = useNavigate();

    const onEmailHandler = function (string) {
        setEmailState(/@/.test(string));
        setEmail(string);
    }

    const onPasswordHandler = function (string) {
        setPassword(string);
        if (string.length > 7) {
            setPwdState(true);
        } else {
            setPwdState(false);
        };
    }

    const onLoginHandler = async function (e) {
        e.preventDefault();

        let body = {
            email: email,
            password: password,
        }
        try {
            const res = await API.post('/auth/signin', body);
            let loginData = {
                ...body,
                jwt: res.data.access_token,
            }

            localStorage.setItem('active_user', JSON.stringify(loginData))
            alert('로그인이 완료 되었습니다!');
            navigate('/todo');
        } catch(error) {
            console.error(error.response);
        }
    }

    return (
        <Background>
            <Container>
                <h1>Sign-in page</h1>
                <p>If you alreay sign-up, please login!</p>
                <form>
                    <Box margin="20px">
                        <label data-testid="email-input">email: </label>
                        <input 
                            data-testid="email-input" 
                            type="email"
                            onChange={(e) => { onEmailHandler(e.target.value) }}
                        />
                        { emailState ? " OK" : " NOK" }
                    </Box>
                    <Box margin="20px">
                        <label data-testid="password-input">password: </label>
                        <input
                            data-testid="password-input" 
                            type="password"
                            onChange={(e) => { onPasswordHandler(e.target.value) }}
                        />
                        { pwdState ? " OK" : " NOK" }
                    </Box>
                    <StyledBtn 
                        type="submit" 
                        data-testid="signin-button"
                        disabled={!(emailState && pwdState)}
                        onClick={onLoginHandler}    
                    >로그인</StyledBtn>
                </form>
            </Container>
        </Background>
    )
};

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
    text-align: center;
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

    &:disabled {
        background-color: #868686;
    }
`

export default Signin