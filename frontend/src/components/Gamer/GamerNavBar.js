import { Link, useLocation} from "react-router-dom";
import './styles/GamerNavBar.css';
function NavigationComponent() {
    const location = useLocation();

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light" role="navigation">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-4 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/mycart">Cart</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/">Store</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
export default NavigationComponent;