import React, { useState, Component } from "react";
import headerImg from "../../components/assets/img/conflu.png";
import Agent from "../../actions/superAgent";
import {signOut} from "firebase/auth";
import { auth } from "../../firebase";
const TopDashBoradheader = (props) => {
  const showPost = () => {
    props.showPost();
  };
  const logOut=(e)=>{
    e.preventDefault();
    Agent.removeSession();
     signOut(auth);
     props.home();
  }
  const home=()=>{
    props.home();
  }

  return (
    <header>
      <nav class="navbar">
        <div class="container">
          <a href="/" class="navbar-brand">
            <img src={headerImg} class="img img-fluid" alt="" />
          </a>
          <div class="nav-buttons">
      
            <button
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasPostjob"
              class="btn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                showPost();
              }}
            >
              <i class="fas fa-briefcase"></i> Post a Event
              

            </button>
          
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TopDashBoradheader;