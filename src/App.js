import './App.css';
import {Amplify, DataStore, Hub} from 'aws-amplify';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import HomePage from "./pages/HomePage";
import React from "react";
import Header from "./components/Header";
import SignOut from "./pages/SignOut";
import {Authenticator, useTheme} from "@aws-amplify/ui-react";
import BrowseSetPage from "./pages/BrowseSetPage";
import EditSetPage from "./pages/EditSetPage";
import {Image} from "react-bootstrap";
import CreateSetPage from "./pages/CreateSetPage";
import MemorizeSetPage from "./pages/MemorizeSetPage";

Amplify.configure(awsExports);

class App extends React.Component {
    constructor() {
        super();
        Hub.listen("datastore", async hubdata => {
            const {event, data} = hubdata.payload;
            if (event === "ready") {
                console.log("EVERYHTING READY")
            }
        });
       this.setup();
    }

    async setup() {
        await DataStore.start()
    }

    components = {
        Header() {
            const { tokens } = useTheme();

            return (
                <div id="authenticatorLogo" padding={tokens.space.large}>
                    <Image
                        alt="FlashLearning logo"
                        src={require("./images/flashlearning-logo.png")}
                    />
                </div>
            );
        },
    };

    async componentDidMount() {
        //console.log("didCount")
        //console.log("didStart")
    }

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
                          {/*{console.log("login" + JSON.stringify(user))}*/}
                          <Header currentUser={user}/>
                          <Router>
                              <Routes>
                                  <Route path="/" element={<HomePage currentUser={user}/>} />
                                  <Route path="/create/set" element={<CreateSetPage currentUser={user}/>} />
                                  {/*<Route path="/create/class" element={<CreateSetPage currentUser={user}/>} />*/}
                                  {/*<Route path="/signout" element={<SignOut />} />*/}
                                  <Route path="/set/:id/browse" element={<BrowseSetPage currentUser={user}/>} />
                                  <Route path="/set/:id/edit" element={<EditSetPage currentUser={user}/>} />
                                  <Route path="/set/:id/memorize" element={<MemorizeSetPage currentUser={user}/>} />
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
