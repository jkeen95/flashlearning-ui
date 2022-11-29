import React from "react";
import Home from "../components/Home";

const HomePage = ({ currentUser, ready }) => {
    console.log(ready)
    if(ready)
        return <Home ready={ready} currentUser={currentUser}/>
    else
        return <div className="noDataYet"/>
}

export default HomePage;