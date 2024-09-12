
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from './Components/login';
import Profile from './Components/profile';


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './Components/firebase';

import Register from './Components/register';

function App() {
  const[user,setuser] = useState()

  useEffect(()=>{
    auth.onAuthStateChanged(async(user)=>{
      setuser(user)
    })
    
  },[])
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
          <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/profile" /> : <Login />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <ToastContainer/>
            
          </div>
        </div>
      </div>
    </Router>
   
  );
}

export default App;
