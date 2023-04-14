import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup, { loader as signupLoader } from './pages/Signup';
import Signin, { loader as signinLoader } from './pages/Signin';
import Todo, { loader as todoLoader } from './pages/Todo';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';

const basename = process.env.PUBLIC_URL;
const root = ReactDOM.createRoot(document.getElementById('root'));
const routes = [
  {
    path: '/',
    element: <App />,
    loader: null,
  },
  {
    path: '/signup',
    element: <Signup />,
    loader: signupLoader,
  },
  {
    path: '/signin',
    element: <Signin />,
    loader: signinLoader,
  },
  {
    path: '/todo',
    element: <Todo />,
    loader: todoLoader,
  },
  {
    path: '*',
    element: <ErrorPage />,
    loader: null,
  }
];

const router = createBrowserRouter(routes, {basename: basename});

root.render(
  // <React.StrictMode>
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
