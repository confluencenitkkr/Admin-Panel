import React, { useState, Component, useEffect } from "react";
import TopDashBoradheader from "../topdashboard";

import SlidingPane from "../slider";
import { useNavigate } from "react-router-dom";
import postActions from "../../actions/postActions";
import img from "../../components/assets/img/search-icon.png";
import Accordion from "react-bootstrap/Accordion";
import img1 from "../../components/assets/img/location-icon.png";
import img2 from "../../components/assets/img/watch-icon.png";
import img3 from "../../components/assets/img/gcap-icon.png";
import img4 from "../../components/assets/img/edit-icon.png";
import img5 from "../../components/assets/img/delete-icon.png";

import img7 from "../../components/assets/img/dollar-icon.png";
import img8 from "../../components/assets/img/repost-icon.png";
import noJObs from "../../components/assets/img/no-job-artwork.png";
import FormPost from "../formjobs";
import Loader from "../loader";

import Other from "../../components/assets/industry/Other.png";
import Agent from "../../actions/superAgent";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import convertRegion from "../../usaStatesAbbrevations";

const Dashborad = (props) => {
  const [post, setPost] = useState(false);
  const [postList, setList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    let token=await Agent.getToken();
    console.log(token,"token")

    if (token!="confluence2023") {
      history("/login");
    }
  }, [])   
  useEffect(() => {
    fetchPost();
  }, [searchText]);

  const history = useNavigate();
  useEffect(() => {
    fetchPost();
  }, []);
  useEffect(() => { }, []);
  const home=()=>{
    history("/");
  }
  const fetchPost = async () => {
    await postActions.myPost(searchText, (err, res) => {
      if (err) {
      } else {
        setList(res.data);
      }
    });
  };

  const off = () => {
    setPost(false);
  };
  const setLoading1 = (e) => {
    console.log(e);
    setLoading(e);
  }
 

  const toastCall = () => {
    toast.success("New event added");
  };
  const toastCallEdit = () => {
    toast.success("event updated");
  };


  const kFormatter = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  const showPost = () => {
    setPost(true);
  };

  const setSearchTextInput = (e) => {
    setSearchText(e.target.value);
  };
  const deletePost = (job) => {
    postActions.deletePost(job._id, (err, res) => {
      if (err) {
        console.log(err, "here is error in delete");
      } else {
        fetchPost();
        toast.error("event removed");
      }
    });
  };
  const repost = (job) => {
    postActions.repost(job._id, (err, res) => {
      if (err) {
        console.log(err, "here is erro in repost");
      } else {
        fetchPost();
        toast.success("event reposted");
      }
    });
  };
  return (
    <>
      <ToastContainer />
      <section class="main-banner-wrap logged-user">
        <TopDashBoradheader showPost={showPost} setLoading={setLoading1} home={home}></TopDashBoradheader>
        
        <SlidingPane direction="right" state={post} setState={off}>
          <FormPost
            postState={post}
            setPost={setPost}
            fetchPost={fetchPost}
            toastCall={toastCall}
            setLoading={setLoading1}
          />
        </SlidingPane>
      </section>
      <section class="search-result-wrp">
        <div class="container">
          <div class="row">
            <div class="col-lg-6">
              <div class="common-head">
                <h2>
                  COLLEGE  <span>EVENTS</span>
                </h2>
              </div>
            </div>
            {postList.length < 0 && searchText.length < 0 ? (
              ""
            ) : (
                <div class="col-lg-6">
                  <div class="search-wrp">
                    <input
                      type="text"
                      placeholder="Search your event by eventname"
                      class="form-control"
                      value={searchText}
                      onChange={setSearchTextInput}
                    />
                    <img src={img} class="img img-fluid" alt="" />
                  </div>
                </div>
              )}
          </div>
          <div class="search-accordian">
            <div class="accordion" id="accordionExample">
              <div class="row">
                {postList.length > 0 ? (
                  postList.map((job, index) => {
                    // let stateAbbr = convertRegion.convertRegion(job.state, 2);
                    let randomNum = Math.floor(Math.random() * (5 - 1 + 1) + 1);
                    let industry = Other 
                    return (
                      <div class="col-lg-6">
                        <Accordion defaultActiveKey="1">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header
                              eventKey="0"
                              onClick={(e) => {
                                e.preventDefault();
                              }}
                            >
                              <div class="search-acc-header">
                                <div class="search-acc-icon">
                                  <img src={industry} alt="" />
                                  {/* <img src={randomNum === 1  ?  pink : randomNum === 2 ? green : randomNum === 3 ? blue : randomNum === 4 ?  purple : orange } alt="" /> */}
                                </div>
                                <div class="search-acc-header-content">
                                  <h3>{job.eventName}</h3>
                                  <p>{job.clubName} </p>
                                  <div>
                                    <ul>
                                      <li>
                                        <div className="search-acc-header-text">
                                          <img src={img2} alt="" />
                                          <h6>
                                            {job.date}
                                          </h6>
                                        </div>
                                      </li>
                                      <li>
                                        <div className="search-acc-header-text">
                                          <img src={img1} alt="" />
                                          <h6>
                                            {job.venue}
                                          </h6>
                                        </div>
                                      </li>
                                     
                                     
                                      <li>
                                        <div className="search-acc-header-text">
                                          <h6>coorid. Name </h6>
                                          <h6>{job.cooridnatorName}{"/"}{job.cooridnatorName2}</h6>
                                        </div>
                                      </li>
                                      
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </Accordion.Header>
                            <Accordion.Body>
                              <div class="accordion-body">
                              <p>
                              cooridnatorNumber:{" +91 "}
                                  {job.cooridnatorNumber}{"/ " }{job.cooridnatorNumber2}<br/>
                                rule:<br/>
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: job.rule,
                                  }}
                                ></p>
                                  <br/>
                                  description:<br/>
                                  <p
                                  dangerouslySetInnerHTML={{
                                    __html: job.description,
                                  }}
                                ></p>

                                 </p>
                                 
                              </div>
                              <div class="acc-contact-details">
                                <ul class="">
                             
                                  <li class="border-0">
                                    <button
                                      class="btn"
                                      type="button"
                                      onClick={() => {
                                        deletePost(job);
                                      }}
                                    >
                                      <img src={img5} alt="" />
                                      Delete
                                    </button>
                                  </li>
                             
                                </ul>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    );
                  })
                ) : (
                    <>
                      {" "}
                      <section class="search-result-wrp">
                        <div class="container">
                          {/* <div class="common-head">
                        <h2>Your Posted <span>Jobs</span></h2>
                     </div> */}
                          <div class="no-post-wrp">
                            <img src={noJObs} class="img img-fluid" alt="" />
                            <h4>No Events Found</h4>
                          </div>
                        </div>
                      </section>
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
        {loading ? <Loader></Loader> : ""}
      </section>
      
    </>
  );
};

export default Dashborad;
