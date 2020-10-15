import React, { useEffect, useReducer } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StateContext from "./stateContext";
import DispatchContext from "./dispatchContext";
import HomePage from "./components/homePage/homePage";
import JobDescription from "./components/jobDescription/jobDescription";

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

export const ACTION = {
  JOBTITLE_SEARCH: "JOBTITLE_SEARCH",
  CLICK_SEARCH: "CLICK_SEARCH",
  JOBTITLE_CLEAR: "JOBTITLE_CLEAR",
  LOCATION_SEARCH: "LOCATION_SEARCH",
  SUBMIT_SEARCH: "SUBMIT_SEARCH",
  LOCATION_CLEAR: "LOCATION_CLEAR",
  CHECK_LOCATION: "CHECK_LOCATION",
  FETCH_DATA: "FETCH_DATA",
  SELECT_JOB: "SELECT_JOB",
  REFRESH_PAGE: "REFRESH_PAGE",

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

    case ACTION.JOBTITLE_CLEAR:
      return {
        ...state,
        jobName: " ",
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
    case ACTION.LOCATION_CLEAR:
      return {
        ...state,
        jobLocation: " ",
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

    case ACTION.REFRESH_PAGE: {
      return {
        ...state,
        jobName: "",
        jobLocation: "",
      };
    }

    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${state.jobName}&location=${state.jobLocation}`
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
  }, [state.jobName, state.jobLocation]);

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
