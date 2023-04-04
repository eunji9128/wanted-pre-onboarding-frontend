import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup.js'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<h1>home</h1>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<h1>Sign-in</h1>} />
        <Route path='/todo' element={<h1>Todo</h1>} />
      </Routes>
    </div>
  );
}

export default App;
