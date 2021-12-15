import { Outlet } from "react-router-dom";
import NavBarCompany from "../../components/GamingCompany/NavBarCompany.js";

// Gaming company main page
// Nathaniel
const GamingCompanyPage = () => {
  return (
    <div>
      <NavBarCompany></NavBarCompany>
      {/* Renders the children routes of /gamingCompany route from App.js */}
      {/* The children routes are: /gamingCompany and /gamingCompany/myGames */}
      {/* Route /gamingCompany points to GamingCompanyStorePage */}
      {/* Route /gamingCompany/myGames points to MyGamesPage */}
      <Outlet></Outlet>
    </div>
  );
};

export default GamingCompanyPage;
