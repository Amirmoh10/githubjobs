import React from "react";
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
      
        fetch(
          `description=${jobName}&full_time=${fullTime}&location=${location}`
        )
          .then((response) => response.json())
          .then((data) => setJobs(data));
        
      
    

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
