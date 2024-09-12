
import React, { useState } from "react";
import { auth,db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc,doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

 

  const handleRegister= async(e)=>{

    e.preventDefault();
    
    try {
      await createUserWithEmailAndPassword(auth,email,password)
      const user = auth.currentUser
      // console.log(user);
      // console.log("User registered successfully")
      
      toast.success("User registered successfully",{
        position:"top-center"
      });

      await setDoc(doc(db,"Users",user.uid),{
        EmailId : email,
        FirstName : fname,
        LastName : lname
      })
      
      
    } 
    
    catch (error) {
      
      toast.error(`Error: ${error.response ? error.response.data.message : error.message}`,{
        position:"bottom-center"
      });
    }

  }

  return (
    <form onSubmit={handleRegister}>
      <h3>Sign Up</h3>

      <div className="mb-3">
        <label>First name</label>
        <input
          type="text"
          className="form-control"
          placeholder="First name"
          onChange={(e) => setFname(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Last name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Last name"
          onChange={(e) => setLname(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </div>
      <p className="forgot-password text-right">
        Already registered <a href="/login">Login</a>
      </p>
    </form>
  );
}
export default Register;