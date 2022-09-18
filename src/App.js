import './App.css';
import {Amplify, Auth} from 'aws-amplify';
import {BrowserRouter as Router, NavLink, Route, Routes} from "react-router-dom";
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import Home from "./pages/Home";
import Login from "./pages/Login";
import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Header from "./Header";

Amplify.configure(awsExports);

class App extends React.Component {

    state = {
        currentUser: {},
    };
async signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

async checkUser() {
    return await Auth.currentAuthenticatedUser()
        .then(user => {
            console.log(typeof user)
            this.setState({currentUser: user})
        })
        .catch(err => console.log(err))
}

componentDidMount() {
    console.log("did mount")
    let returned = this.checkUser();
    console.log(JSON.stringify(returned))
}

componentDidUpdate() {
    console.log("did update")
    console.log(JSON.stringify(this.state.currentUser))
}

loggedInNav() {
    // return(
    //     <div>
    //         <DropdownButton id="dropdown-basic-button" title="Dropdown button">
    //             <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    //             <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    //             <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    //         </DropdownButton>
    //         <button onClick={this.signOut}>Sign out</button>
    //     </div>
    // );
}

render() {
    console.log("render")
    return (
      <div className="App">
          {/*<Router>*/}
          {/*    <div>*/}
          {/*        <NavLink to="/">Home</NavLink>*/}
          {/*        {JSON.stringify(this.state.currentUser) === "{}" ? <NavLink to="/login">Log In</NavLink> : this.loggedInNav()}*/}
          {/*    </div>*/}
          {/*    <Routes>*/}
          {/*        <Route path="/" element={<Home currentUser={this.state.currentUser}/>}></Route>*/}
          {/*        {JSON.stringify(this.state.currentUser) === "{}" ? <Route path="/login" element={<Login />}></Route> : ""}*/}
          {/*    </Routes>*/}
          {/*</Router>*/}
          <Header currentUser={this.state.currentUser}/>
      </div>
  );
}
}
export default App;
