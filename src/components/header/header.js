import React, { useContext } from "react";
import DispatchContext from "../../dispatchContext";
import { ACTION } from "../../App";

import "./header.css";

function Header() {
  const headerDispatch = useContext(DispatchContext);

  function onChange(event) {
    if (event.target.value !== "") {
      headerDispatch({
        type: ACTION.JOBTITLE_SEARCH,
        value: event.target.value,
      });
    } else {
      headerDispatch({
        type: ACTION.JOBTITLE_CLEAR,
      });
    }
  }

  function onSubmit(event) {
    event.preventDefault();

    headerDispatch({
      type: ACTION.CLICK_SEARCH,
    });
  }
  return (
    <div>
      <Title />
      <form className="searchForm" onSubmit={onSubmit}>
        <input
          className="searchInput"
          type="text"
          placeholder="Title, companies, expertise ..."
          onChange={onChange}
        />
        <button className="searchBtn">Search</button>
      </form>
    </div>
  );
}

export const Title = () => {
  return (
    <div className="titleBox">
      <span className="boldTitle">Github </span>
      <span className="normalTitle">Jobs </span>
    </div>
  );
};
export default Header;
