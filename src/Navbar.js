import {menuItems} from './navMenuItems';
import MenuItems from "./MenuItems";

let userToCheck = {}

const Navbar = ({ currentUser }) => {
    let items;
    userToCheck = currentUser
    return (
        <nav>
            <ul className="menus">

                {items = menuItems
                    .map((menu, index) => {
                         console.log("map " + menu)
                         return <MenuItems items={menu} key={index}/>;
                    }
                 )}
            </ul>
        </nav>
    );
};

export default Navbar;