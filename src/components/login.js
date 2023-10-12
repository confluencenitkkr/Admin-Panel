import React,{ useState, Component, useEffect} from 'react';
import { Link } from 'react-router-dom';
import "./cssfile.css";
import { useNavigate } from "react-router-dom"
import Agent from "../actions/superAgent";
import Cookies from 'universal-cookie';

function Login() {
    const history=useNavigate();
    const [userName,setName]=useState("");
    const [password,setPassword]=useState(""); 
    const cookie = new Cookies();
  
   const submit=(data)=>{
   console.log(userName,password);
    if(userName=="confluence2023"){
        if(password=="photog2023")
        cookie.set("x-access-token-ns",userName);
    }
    history("/");
   }
return(
  <>
  <section class="hello">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid" alt="Sample image" />
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          

          <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0">secy Panel</p>
          </div>

          <div class="form-outline mb-4">
            <input type="email" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter a valid email address" onChange={(e)=>{
             setName(e.target.value);
              }} />
            <label class="form-label" for="form3Example3">userName</label>
          </div>

          <div class="form-outline mb-3">
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="Enter password" onChange={(e)=>{
                setPassword(e.target.value);
              }} />
            <label class="form-label" for="form3Example4">Password</label>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <div class="form-check mb-0">
              <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label class="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            {/* <a href="#!" class="text-body">Forgot password?</a> */}
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="button" class="btn btn-primary btn-lg"
              onClick={(e)=>{
                e.preventDefault();
                submit(e);
              }}
              >Login</button>
            {/* <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                class="link-danger">Register</a></p> */}
          </div>

        </form>
      </div>
    </div>
  </div>
 
</section>
  </>
);
            }

export default Login;
