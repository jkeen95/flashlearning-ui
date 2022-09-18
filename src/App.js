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
import SignOut from "./pages/SignOut";

Amplify.configure(awsExports);

class App extends React.Component {

    state = {
        currentUser: {},
    };

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

render() {
    console.log("render")
    return (
      <div className="App">
          <Header currentUser={this.state.currentUser}/>
          <Router>
              <Routes>
                  <Route path="/" element={<Home currentUser={this.state.currentUser}/>} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/create/set" element={<Login />} />
                  <Route path="/create/class" element={<Login />} />
                  <Route path="/signout" element={<SignOut />} />
              </Routes>
          </Router>
      </div>
  );
}
}
export default App;
