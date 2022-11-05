import Dropdown from './Dropdown';
import {useState} from "react";
import {signOut} from "../pages/SignOut";

const MenuItems = ({ items }) => {
    const [dropdown, setDropdown] = useState(false);
    return (
        <li className="menu-items">
            {items.submenu ? (
                <>
                    <button
                        type="button"
                        aria-expanded={dropdown ? "true" : "false"}
                        onClick={() => setDropdown((prev) => !prev)}
                    >
                        {items.title}{' '}
                    </button>
                    <Dropdown submenus={items.submenu} dropdown={dropdown} />
                </>
            ) : (
                items.title === "Sign Out" ? <button onClick={signOut}>Sign Out</button> : <a href={items.url}>{items.title}</a>
            )}
        </li>
    );
};

export default MenuItems;