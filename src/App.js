import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from "./Components/login";
import Profile from "./Components/profile";
import Navbar1 from "./Components/navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./Components/firebase";

import Register from "./Components/register";
import Account from "./Components/account";

function App() {
  const [user, setuser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setuser(user);
    });
  }, []);

  //<div className="auth-inner">
  return (
    <div>
      <Navbar1/>
    <Router>
    
      <div className="App">
        
            <Routes>
              <Route
                path="/"
                element={user ? <Navigate to="/profile" /> : <Login />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/account" element={<Account/>}/>
            </Routes>
            <ToastContainer />
          </div>
       
    </Router>

    </div>
  );
}

export default App;
