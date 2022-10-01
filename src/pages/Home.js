import React from "react";

const Home = ({ currentUser }) => {
    if(JSON.stringify(currentUser) === "{}")
        return <h1>Flash Learning</h1>;
    else
        return <h1>Welcome {currentUser.attributes.name}</h1>;
}

export default Home;