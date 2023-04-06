import React from "react";
import { redirect, Route, Routes } from "react-router-dom";
import Signup from "../pages/Signup.js";
import Signin from "../pages/Signin.js";

const BaseRoutes = () => {
    let isAuth = !!localStorage.getItem("active_user");
    
    return (
        <>
            {isAuth ? redirect("/todo") : redirect("/signin")}
            <Routes>
                <Route path="/" element={<h1>home</h1>}>
                    <Route path="signup" element={<Signup />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="todo" element={<h1>todo</h1>} />
                </Route>
            </Routes>
        </>
    )
};

export default BaseRoutes