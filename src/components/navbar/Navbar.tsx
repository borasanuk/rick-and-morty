import { Link, useLocation } from "react-router-dom";
import "./navbar.scss";
import NavbarBgEnd from "./navbar_end.png";
import NavbarBgStart from "./navbar_start.png";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="ram-navbar-outer-container">
      <div className="ram-navbar-inner-container container ">
        <img className="ram-navbar-start" alt="" src={NavbarBgStart} />
        <div className="ram-navbar">
          <Link
            to="locations" // NOTE: maybe read available paths from somewhere and map to items?
            className={
              "anchor-nostyle ram-navbar-item " +
              (location.pathname.startsWith("/locations") ? "selected" : "")
            }
          >
            Locations
          </Link>
          <Link
            to="residents"
            className={
              "anchor-nostyle ram-navbar-item " +
              (location.pathname.startsWith("/residents") ? "selected" : "")
            }
          >
            Residents
          </Link>
        </div>
        <img className="ram-navbar-end" alt="" src={NavbarBgEnd} />
      </div>
    </div>
  );
};

export default Navbar;
