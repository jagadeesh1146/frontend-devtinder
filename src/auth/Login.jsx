import React from "react";
import {useState} from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../utils/constants";

const Login = () => {
    const [emailId , setEmailId]=useState("")
    const [password , setPassword] = useState("")
const dispatch = useDispatch()
const navigate = useNavigate()


   const handleLogin = async () => {

  try {
    const res = await axios.post(BASEURL + "/login", {
      email:emailId,
      password:password,
    },{withCredentials : true});

    dispatch(addUser(res.data))
    navigate("/feed")
    
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="flex justify-center mt-10">
      <div className="w-84 border border-gray-600 shadow-2xl rounded-2xl bg-gray-800 p-8">

        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Login
        </h2>

        <div className="mb-5">
          <label className="block text-gray-300 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={emailId}
            onChange={(e)=>setEmailId(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button className="w-full bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          onClick={handleLogin}>
          Login
        </button>

      </div>
    </div>
  );
};

export default Login;