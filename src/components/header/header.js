import React from "react";
import "./header.css";

function Header({ setJobName }) {
  return (
    <div>
      <Title/>
      <form className="searchForm">
        <input
          className="searchInput searcc"
          type="text"
          placeholder="Title, companies, expertise ..."
          onChange={(event) => setJobName(event.target.value)}
        />
        <button className="searchBtn">Search</button>
      </form>
    </div>
  );
}

export default Header;

export const Title = ()=>{
  return (
    <div className="titleBox">
      <span className="boldTitle">Github </span>
      <span className="normalTitle">Jobs </span>
    </div>
  );
}