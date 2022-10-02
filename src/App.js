import './App.css';
import {Amplify} from 'aws-amplify';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import Home from "./pages/Home";
import Login from "./pages/Login";
import React from "react";
import Header from "./Header";
import SignOut from "./pages/SignOut";
import CreateSet from "./pages/CreateSet";

Amplify.configure(awsExports);

class App extends React.Component {

    state = {
        currentUser: {},
    };

    componentDidMount() {
        console.log("did mount")
        console.log("didMount " + window.localStorage.getItem("currentUser"))
        if(localStorage.getItem("currentUser") !== null) {
            this.setState({currentUser: JSON.parse(window.localStorage.getItem("currentUser"))})
        }
    }

    render() {
        return (
          <div className="App">
              <Header currentUser={this.state.currentUser}/>
              <Router>
                  <Routes>
                      <Route path="/" element={<Home currentUser={this.state.currentUser}/>} />
                      <Route path="/login" element={<Login currentUser={this.state.currentUser}/>} />
                      <Route path="/create/set" element={<CreateSet />} />
                      <Route path="/create/class" element={<Login />} />
                      <Route path="/signout" element={<SignOut />} />
                  </Routes>
              </Router>
          </div>
      );
    }
}

export default App;
