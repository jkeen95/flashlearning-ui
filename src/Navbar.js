import { menuItems } from './navMenuItems';
import MenuItems from "./MenuItems";

let userToCheck = {}

const Navbar = ({ currentUser }) => {
    let items;
    userToCheck = currentUser
    return (
        <nav>
            <ul className="menus">

                {items = menuItems
                    .filter(filterMenuItems)
                    .map((menu, index) => {
                         console.log("map " + menu)
                         return <MenuItems items={menu} key={index}/>;
                    }
                 )}
            </ul>
        </nav>
    );
};

function filterMenuItems(menu) {
    if(JSON.stringify(userToCheck) === "{}" && menu.title !== "Create" && menu.title !== "Sign Out") {
        console.log("if menui.title " + menu.title)
        return true;
    }
    else if(JSON.stringify(userToCheck) !== "{}" && menu.title !== "Login") {
        console.log("elseif", menu.title)
        //console.log(menu.title === "Login")
        return true;
    }
    console.log(menu)
}

export default Navbar;