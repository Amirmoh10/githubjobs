import React, { useContext } from "react";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PublicIcon from "@material-ui/icons/Public";
import { iconStyle } from "../../iconStyle";
import { makeStyles } from "@material-ui/core/styles";
import { ACTION } from "../../App";
import DispatchContext from "../../dispatchContext";
import StateContext from "../../stateContext";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { Title } from "../header/header";
import { JobPostedTime } from "../jobCardsContainer/jobCardsContainer";

import "../../App.css";

const jobDescribStyle = makeStyles({
  root: {
    transform: "matrix(-1.5, 0, 0, 1, 0, 0)",
    marginRight: "15px",
    color: "#1E86FF",
    fontSize: "18px",
  },
});

function JobDescription() {
  const jobDescribState = useContext(StateContext);
  const jobDescribDispatch = useContext(DispatchContext);
  function createMarkup(description) {
    return { __html: `${description}` };
  }

  function onClick() {
    jobDescribDispatch({
      type: ACTION.REFRESH_PAGE,
    });
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
              <Link to="/" onClick={onClick}>
                Back to search
              </Link>
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

export default JobDescription;
