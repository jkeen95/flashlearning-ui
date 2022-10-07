import React from "react";

const Home = ({ currentUser }) => {
    return <h1 id="welcomeMessage">Welcome {currentUser.attributes.name}</h1>;
}

export default Home;