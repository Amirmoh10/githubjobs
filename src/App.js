import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import JobDescription from "./components/jobDescription/jobDescription";
import HomePage from "./components/homePage/homePage";
import "./App.css";

function App() {
  const [jobs, setJobs] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [selectedJob, setSelectedJob] = React.useState([]);
  const [jobName, setJobName] = React.useState("");
  const [fullTime, setFullTime] = React.useState(false);

  console.log(location);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?description=${jobName}&full_time=${fullTime}&location=${location}`
        );

        setJobs(result.data);
      } catch (error) {
        console.log("erro fetching");
      }
    };
    fetchData();

    return () => {
      // clean up
    };
  }, [jobName, fullTime, location]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage
              jobs={jobs}
              setSelectedJob={setSelectedJob}
              setJobName={setJobName}
              setLocation={setLocation}
              setFullTime={setFullTime}
            />
          </Route>
          <Route exact path="/job">
            <JobDescription selectedJob={selectedJob} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
