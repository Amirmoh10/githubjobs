import React from "react";
import Header from "../header/header";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PublicIcon from "@material-ui/icons/Public";
import { iconStyle } from "../../iconStyle";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import clsx from "clsx";

import "./homePage.css";

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
function HomePage({
  jobs,
  setSelectedJob,
  setJobName,
  setLocation,
  setFullTime,
}) {
  return (
    <div>
      <Header setJobName={setJobName} />
      <div className="content">
        <SideNav setLocation={setLocation} setFullTime={setFullTime} />
        <JobCardsContainer jobs={jobs} setSelectedJob={setSelectedJob} />
      </div>
    </div>
  );
}

export default HomePage;

function JobCardsContainer({ jobs, setSelectedJob }) {
  function onClick(event) {
    const newJobArray = jobs.filter((job) => job.id === event.target.id);
    setSelectedJob(newJobArray);
  }
  return (
    <div className="jobCardsContainer">
      {jobs.map((job) => {
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
                <div className="jobType">
                  <p>{job.type}</p>
                </div>
              </div>
            </div>
            <div className="jobInfoBox">
              <div className="jobLocation1">
                <div className="icon">
                  <PublicIcon style={iconStyle} />
                </div>
                <div >
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
        <p>
          Today
        </p>
      </div>
    );
  }
  else if (Math.abs(new Date().getDate() - new Date(jobTime).getDate()) === 1) {
    jobPostedTime = (
      <div >
        <p>
          {Math.abs(
            new Date().getDate() - new Date(jobTime).getDate()
          ).toString() + " day ago"}
        </p>
      </div>
    );
  }
  else if (Math.abs(new Date().getDate() - new Date(jobTime).getDate()) > 1) {
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

function SideNav({ setLocation, setFullTime }) {
  const classes = useStyles();

  function onChange(event) {
    if (event.target.checked === true) {
      setLocation(event.target.name);
    } else {
      setLocation("");
    }
  }

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
          onChange={() => setFullTime(true)}
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
          onChange={(event) => setLocation(event.target.value)}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
          />
          <span className="filterText">Berlin</span>
        </div>
      </div>
    </div>
  );
}
