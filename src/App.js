import './App.css';
import injectContext from './store/context';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Nav from './views/Nav';
import Home from './views/Home';
import Register from './views/Register'
import Login from './views/Login'
import LoginAut from './views/LoginAut'
import { useContext } from "react";
import { Context } from "./store/context"




function App() {
  const { store, actions } = useContext(Context);
  const autToken = !!store.token
  console.log(autToken)
  const user = autToken;
  return (
    <div>
      <BrowserRouter>
        <Nav user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path ="/register" element={<Register />} />
          <Route path ="/login" element = {<Login />} />
          <Route path="/loginaut" element={user ? (<LoginAut/>) : (<Navigate to = "/"/>)} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default injectContext(App);