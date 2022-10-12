import React, { Component, useState, useEffect } from "react";
import data from "../../usaState.json";
import postActions from "../../actions/postActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
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
  const [url,setUrl]=useState("");
  useEffect(() => {
    setStateOption(optionMaker(data.data));
  }, []);

  const handleChange = (newValue, actionMeta) => {
    setClub(newValue.label);
  };
  const objectToFormData = function (obj, form, namespace) {

    let fd = form || new FormData();
    let formKey;
  
    for (let property in obj) {
      if (obj.hasOwnProperty(property)) {
  
        if (namespace) {
          formKey = namespace + '[' + property + ']';
        } else {
          formKey = property;
        }
  
        // if the property is an object, but not a File,
        // use recursivity.
        if (typeof obj[property] === 'object' && !(obj[property] instanceof Blob) && !(obj[property] instanceof File) && !(obj[property] instanceof Array)) {
          objectToFormData(obj[property], fd, property);
  
        } else if (obj[property] instanceof Array) {
          // if it's a array
          for (var i = 0; i < obj[property].length; i++) {
              // formData.append('array_php_side[]', obj[property][i]);
              fd.append(formKey + '[]', obj[property][i]);
          }
        
        } else {
          // if it's a string or a File object or blob
          fd.append(formKey, obj[property]);
        }
  
      }
    }
    return fd
  }

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
  const uploadImage = (datkka) => {
    props.setLoading(true);

    const data = new FormData()
    data.append("file", datkka)
    data.append("upload_preset", "nksvhda8")
    data.append("cloud_name","dryfxhged")
    fetch("  https://api.cloudinary.com/v1_1/dryfxhged/image/upload",{
    method:"post",
    body: data
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data,"data");
    setUrl(data.url)
    props.setLoading(false);

    })
    .catch(err => {
      console.log(err)
      toast.warning("TRY again")
      props.setLoading(false);
    })
  
    }
    
  const sendform = () => {
    
  
    if(!url){
      toast.warning("Upload Image")
      return
    }
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
      image: url,
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
  const setinfo = (value) => {
    setInformation(value)
  }
  const setinfo2 = (value) => {
    setRule(value)
  }

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
            placeholder="image"
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e)=>{
                e.preventDefault();
                uploadImage(e.target.files[0]);
              }}
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
              <ReactQuill
                class="form-control"
                name=""
                id=""
                cols="30"
                rows="4"
                placeholder="Additional Description"
                onChange={setinfo}

              />
            </div>
          </div>
          <div class="col-lg-12">
            <div>
              <ReactQuill 
                class="form-control"
                name=""
                id=""
                cols="30"
                rows="4"
                placeholder="Rule of Events"
                onChange={setinfo2}
              />
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

