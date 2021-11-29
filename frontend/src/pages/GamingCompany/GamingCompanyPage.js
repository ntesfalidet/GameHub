import { Link, Outlet } from "react-router-dom";
import './styles/GamingCompanyPage.css';

// Gaming company main page
// Nathaniel 
function GamingCompanyPage() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg sticky-top navbar-light">
        <ul>
          <li>
            <Link to="/gamingCompany">Store</Link>
          </li>
          <li>
            <Link to="/gamingCompany/myGames">My Games</Link>
          </li>
          <li>
            <Link className="btn btn-primary" to="/">Logout</Link>
          </li>
        </ul>
      </nav>
      {/* Renders the children routes from above */}
      <Outlet></Outlet>
    </div>
  );
}

export default GamingCompanyPage;