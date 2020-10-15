import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ACTION } from "../../App";
import DispatchContext from "../../dispatchContext";
import Checkbox from "@material-ui/core/Checkbox";
import PublicIcon from "@material-ui/icons/Public";
import { iconStyle } from "../../iconStyle";
import clsx from "clsx";

import "../../App.css";

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

function SideNav() {
  const sideNavDispatch = useContext(DispatchContext);

  function onChange(event) {
    if (event.target.value !== "") {
      sideNavDispatch({
        type: ACTION.LOCATION_SEARCH,
        value: event.target.value,
      });
    } else {
      sideNavDispatch({
        type: ACTION.LOCATION_CLEAR,
      });
    }
  }
  function onSubmit(event) {
    event.preventDefault();
    sideNavDispatch({
      type: ACTION.SUBMIT_SEARCH,
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
      <form className="locationSearchBox" onSubmit={onSubmit}>
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

export default SideNav;
