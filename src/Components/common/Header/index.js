import React from "react";

import { NavLink } from "react-router-dom";
import "./style.css";
import { useSelector } from "react-redux";
const Header = () => {
  // const location = useLocation();
  // const currentpath = location.pathname;
  const user = useSelector((state) => state.user.user);
  return (
    <div className="nav-bar">
      <div className="gradient"></div>
      <div className="links">
        {!user && <NavLink to="/">SignUp</NavLink>}
        <NavLink to="/podcasts">Podcasts</NavLink>
        <NavLink to="/createaprodcast">Start A Podcast</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </div>
    </div>
  );
};

export default Header;
