import { Routes, Route, redirect } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup.js'
import Signin from './pages/Signin.js';

function App() {
  let isAuth = !!localStorage.getItem("active_user");

  return (
    <div className="App">
      <h1>home</h1>
    </div>
  );
}

export default App;
