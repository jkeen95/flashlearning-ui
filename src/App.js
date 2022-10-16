import './App.css';
import {Amplify} from 'aws-amplify';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import HomePage from "./pages/HomePage";
import React from "react";
import Header from "./Header";
import SignOut from "./pages/SignOut";
import CreateSet from "./pages/CreateSet";
import {Authenticator, useTheme, View} from "@aws-amplify/ui-react";
import BrowseSetPage from "./pages/BrowseSetPage";
import EditSetPage from "./pages/EditSetPage";
import {Image} from "react-bootstrap";

Amplify.configure(awsExports);

class App extends React.Component {
    components = {
        Header() {
            const { tokens } = useTheme();

            return (
                <div id="authenticatorLogo" textAlign="center" padding={tokens.space.large}>
                    <Image
                        alt="FlashLearning logo"
                        src={require("./images/flashlearning-logo.png")}
                    />
                </div>
            );
        },
    };

    render() {
        return (
          <div className="App">
              <Authenticator components={this.components} signUpAttributes={[
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
                                  <Route path="/" element={<HomePage currentUser={user}/>} />
                                  <Route path="/create/set" element={<CreateSet currentUser={user}/>} />
                                  <Route path="/create/class" element={<CreateSet currentUser={user}/>} />
                                  <Route path="/signout" element={<SignOut />} />
                                  <Route path="/set/:id/browse" element={<BrowseSetPage currentUser={user}/>} />
                                  <Route path="/set/:id/edit" element={<EditSetPage currentUser={user}/>} />
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
