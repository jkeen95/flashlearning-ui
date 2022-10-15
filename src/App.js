import './App.css';
import {Amplify} from 'aws-amplify';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import Home from "./pages/Home";
import React from "react";
import Header from "./Header";
import SignOut from "./pages/SignOut";
import CreateSet from "./pages/CreateSet";
import {Authenticator} from "@aws-amplify/ui-react";
import BrowseSetPage from "./pages/BrowseSetPage";

Amplify.configure(awsExports);

class App extends React.Component {

    render() {
        return (
          <div className="App">
              <Authenticator signUpAttributes={[
                  'birthdate',
                  'email',
                  'name',
              ]}>
                  {({ user }) => (
                      <div>
                          {console.log("login" + JSON.stringify(user))}
                          <Header currentUser={user}/>
                          <Router>
                              <Routes>
                                  <Route path="/" element={<Home currentUser={user}/>} />
                                  <Route path="/create/set" element={<CreateSet currentUser={user}/>} />
                                  <Route path="/create/class" element={<CreateSet currentUser={user}/>} />
                                  <Route path="/signout" element={<SignOut />} />
                                  <Route path="/set/:id/browse" element={<BrowseSetPage currentUser={user}/>} />
                              </Routes>
                          </Router>
                      </div>
                  )}
              </Authenticator>
          </div>
      );
    }
}

export default App;
