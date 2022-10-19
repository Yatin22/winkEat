import React, { useState } from "react";
import "../../src/styles/Login.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";

const Login = () => {
  const style = {
    backgroundColor:"#2794F7",
    color:"black",
    cursor:"pointer"
   };
  const [user,setUser] = useState({
    mobileNo:"",password:""
  });
  let name,value;
  const handleInput=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value});
  }
  const postData=async (e)=>{
    e.preventDefault();
    const {mobileNo,password}=user;
    const res=await fetch("/api/user/signin",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        mobileNo , password
      })
    });
    const data=await res.json();
   if(!data){
    window.alert("nhi hoga login")
   }
    else if(res.status===400){
      window.alert("Invalid Login");
    
    }
    else if(res.status===401){
      window.alert("Invalid Credential")
    }
    else if(res.status===201){
      window.alert("Login failed");
    }
    else{
      window.alert("Login Successful");
      // navigate('/');
    }
  }
  return (
    <>
    <div className="login-body">
      <div className="content-box-login">
        <div className="logo-box">
          <img
            className="form-img-login"
            src="/images/mini-img3.png"
            alt="not available"
          />
        </div>
        <div className="form-box-login">
          <div className="form-nav">
            <div className="arrow-icon">
            <Link to="/">
              <ArrowBackIcon className="arrow" />
            </Link>
            </div>
            <div>
            <img
              className="winkeat-logo-form"
              src="/images/winkeat-logo2.png"
              alt="not available"
            />

            </div>
          </div>

          <form action="" method='POST'>
            <div className="input-form-login">
              <input
                type="text"
                name="mobileNo"
                id="roll"
                placeholder="Mobile Number"
                autoComplete="off"
                value={user.mobileNo}
                onChange={handleInput}
              />
            </div>
            <div className="input-form-login">
              <input 
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <button className="submit-btn-login" style={style} onClick={postData}>Sign In</button>
          </form>

          <div className="form-footer">
          <div className="footer-top">
            <span>Are You a <Link>Vendor</Link> ?</span><br/>
            <span><Link>Forgot Your Password?</Link></span><br/>
            <span><Link>Contact Us</Link></span>
          </div>
          <div className="footer-bottom">
            Didn't have an account?<Link to="/register">Sign Up</Link>
          </div>

          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Login;
