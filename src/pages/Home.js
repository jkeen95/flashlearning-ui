import React from "react";

class Home extends React.Component {

    render() {
        console.log(JSON.stringify(this.props.currentUser))
        if(JSON.stringify(this.props.currentUser) === "{}")
            return <h1>Flash Learning</h1>;
        else
            return <h1>Welcome {this.props.currentUser.attributes.name}</h1>;
    }
}

export default Home;