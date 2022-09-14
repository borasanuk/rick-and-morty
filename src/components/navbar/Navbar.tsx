import "./navbar.scss";
import NavbarBgStart from "./navbar_start.png";
import NavbarBgEnd from "./navbar_end.png";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="ram-navbar-container">
      <img className="ram-navbar-start" src={NavbarBgStart} />
      <div className="ram-navbar">
        <Link
          to="locations" // NOTE: maybe read available locations from somewhere and map to items?
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
      <img className="ram-navbar-end" src={NavbarBgEnd} />
    </div>
  );
};

export default Navbar;
