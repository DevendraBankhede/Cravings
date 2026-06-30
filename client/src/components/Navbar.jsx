import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="bg-(--primary) text-lg text-(--primary-text) p-3 flex justify-between">
        <div>Cravings</div>

        <div className="flex gap-4">
          <Link to={"/"} className="hover:underline">
            Home
          </Link>
          <Link to={"/login"} className="hover:underline hover:text-(--accent)">
            Login
          </Link>
          <Link to={"/register"} className="hover:underline">
            Register
          </Link>
          <Link to={"/contact-us"} className="hover:underline">
            Contact us
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;