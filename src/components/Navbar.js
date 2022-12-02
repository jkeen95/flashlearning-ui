import {menuItems} from '../data/navMenuItems';
import MenuItems from "./MenuItems";


const Navbar = ()  => {
    let items;
    return (
        <nav>
            <ul className="menus">

                {items = menuItems
                    .map((menu, index) => {
                         return <MenuItems items={menu} key={index}/>;
                    }
                 )}
            </ul>
        </nav>
    );
};

export default Navbar;