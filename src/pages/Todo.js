import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { redirect } from "react-router";
import { fetchData, onCreateHandler } from "../function/todoUtils";
import TodoList from "../components/TodoList";

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
    const [refetch, setRefetch] = useState(true);
    const [updateIdx, setUpdateIdx] = useState([]);

    useEffect(() => {
        fetchData(setUpdateIdx, setTodoList);
    }, [refetch]);

    return (
        <Background>
            <Container>
                <form onSubmit={(e) => onCreateHandler(e, refetch, setRefetch)}>
                    <input 
                        name="newinput"
                        data-testid="new-todo-input"
                    />
                    <StyledBtn
                        data-testid="new-todo-add-button"
                        type="submit"
                    >추가</StyledBtn>
                </form>
                <TodoList 
                    todoList={todoList}
                    setTodoList={setTodoList}
                    refetch={refetch}
                    setRefetch={setRefetch}
                    updateIdx={updateIdx}
                    setUpdateIdx={setUpdateIdx}
                />
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

export default Todo;