import React from "react";
import Home from "../components/Home";

const HomePage = ({ currentUser }) => {
    // return <h1 id="welcomeMessage">Welcome {currentUser.attributes.name}</h1>;
    return <Home currentUser={currentUser}/>
}

export default HomePage;