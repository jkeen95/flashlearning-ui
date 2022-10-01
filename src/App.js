import './App.css';
import {Amplify, Auth} from 'aws-amplify';
import {BrowserRouter as Router, NavLink, Route, Routes, useNavigate} from "react-router-dom";
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import Home from "./pages/Home";
import Login from "./pages/Login";
import React, {useEffect, useState} from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Header from "./Header";
import SignOut from "./pages/SignOut";
import CreateSet from "./pages/CreateSet";
import { Hub } from 'aws-amplify';
import {checkUser} from "./utils/Utils";

Amplify.configure(awsExports);

class App extends React.Component {

    state = {
        currentUser: {},
    };

    // constructor(props) {
    //     super(props);

    //     Hub.listen('auth', (data) => {
    //         switch (data.payload.event) {
    //             case 'signIn':
    //                 console.log('user signed in');
    //                 checkUser()
    //                 break;
    //             case 'signUp':
    //                 console.log('user signed up');
    //                 break;
    //             case 'signOut':
    //                 console.log('user signed out');
    //                 break;
    //         }
    //     });
    // }

    // async checkUser() {
    //     return await Auth.currentAuthenticatedUser()
    //         .then(user => {
    //             console.log(typeof user)
    //             this.setState({currentUser: user})
    //         })
    //         .catch(err => console.log(err))
    // }

    componentDidMount() {
         console.log("did mount")
        //console.log(this.state)
        //let returned = this.checkUser();
        //  console.log(JSON.stringify(returned))
        console.log("didMount " + window.localStorage.getItem("currentUser"))
        if(localStorage.getItem("currentUser") !== null) {
            this.setState({currentUser: JSON.parse(window.localStorage.getItem("currentUser"))})
        }
    }
    //
    // componentDidUpdate() {
    //      console.log("did update")
    //      console.log(JSON.stringify(this.state.currentUser))
    // }



    render() {
        // console.log("render")
        // const passDownUser = window.localStorage.getItem("currentUser") !== null ? JSON.parse(window.localStorage.getItem("currentUser")) : this.state.currentUser
        // console.log("passDownUser " + JSON.stringify(passDownUser))
        // console.log(window.localStorage.getItem("currentUser"))
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

// let user = null;
//
// async function getCurrentUser() {
//     return await Auth.currentAuthenticatedUser({
//         bypassCache: false
//     })
// }
//
//
//
// const App = () => {
//     // const [user, setUser] = useState(null)
//     // // useEffect(() => {
//     // //     console.log("userUpdated " + user)
//     // // }, [user])
//     // setUser(getCurrentUser())
//     //const [user, setUser] = useState(null)
//     //const [counter, setCounter] = useState(0)
//
//     // useEffect(() => {
//     //     //setUser(getCurrentUser())
//     //     // const timer = setTimeout(() => {
//     //     //             console.log("timeout " + JSON.stringify(user))
//     //     //         }, 3000)
//     // }, [user]);
//     // if(counter < 4) {
//     //     setUser(getCurrentUser())
//     //     setCounter(counter+1)
//     // }
//     // console.log("firstcheck " + JSON.stringify(user))
//     // // useEffect(() => {
//     // //     const timer = setTimeout(() => {
//     // //         console.log("timeout")
//     // //     }, 3000)
//     // // })
//     // console.log("secondcheck" + JSON.stringify(user))
//     //
//     //  console.log(getCurrentUser())
//     // useEffect(() => {
//     //     let updateUser = async () => {
//     //         try {
//     //             let user = await Auth.currentAuthenticatedUser()
//     //             console.log("user updated")
//     //             setUser(user)
//     //         }
//     //         catch {
//     //             setUser(null)
//     //             console.log("user updated catch")
//     //         }
//     //         Hub.listen('auth', updateUser)
//     //         await updateUser()
//     //         return () => Hub.remove('auth', updateUser)
//     //     }
//     // }, []);
//   return (
//       <div className="App">
//
//         <Header />
//           <Router>
//               <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/create/set" element={<CreateSet />} />
//                   <Route path="/create/class" element={<Login />} />
//                   <Route path="/signout" element={<SignOut />} />
//               </Routes>
//           </Router>
//       </div>
//   );
// }
export default App;
