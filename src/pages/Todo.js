import React from "react";
import styled from "styled-components";
import { redirect } from "react-router";

export async function loader() {
    let isAuth = !!localStorage.getItem("active_user");
    if (!isAuth) {
        alert('로그인이 필요합니다!');
        return redirect('/signin');
    };
    return null;
};

const Todo = () => {
    let list = [
        {
            "id": 1,
            "todo": "과제하기",
            "isCompleted": false,
            "userId": 1,
        },
        {
            "id": 2,
            "todo": "운동하기",
            "isCompleted": false,
            "userId": 1,
        },        
    ];

    return (
        <Background>
            <Container>
                <input data-testid="new-todo-input" />
                <StyledBtn data-testid="new-todo-add-button">추가</StyledBtn>
                <Box>
                    {
                        list.map(function (data, i) {
                            return (
                                <li key={data.id}>
                                    <label style={{marginRight: "10px"}}>
                                        <input type="checkbox" />
                                        <span>{data.todo}</span>
                                    </label>
                                    <StyledBtn data-testid="modify-button">수정</StyledBtn>
                                    <StyledBtn data-testid="delete-button">삭제</StyledBtn>
                                </li>        
                            )
                        })
                    }
                </Box>
            </Container>
        </Background>
    )
};

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(#3eb7f2, #ae4dd7);
`

const Container = styled.div`
    width: 100vw;
    height: 60vh;
    padding: 5%;
    background-color: #ffffff;
    text-align: start;
`

const StyledBtn = styled.button`
    padding: 2px 10px;
    margin: 4px;
    background-color: #4e61ff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
`

const Box = styled.div`
    width: 100%;
    margin-top: 20px;
`

export default Todo;