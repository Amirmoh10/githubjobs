import React, { useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import StateContext from "./stateContext";
import DispatchContext from "./dispatchContext";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PublicIcon from "@material-ui/icons/Public";
import { iconStyle } from "./iconStyle";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

import "./App.css";

const initialState = {
  typedJobName: "",
  jobName: "",
  typedLocation: "",
  jobLocation: "",
  jobs: [],
  selectedJob: [],
  // fullTime: false,
};

const ACTION = {
  JOBTITLE_SEARCH: "JOBTITLE_SEARCH",
  CLICK_SEARCH: "CLICK_SEARCH",
  LOCATION_SEARCH: "LOCATION_SEARCH",
  SUBMIT_SEARCH: "SUBMIT_SEARCH",
  CHECK_LOCATION: "CHECK_LOCATION",
  FETCH_DATA: "FETCH_DATA",
  SELECT_JOB: "SELECT_JOB",

  // FETCH_DATA_SUCCESS: "FETCH_DATA_SUCCESS",
  // FETCH_DATA_FAIL: "FETCH_DATA_FAIL",
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.JOBTITLE_SEARCH:
      return {
        ...state,
        typedJobName: action.value,
      };

    case ACTION.CLICK_SEARCH:
      return {
        ...state,
        jobName: state.typedJobName,
      };

    case ACTION.LOCATION_SEARCH:
      return {
        ...state,
        typedLocation: action.value,
      };

    case ACTION.SUBMIT_SEARCH:
      return {
        ...state,
        jobLocation: state.typedLocation,
      };
    case ACTION.CHECK_LOCATION:
      return {
        ...state,
        jobLocation: action.value,
      };

    // case ACTION.FETCH_DATA:
    //   return {
    //     ...state,

    //   };

    case ACTION.FETCH_DATA_SUCCESS:
      return {
        ...state,
        jobs: action.value,
      };

    case ACTION.SELECT_JOB: {
      return {
        ...state,
        selectedJob: action.value,
      };
    }

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state.jobLocation);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${state.jobName}&location=${state.typedLocation}`
        );

        dispatch({
          type: ACTION.FETCH_DATA_SUCCESS,
          value: result.data,
        });
      } catch (error) {
        console.log("erro fetching");
      }
    };
    fetchData();

    return () => {
      // clean up
    };
  }, [state.jobName, state.typedLocation]);
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/job">
                <JobDescription />
              </Route>
            </Switch>
          </Router>
        </div>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;

function Header() {
  const headerDispatch = useContext(DispatchContext);
  function onChange(event) {
    headerDispatch({
      type: ACTION.JOBTITLE_SEARCH,
      value: event.target.value,
    });
  }

  function onClick() {
    
    headerDispatch({
      type: ACTION.CLICK_SEARCH,
    });
  }
  return (
    <div>
      <Title />
      <div className="searchForm">
        <input
          className="searchInput"
          type="text"
          placeholder="Title, companies, expertise ..."
          onChange={onChange}
        />
        <button className="searchBtn" onClick={onClick}>
          Search
        </button>
      </div>
    </div>
  );
}

export const Title = () => {
  return (
    <div className="titleBox">
      <span className="boldTitle">Github </span>
      <span className="normalTitle">Jobs </span>
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    width: "18px",
    height: "18px",
    border: "1px solid #B9BDCF",
    borderRadius: "2px",
    position: "relative",
    right: "10px",
  },
  checkedIcon: {
    "&:before": {
      display: "block",
      background: "#1E86FF",
      borderRadius: "2px",
      width: 18,
      height: 18,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
  },
});

function HomePage() {

  return (
    <div>
      <Header />
      <div className="content">
        <SideNav />
        <JobCardsContainer />
      </div>
    </div>
  );
}

function JobCardsContainer() {
  const jobCardsContainerState = useContext(StateContext);
  const jobCardsContainerDispatch = useContext(DispatchContext);

  function onClick(event) {
    const newjobArray = jobCardsContainerState.jobs.filter(
      (job) => job.id === event.target.id
    );

    jobCardsContainerDispatch({
      type: ACTION.SELECT_JOB,
      value: newjobArray,
    });
  }
  return (
    <div className="jobCardsContainer">
      {jobCardsContainerState.jobs.map((job) => {
        return (
          <Link to="/job" className="jobCard" key={job.id} onClick={onClick}>
            <div className="companyInfo1">
              <div className="companyLogoBox">
                {job.company_logo ? (
                  <img
                    className="companyLogo"
                    src={`${job.company_logo}`}
                    alt=""
                  />
                ) : (
                  <div className="companyLogoNotFoundBox">
                    <p className="companyLogoNotFound">not found</p>
                  </div>
                )}
              </div>
              <div className="jobInfoTextBox" id={job.id}>
                <div className="JobcompanyName">
                  <p>{`${job.company}`}</p>
                </div>
                <div className="jobName">
                  <p id={job.id}>{job.title}</p>
                </div>
                <div className="jobType1">
                  <p>{job.type}</p>
                </div>
              </div>
            </div>
            <div className="jobInfoBox">
              <div className="jobLocation1">
                <div className="icon">
                  <PublicIcon style={iconStyle} />
                </div>
                <div>
                  <p className="jobInfoText">{job.location}</p>
                </div>
              </div>
              <div className="jobTimePosted1">
                <div className="icon">
                  <AccessTimeIcon className="jobInfoIcon" style={iconStyle} />
                </div>
                <JobPostedTime jobTime={job.created_at} />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function JobPostedTime({ jobTime }) {
  let jobPostedTime = null;
  if (Math.abs(new Date().getDate() - new Date(jobTime).getDate()) === 0) {
    jobPostedTime = (
      <div>
        <p>Today</p>
      </div>
    );
  } else if (
    Math.abs(new Date().getDate() - new Date(jobTime).getDate()) === 1
  ) {
    jobPostedTime = (
      <div>
        <p>
          {Math.abs(
            new Date().getDate() - new Date(jobTime).getDate()
          ).toString() + " day ago"}
        </p>
      </div>
    );
  } else if (Math.abs(new Date().getDate() - new Date(jobTime).getDate()) > 1) {
    jobPostedTime = (
      <div>
        {Math.abs(
          new Date().getDate() - new Date(jobTime).getDate()
        ).toString() + " days ago"}
      </div>
    );
  }

  return jobPostedTime;
}

function SideNav() {
  const sideNavDispatch = useContext(DispatchContext);

  function onChange(event) {
    sideNavDispatch({
      type: ACTION.LOCATION_SEARCH,
      value: event.target.value,
    });
  }

  function onChangeCheckBox(event) {
    if (event.target.checked === true) {
      sideNavDispatch({
        type: ACTION.CHECK_LOCATION,
        value: event.target.name,
      });
    } else {
      sideNavDispatch({
        type: ACTION.CHECK_LOCATION,
        value: " ",
      });
    }
  }

  const classes = useStyles();
  return (
    <div className="sideNav">
      <div className="filterTimeBox">
        <Checkbox
          className={classes.root}
          disableRipple
          color="default"
          checkedIcon={
            <span className={clsx(classes.icon, classes.checkedIcon)} />
          }
          icon={<span className={classes.icon} />}
          inputProps={{ "aria-label": "decorative checkbox" }}
        />
        <span className="filterText">Full time</span>
      </div>
      <div className="locationText">
        <p>Location</p>
      </div>
      <form className="locationSearchBox">
        <PublicIcon className="locationSearchIcon" style={iconStyle} />
        <input
          className="locationSearchInput"
          type="text"
          placeholder="City, state, zip code or country"
          onChange={onChange}
        />
      </form>
      <div className="locationCountries">
        <div className="locationCountry">
          <Checkbox
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={
              <span className={clsx(classes.icon, classes.checkedIcon)} />
            }
            icon={<span className={classes.icon} />}
            inputProps={{ "aria-label": "decorative checkbox" }}
            name="London"
            onChange={onChangeCheckBox}
          />
          <span className="filterText">London</span>
        </div>
        <div className="locationCountry">
          <Checkbox
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={
              <span className={clsx(classes.icon, classes.checkedIcon)} />
            }
            icon={<span className={classes.icon} />}
            inputProps={{ "aria-label": "decorative checkbox" }}
            name="Amsterdam"
            onChange={onChangeCheckBox}
          />
          <span className="filterText">Amsterdam</span>
        </div>
        <div className="locationCountry">
          <Checkbox
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={
              <span className={clsx(classes.icon, classes.checkedIcon)} />
            }
            icon={<span className={classes.icon} />}
            inputProps={{ "aria-label": "decorative checkbox" }}
            name="New York"
            onChange={onChangeCheckBox}
          />
          <span className="filterText">New York</span>
        </div>
        <div className="locationCountry">
          <Checkbox
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={
              <span className={clsx(classes.icon, classes.checkedIcon)} />
            }
            icon={<span className={classes.icon} />}
            inputProps={{ "aria-label": "decorative checkbox" }}
            name="Berlin"
            onChange={onChangeCheckBox}
          />
          <span className="filterText">Berlin</span>
        </div>
      </div>
    </div>
  );
}

const jobDescribStyle = makeStyles({
  root: {
    transform: "matrix(-1.5, 0, 0, 1, 0, 0)",
    marginRight: "15px",
    color: "#1E86FF",
    fontSize: "18px",
  },
});

function JobDescription({ selectedJob }) {
  const jobDescribState = useContext(StateContext);
  function createMarkup(description) {
    return { __html: `${description}` };
  }

  const classes = jobDescribStyle();
  return (
    <div>
      <Title />
      <div className="content2">
        <div className="jobApplyNav">
          <div className="backBox">
            <ArrowRightAltIcon className={classes.root} />
            <div className="backTextBox">
              <Link to="/">Back to search</Link>
            </div>
          </div>
          <div className="howApplyBox">
            <div className="howApplyBoxTitle">
              <p>how to apply</p>
            </div>
            <div className="resumeEmail">
              <p>
                Please email a copy of your resume and online portfolio to
                <span style={{ color: "#1E86FF" }}> wes@kasisto.com </span>& CC
                <span style={{ color: "#1E86FF" }}> eric@kasisto.com</span>
              </p>
            </div>
          </div>
        </div>
        <div className="jobDetails">
          <div>
            {jobDescribState.selectedJob.map((job) => {
              return (
                <div key={job.id}>
                  <div className="jobInformation">
                    <div>
                      <p className="jobTitle">{job.title}</p>
                    </div>
                    <span className="jobtype">{job.type}</span>
                  </div>
                  <div className="jobTimeInfo2">
                    <AccessTimeIcon className="jobInfoIcon" style={iconStyle} />
                    <span className="jobTime">
                      <JobPostedTime jobTime={job.created_at} />
                    </span>
                  </div>
                  <div className="compLogInfoBox">
                    <div className="companyLogoBox2">
                      {job.company_logo ? (
                        <img
                          className="companyLogo2"
                          src={`${job.company_logo}`}
                          alt=""
                        />
                      ) : (
                        <div className="companyLogoNotFoundBox2">
                          <p className="companyLogoNotFound2">not found</p>
                        </div>
                      )}
                    </div>
                    <div className="compNameJobLocBox">
                      <p className="companyName2">{job.company}</p>
                      <div className="jobLocBox">
                        <PublicIcon
                          //   className="locationSearchIcon"
                          style={iconStyle}
                        />
                        <span className="jobLocText">{job.location}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="htmlText"
                    dangerouslySetInnerHTML={createMarkup(job.description)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
