import React from "react";
import {Link} from "react-router-dom";

const Nav = () => {
  const user = JSON.parse(localStorage.getItem("taskManagerUser"));
  const logoutUser = () => {
    localStorage.setItem('taskManagerUser',JSON.stringify({email:"",result:"success"}));
    window.location.reload(false);
  };
  return (
    <div class="navbar">
      {user.email === ""?<Link to="/login">Login</Link>:<Link to="/" onClick={logoutUser}>Logout</Link>}
      
    </div>
  );
};

export default Nav;
