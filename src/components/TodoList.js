import React from "react";
import styled from "styled-components";
import { onCheckHandler, onDeleteHandler, onUpdateHandler, dataRefetchControl, dataModifyControl } from "../function/todoUtils";

const TodoList = function (props) {
    const todoList=props.todoList;
    const setTodoList=props.setTodoList;
    const refetch=props.refetch;
    const setRefetch=props.setRefetch;
    const updateIdx=props.updateIdx;
    const setUpdateIdx=props.setUpdateIdx;
    
    return (
        <Box>
            {
                props.todoList?.map(function (data, i) {
                    return (
                        <li key={data.id}>
                            <input
                                name="todoCheck"
                                type="checkbox"
                                checked={data.isCompleted}
                                onChange={(e) => onCheckHandler(e, data, todoList, setTodoList)}
                            />
                            {
                                !updateIdx[i] ?
                                    <>
                                        <span>{data.todo}</span>
                                        <StyledBtn
                                            data-testid="modify-button"
                                            type="button"
                                            onClick={(e) => dataRefetchControl(e, i, true, updateIdx, setUpdateIdx, refetch, setRefetch)}
                                        >
                                            수정
                                        </StyledBtn>
                                        <StyledBtn
                                            data-testid="delete-button"
                                            type="button"
                                            onClick={(e) => onDeleteHandler(e, data, refetch, setRefetch)}
                                        >삭제</StyledBtn>
                                    </> :
                                    <>
                                        <input
                                            name="modifyInput"
                                            data-testid="modify-input"
                                            value={data.todo}
                                            onChange={(e) => { dataModifyControl(e, data, todoList, setTodoList) }}
                                        />
                                        <StyledBtn
                                            data-testid="submit-button"
                                            type="button"
                                            onClick={(e) => {
                                                onUpdateHandler(e, data);
                                                dataRefetchControl(e, i, true, updateIdx, setUpdateIdx, refetch, setRefetch);
                                            }}
                                        >
                                            제출
                                        </StyledBtn>
                                        <StyledBtn
                                            data-testid="cancel-button"
                                            type="button"
                                            onClick={(e) => {
                                                dataRefetchControl(e, i, false, updateIdx, setUpdateIdx, refetch, setRefetch);
                                            }}
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
    )
};

const Box = styled.div`
    width: 100%;
    margin-top: 20px;
`

const StyledBtn = styled.button`
    padding: 2px 10px;
    margin: 4px;
    background-color: #4e61ff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
`

export default TodoList