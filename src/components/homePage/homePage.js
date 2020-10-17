import React from "react";
import Header from "../header/header";
import JobCardsContainer from "../jobCardsContainer/jobCardsContainer";
import SideNav from "../sideNav/sideNav";
import Page from "../pages/page";
import Footer from "../footer/footer";
import "../../App.css";

function HomePage() {
  return (
    <div className="homePage">
      <Header />
      <div className="content">
        <SideNav />
        <JobCardsContainer />
      </div>
      <Page />
      <Footer/>
    </div>
  );
}

export default HomePage;
