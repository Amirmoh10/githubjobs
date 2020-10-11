import React from "react";
import Header from "./components/header/header";
import JobCardsContainer from "./components/jobCardsContainer/jobCardsContainer";
import SideNav from "./components/sideNav/sideNav";
import axios from "axios";
import "./App.css";

function App() {
  const [jobs, setJobs] = React.useState([]);
  const [location, setLocation] = React.useState("");
  const [jobName, setJobName] = React.useState("");
  const [fullTime, setFullTime] = React.useState(false);

  console.log(location)

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `https://jobs.github.com/positions.json?description=${jobName}&full_time=${fullTime}&location=${location}`
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
  }, [jobName,fullTime,location]);
  return (
    <div className="App">
      <Header setJobName={setJobName} />
      <div className="content">
        <SideNav setLocation={setLocation} setFullTime={setFullTime} />
        <JobCardsContainer jobs={jobs} />
      </div>
    </div>
  );
}

export default App;
