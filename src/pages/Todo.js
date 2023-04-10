import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { redirect } from "react-router";
import API from "../api/axios";

export async function loader() {
    let isAuth = !!localStorage.getItem("active_user");
    if (!isAuth) {
        alert('로그인이 필요합니다!');
        return redirect('/signin');
    };
    return null;
};

const Todo = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const access_token = JSON.parse(localStorage.getItem("active_user")).jwt;
                const res = await API.get('/todos', {
                    headers: {"Authorization": `Bearer ${access_token}`},
                });
                setTodoList(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    
    const onCreateHandler = async function(e) {
        const access_token = JSON.parse(localStorage.getItem("active_user")).jwt;
        try {
            const res = await API.post("/todos",
                {
                    todo: e.target.newinput.value,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                    },
                }
            );
            console.log(res);
        } catch (err) {
            console.error(err);
        }
    };

    console.log('todo: ', todoList);

    return (
        <Background>
            <Container>
                <form onSubmit={onCreateHandler}>
                    <input 
                        name="newinput"
                        data-testid="new-todo-input"
                    />
                    <StyledBtn
                        data-testid="new-todo-add-button"
                        type="submit"
                    >추가</StyledBtn>
                </form>
                <Box>
                    {
                        todoList?.map(function (data, i) {
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