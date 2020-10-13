import React from "react";
import { Title } from "../header/header";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { makeStyles } from "@material-ui/core/styles";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import PublicIcon from "@material-ui/icons/Public";
import { JobPostedTime } from "../homePage/homePage";
import { iconStyle } from "../../iconStyle";

import "./jobDescription.css";
import "../homePage/homePage.css";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    transform: "matrix(-1.5, 0, 0, 1, 0, 0)",
    marginRight: "15px",
    color: "#1E86FF",
    fontSize: "18px",
  },
});

function JobDescription({ selectedJob }) {
  function createMarkup(description) {
    return { __html: `${description}` };
  }

  const classes = useStyles();
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
        <div className="jobDetails">
          <div>
            {selectedJob.map((job) => {
              return (
                <div key={job.id}>
                  <div className="jobInformation">
                    <p className="jobTitle">{job.title}</p>
                    <div className="jobtype">
                      <p>{job.type}</p>
                    </div>
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
