import React, { useContext } from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PublicIcon from "@material-ui/icons/Public";
import { iconStyle } from "../../iconStyle";
import { ACTION } from "../../App";
import DispatchContext from "../../dispatchContext";
import StateContext from "../../stateContext";
import { Link } from "react-router-dom";

import "../../App.css";

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

export default JobCardsContainer;

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
