import Navbar from './Navbar';

const Header = ({ currentUser }) => {
    return (
        <header>
            <div className="nav-area">
                <a href="/" className="logo">
                    Logo
                </a>
                <Navbar currentUser={currentUser}/>
            </div>
        </header>
    );
};

export default Header;