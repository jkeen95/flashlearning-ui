import Navbar from './Navbar';
import {Link} from "react-router-dom";

const Header = ({ currentUser }) => {
    return (
        <header>
            <div id="nav-area">
                <a href="/" className="logo">
                    <img id="flashLearningLogo" src={require("./images/flashlearning-logo.png")}/>
                </a>
                <Navbar currentUser={currentUser}/>
            </div>
        </header>
    );
};

export default Header;