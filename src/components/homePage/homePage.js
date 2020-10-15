import React from "react";
import Header from "../header/header";
import JobCardsContainer from "../jobCardsContainer/jobCardsContainer";
import SideNav from "../sideNav/sideNav";

import "../../App.css";

function HomePage() {
  return (
    <div>
      <Header />
      <div className="content">
        <SideNav />
        <JobCardsContainer />
      </div>
    </div>
  );
}

export default HomePage;
