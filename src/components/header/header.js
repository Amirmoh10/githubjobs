import React from "react";
import "../../App.css";


function Header({ setJobName }) {
  return (
    <div>
      <div className="titleBox">
        <span className="boldTitle">Github </span>
        <span className="normalTitle">Jobs </span>
      </div>
      <form className="searchForm">
        <input
          className="searchInput"
          type="text"
          placeholder="Title, companies, expertise or benefits"
          onChange={(event) => setJobName(event.target.value)}
        />
        <button className="searchBtn">Search</button>
      </form>
    </div>
  );
}

export default Header;
