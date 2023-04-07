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
    return (
        <h1>Todo page</h1>
    )
};

export default Todo;