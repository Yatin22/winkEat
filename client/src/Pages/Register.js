import React, {useState} from "react";
import "../../src/styles/Register.css";
import { Link , useNavigate} from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Register = () => {
  const style = {
   backgroundColor:"#2794F7",
   color:"black",
   cursor:"pointer"
  };
  const navigate=useNavigate();

  const[user,setUser]=useState({name:"",password:"",cpassword:"",mobileNo:"",username:""});


  let name,value
  const handleInput=(e)=>{
    name=e.target.name;
    value=e.target.value;
    setUser({...user,[name]:value})
  }

  const postData=async (e)=>{
    e.preventDefault(); //isse voh automatic reload nhi hoga
    const{name,password,cpassword,mobileNo,username}=user;
    const res=await fetch("/api/user/signup",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,password,cpassword,mobileNo,username
      })
    });
    const data=await res.json();
    if(res.status===422||!data){
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    }else{
      window.alert("Registration Successful");
      console.log("Registration Successful");
      navigate('/login');
    }
  }

  return (
    <>
      <div className="content-box-register">
        <div className="logo-box-register">
          <img
            className="form-img-register"
            src="/images/mini-img3.png"
            alt="not available"
          />
        </div>
        <div className="form-box-register">
          <div className="form-nav-register">
            <div className="arrow-icon">
              <Link to="/">
                <ArrowBackIcon className="arrow" />
              </Link>
            </div>
            <div>
              <img
                className="winkeat-logo-form-register"
                src="/images/winkeat-logo2.png"
                alt="not available"
              />
            </div>
          </div>

          <form method="POST">
            <div className="input-form-register">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                autoComplete="off"
                value={user.name}
                onChange={handleInput}
              />
            </div>
            <div className="input-form-register">
              <input
                type="text"
                name="username"
                id="email"
                placeholder="UserName"
                autoComplete="off"
                value={user.username}
                onChange={handleInput}
              />
            </div>
            <div className="input-form-register">
              <input
                type="text"
                name="mobileNo"
                id="mobileNo"
                placeholder="Mobile Number"
                autoComplete="off"
                value={user.mobileNo}
                onChange={handleInput}
              />
            </div>
            <div className="input-form-register">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <div className="input-form-register">
              <input
                type="password"
                name="cpassword"
                id="repassword"
                placeholder="Re-enter Password"
                autoComplete="off"
                value={user.cpassword}
                onChange={handleInput}
              />
            </div>
            
            <button className="submit-btn-register" onClick={postData} style={style}>
              Sign Up
            </button>
          </form>

          <div className="form-footer-register">
              Already have an account?<Link to="/login">Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
