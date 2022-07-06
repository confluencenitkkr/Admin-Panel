import React, { Component, useState, useEffect } from "react";
import data from "../../usaState.json";
import postActions from "../../actions/postActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
const FormPost = (props) => {
  const [image, setImage] = useState("");
  const [venue, setVenue] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessName2, setBusinessName2] = useState("");
  const [date, setDate] = useState("");
  const [information, setInformation] = useState("");
  const [number, setNumber] = useState("");
  const [number2, setNumber2] = useState("");
  const [club, setClub] = useState("");
  const [stateOption, setStateOption] = useState([]);
  const [EventName,setEventName]=useState("");
  const [rule, setRule] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    setStateOption(optionMaker(data.data));
  }, []);

  const handleChange = (newValue, actionMeta) => {
    setClub(newValue.label);
  };
 

  const optionMaker = (arr) => {
    let data = [];
    arr.map((e) => {
      data.push({
        value: e,
        label: e,
      });
    });
    return data;
  };

  const sendform = () => {
    
  
    if(!venue){
       toast.warning("ENTER venue")
       return
    }
    if(!businessName){
       toast.warning("ENTER corr NAME")
       return
    }
    if(!date){
       toast.warning("ENTER date")
       return
    }
    if(!club){
       toast.warning("ENTER club TYPE")
       return
    }
    if(!number){
      toast.warning("ENTER NUMBER")
      return
    }

    if (
      !venue &&
      !businessName &&
      !date &&
      !EventName &&
      !club &&
      !number
    ) {
      
      return false;
    }
    props.setLoading(true);
    let dataToSend = {
      eventName:EventName,
      cooridnatorName: businessName,
      cooridnatorNumber: number,
      cooridnatorName2 : businessName2 ? businessName2:"",
      cooridnatorNumber2: number2? number2 :"",
      image: image,
      venue: venue,
      description: information,
      date: date,
      clubName: club,
      rule:rule,
      time:time
    };

    postActions.addPost(dataToSend, (err, res) => {
      if (err) {
        toast("pls try again")
        props.setLoading(false);
        console.log(err, "here is erro form send");
      } else {
        props.setLoading(false);
        props.setPost(false);
        props.fetchPost();
        props.toastCall();
      }
    });
  };

  return (
    <div class="post-job-content">
            
      <h3>
        Post a <span>Events</span>
      </h3>
      <div class="mb-3">
      {/* <h4>Title</h4> */}

      <div class="row">
        <div class="col-lg-12">
            <div class="">
              <input
                type="text"
                class="form-control"
                placeholder="Event Name"
                onChange={(e) => {
                  setEventName(e.target.value);
                }}
                required
              />
              {/* <span style={{"color":"red"}}>*</span> */}
            </div>
          </div>
          </div>
      </div>
      <div class="mb-3">
        <h4>Event Details</h4>
        <div class="row">
        <div class="col-lg-6">
            <div class="">
              {stateOption.length > 0 ? (
                <Select
                  placeholder="Club Name"
                  isClearable
                  onChange={handleChange}
                  classNamePrefix="my-className-prefix"
                  options={stateOption}
                />
              ) : (
                <Select
                  placeholder="cat"
                  isClearable
                  onChange={handleChange}
                  classNamePrefix="my-className-prefix"
                  options={[]}
                />
              )}
            </div>
          </div>
          
          
          <div class="col-lg-6">
            <div class="">
              <input
                type="venue"
                class="form-control"
                placeholder="venue*"
                onChange={(e) => {
                  setVenue(e.target.value);
                }}
              />
            </div>
            
          </div>
          <div class="col-lg-12">
            <div class="">
              <input
                type="text"
                class="form-control"
                placeholder="image URl "
                onChange={(e) => {
                  setImage(e.target.value);
                }}
                required
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <h4>cooridnator Details</h4>
        <div class="row">
          <div class="col-lg-6">
            <div class="">
              <input
                type="text"
                class="form-control"
                placeholder="cooridnator Name"
                
                onChange={(e) => {
                  setBusinessName(e.target.value);
                }}
              />
            </div>
          </div>
         
          <div class="col-lg-6">
            <div class="">
              <input
                type="text"
                class="form-control"
                placeholder="cooridnator phoneno"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                maxlength="10"
                onChange={(e) => {
                  setNumber(e.target.value);
                }}
              />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="">
              <input
                type="text"
                class="form-control"
                placeholder="cooridnator Name"
                
                onChange={(e) => {
                  setBusinessName2(e.target.value);
                }}
              />
            </div>
          </div>
         
          <div class="col-lg-6">
            <div class="">
              <input
                type="text"
                class="form-control"
                placeholder="cooridnator phoneno"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                maxlength="10"
                onChange={(e) => {
                  setNumber2(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="mb-3">
        <h4>Additional Info</h4>
        <div class="row">
          <div class="col-lg-6">
            <div class="">
            <input
                type="date"
                class="form-control"
                placeholder="Start date "
                onChange={(e) => {
                  setDate(e.target.value);
                  
                }}
              />
      
            </div>
          </div>
          <div class="col-lg-6">
            <div class="">
            <input
                type="text"
                class="form-control"
                placeholder="Time i.e 5:30 PM "
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              />
      
            </div>
          </div>
     
        
          <div class="col-lg-12">
            <div>
              <textarea
                class="form-control"
                name=""
                id=""
                cols="30"
                rows="4"
                placeholder="Additional Information"
                onChange={(e) => {
                  setInformation(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div class="col-lg-12">
            <div>
              <textarea
                class="form-control"
                name=""
                id=""
                cols="30"
                rows="4"
                placeholder="Rule of Events"
                onChange={(e) => {
                  setRule(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div class="col-lg-12">
            <button
              class="btn post-main-btn"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                sendform();
              }}
            >
              Post Event
            </button>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPost;

