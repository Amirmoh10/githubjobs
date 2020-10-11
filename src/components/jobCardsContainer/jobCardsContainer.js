import React from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PublicIcon from "@material-ui/icons/Public";
import { iconStyle } from "../../iconStyle";

import "./jobCardsContainer.css";

function JobCardsContainer({ jobs }) {
  return (
    <div className="jobCardsContainer">
      {jobs.map((job) => {
        return (
          <div className="jobCard" key={job.id}>
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
            <div className="jobInfoTextBox">
              <div className="JobcompanyName">
                <p>{`${job.company}`}</p>
              </div>
              <div className="jobName">
                <p>{job.title}</p>
              </div>
              <div className="jobType">
                <p>{job.type}</p>
              </div>
            </div>
            <div className="jobInfoBox">
              <div className="jobLocationInfoBox">
                <PublicIcon className="jobInfoIcon" style={iconStyle} />
                <span className="jobInfoText">{job.location}</span>
              </div>
              <div className="jobTimePostedInfoBox">
                <AccessTimeIcon className="jobInfoIcon" style={iconStyle} />
                <span className="jobInfoText">
                  <JobPostedTime jobTime={job.created_at} />
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default JobCardsContainer;

function JobPostedTime({ jobTime }) {
  let jobPostedTime = null;
  if (Math.abs(new Date().getDate() - new Date(jobTime).getDate()) === 1) {
    jobPostedTime = (
      <div>
        {Math.abs(
          new Date().getDate() - new Date(jobTime).getDate()
        ).toString() + " day ago"}
      </div>
    );
  }
  if (Math.abs(new Date().getDate() - new Date(jobTime).getDate()) > 1) {
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
