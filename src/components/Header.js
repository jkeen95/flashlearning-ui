import Navbar from './Navbar';

const Header = ({ currentUser }) => {
    return (
        <header>
            <div id="nav-area">
                <a href="/" className="logo">
                    <img id="flashLearningLogo" src={require("../images/flashlearning-logo.png")}/>
                </a>
                <Navbar />
            </div>
        </header>
    );
};

export default Header;