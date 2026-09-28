import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASEURL } from "../utils/constants";
import { removeUser } from "../store/userSlice";

const Header = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        BASEURL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-20 w-full px-6 bg-gray-900 text-white flex justify-between items-center">

      {/* Logo */}
      <Link to="/feed">
        <h1 className="text-4xl">
          DevTinder
        </h1>
      </Link>

      {/* User */}
      {user && (
        <div className="relative">

          {/* Profile Photo */}
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className="w-12 h-12 rounded-full object-cover cursor-pointer border-2 border-white"
            onClick={() => setShowMenu(!showMenu)}
          />

          {/* Dropdown */}
          {showMenu && (
            <div className="absolute right-0 top-14 w-40 bg-white text-black rounded-lg shadow-lg overflow-hidden">

              {/* Profile */}
              <Link
                to="/profile"
                onClick={() => setShowMenu(false)}
                className="block px-4 py-3 hover:bg-gray-300"
              >
                Profile
              </Link>
              <Link
              to="/connections"
              onClick = {()=>setShowMenu(false)}
               className="block px-4 py-3 hover:bg-gray-300"

              >
              connections
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-3 hover:bg-gray-300"
              >
                Logout
              </button>

            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Header;