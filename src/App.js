import { Routes, Route, redirect } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup.js'
import Signin from './pages/Signin.js';

function App() {
  let isAuth = !!localStorage.getItem("active_user");

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<h1>home</h1>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/todo" element={isAuth ? <h1>todo</h1> : <Signin />} />
      </Routes>
        {/* <Route path='/' element={<h1>home</h1>} />
        <Route path='/signup' element={<Signup />} />
        <Route 
          path='/signin'
          element={tmp ? <h1>login needed</h1> : <Signin />}
        />
        <Route path='/signin' element={<Signin />} />
        <Route path='/todo' element={<h1>Todo</h1>} /> */}
    </div>
  );
}

export default App;
