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
    const [refetch, setRefetch] = useState(true);
    const [updateIdx, setupdateIdx] = useState([]);
    const access_token = JSON.parse(localStorage.getItem("active_user")).jwt;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const access_token = JSON.parse(localStorage.getItem("active_user")).jwt;
                const res = await API.get('/todos', {
                    headers: {"Authorization": `Bearer ${access_token}`},
                });
                console.log('get: ', res.data);
                setupdateIdx(new Array(res.data.length).fill(false));
                setTodoList(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);
    
    const onCreateHandler = async function(e) {
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
            console.log('create: ', res);
        } catch (err) {
            console.error(err);
        }
    };

    const onCheckHandler = async function(e, data) {
        e.preventDefault();
        const isCompleted = e.target.checked;
        console.log('todocheck: ', isCompleted);
        try {
            const res = await API.put(`/todos/${data.id}`, 
                {
                    todo: data.todo,
                    isCompleted: isCompleted,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                    }
                }
            );
            console.log('update: ', res);
            setTodoList(todoList.map(todo => {
                if (todo.id === data.id) {
                  return {
                    ...todo,
                    isCompleted: isCompleted
                  }
                }
                return todo;
            }));
        } catch (err) {
            console.error(err);
        }
    }

    const onDeleteHandler = async function(e, data) {
        e.preventDefault();
        try {
            const res = await API.delete(`/todos/${data.id}`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`,
                }
            })
            setRefetch(!refetch);
            console.log(todoList);
            console.log('delete', res);
        } catch (err) {
            console.error(err);
        }
    }

    const updateChange = function (e, i) {
        e.preventDefault();
        let copy = [...updateIdx];
        copy[i] = !copy[i];
        setupdateIdx(copy);
    }

    const InputDataHandler = function (e, data) {
        e.preventDefault();
        setTodoList(todoList.map(todo => {
            if(todo.id === data.id) {
                return {
                    ...todo,
                    todo: e.target.value
                }
            }
            return todo;
        }));
    }

    const onUpdateHandler = async function (e, data) {
        e.preventDefault();
        try {
            const res = await API.put(`/todos/${data.id}`, 
                {
                    todo: data.todo,
                    isCompleted: data.isCompleted,
                },
                {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                    }
                }
            )
        } catch (err) {
            console.error(err);
        }
    }

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
                                    <input 
                                        name="todoCheck" 
                                        type="checkbox" 
                                        checked={data.isCompleted} 
                                        onChange={(e) => onCheckHandler(e, data)}
                                    />
                                    {
                                        !updateIdx[i] ?
                                            <>
                                                <span>{data.todo}</span>
                                                <StyledBtn 
                                                    data-testid="modify-button"
                                                    type="button"
                                                    onClick={(e) => updateChange(e, i)}
                                                >
                                                    수정
                                                </StyledBtn>
                                                <StyledBtn 
                                                    data-testid="delete-button"
                                                    type="button"
                                                    onClick={(e) => onDeleteHandler(e, data)}
                                                >삭제</StyledBtn>
                                            </> :
                                            <>  
                                                <input 
                                                    name="modifyInput"
                                                    data-testid="modify-input"
                                                    value={data.todo}
                                                    onChange={(e)=>{InputDataHandler(e, data)}}
                                                />
                                                <StyledBtn
                                                    data-testid="submit-button"
                                                    type="button"
                                                    onClick={(e) => {
                                                        onUpdateHandler(e, data);
                                                        updateChange(e, i);
                                                    }}
                                                >
                                                    제출
                                                </StyledBtn>
                                                <StyledBtn
                                                    data-testid="cancel-button"
                                                    type="button"
                                                >
                                                    취소
                                                </StyledBtn>
                                            </>
                                    }
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