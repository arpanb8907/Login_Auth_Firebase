
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";

function Login() {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesubmit = async(e)=>{
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth,email,password)
      const user = auth.currentUser
      console.log(user);

      toast.success("user logged in successfully",{
        position:"top-center"
      });
      window.location.href = "/profile"
      
    } catch (error) {
      toast.error(`Error: ${error.response ? error.response.data.message : error.message}`,{
        position:"bottom-center"
      });
    }
  }

  return (
    <div className="auth-wrapper">
    <div className="auth-inner">
    <form onSubmit={handlesubmit}>
      <h3>Login</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        New user <a href="/register">Register Here</a>
      </p>
      
    </form>
    </div>
    </div>
    
  );
}

export default Login;