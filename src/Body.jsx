import React, { useEffect } from "react";
import Header from "./components/Header";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { BASEURL } from "./utils/constants";
import axios from "axios";
import { addUser } from "./store/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);

  useEffect(() => {
    if (!userData) {
      getProfile();
    }
  }, [userData]);

  const getProfile = async () => {
    try {
      const res = await axios.get(BASEURL + "/profile/view", {
        withCredentials: true,
      });

      dispatch(addUser(res.data));

    } catch (err) {
      console.log(err);

      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
