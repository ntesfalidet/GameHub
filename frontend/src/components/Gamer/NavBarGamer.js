import { Link } from "react-router-dom";
import "./styles/NavBarGamer.css";
// Yuanyuan
// Gamer Navbar
const NavBarGamer = () => {
    let currUser = sessionStorage.getItem("currUser");
    currUser = JSON.parse(currUser);
    return (
        <nav className="navbar navbar-expand-lg sticky-top justify-content-between navbar-light navBarGamer" role="navigation">
            <ul className="navbar-nav navBarItems">
                <li className="imageNavItem">
                    <img src="../../../gameIcon.png" alt="gameIconImg" />
                </li>
                <li className="nav-item navItemCart">
                    <Link className="nav-link" to="/gamer/myCart">Cart</Link>
                </li>
                <li className="nav-item navItemStore">
                    <Link className="nav-link" to="/gamer/gamerStore">Store</Link>
                </li>
            </ul>
            <div className="welcomeGamer">
                Welcome {currUser.role + ", " + currUser.userName}
            </div>
            <Link className="btn btn-primary logoutButton" to="/">
                Logout
            </Link>
        </nav>
    );
};
export default NavBarGamer;
