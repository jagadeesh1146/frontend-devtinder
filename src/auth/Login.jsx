import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";
import { BASEURL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const [isLogin, setIsLogin] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // =========================
  // LOGIN
  // =========================
  const handleLogin = async () => {
    setError("");

    if (!emailId || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await axios.post(
        BASEURL + "/login",
        {
          email: emailId,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Login successful:", res.data);

      dispatch(addUser(res.data));

      navigate("/feed");

    } catch (err) {
      console.log(err.response);

      if (err.response) {
        setError(
          err.response.data?.message ||
          "Invalid email or password"
        );
      } else if (err.request) {
        setError("Unable to connect to server");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  // =========================
  // SIGNUP
  // =========================
  const handleSignup = async () => {
    setError("");

    if (!firstName || !lastName || !emailId || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        BASEURL + "/signup",
        {
          firstName: firstName,
          lastName: lastName,
          email: emailId,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Signup successful:", res.data);

      // Add newly created user to Redux
      dispatch(addUser(res.data.data));

      // User is already logged in
      navigate("/feed");

    } catch (err) {
      console.log(err.response);

      if (err.response) {
        setError(
          err.response.data?.message ||
          "Signup failed"
        );
      } else if (err.request) {
        setError("Unable to connect to server");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex justify-center mt-10">

      <div className="w-84 border border-gray-600 shadow-2xl rounded-2xl bg-gray-800 p-8">

        {/* Heading */}
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          {isLogin ? "Login" : "Sign up"}
        </h2>

        {/* =========================
            FIRST NAME
        ========================= */}
        {!isLogin && (
          <>
            <div className="mb-5">
              <label className="block text-gray-300 mb-2">
                First Name
              </label>

              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* =========================
                LAST NAME
            ========================= */}
            <div className="mb-5">
              <label className="block text-gray-300 mb-2">
                Last Name
              </label>

              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}

        {/* =========================
            EMAIL
        ========================= */}
        <div className="mb-5">
          <label className="block text-gray-300 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={emailId}
            onChange={(e) => setEmailId(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* =========================
            PASSWORD
        ========================= */}
        <div className="mb-1">
          <label className="block text-gray-300 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* =========================
            ERROR
        ========================= */}
        <div className="min-h-10 mt-3 mb-3">

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

        </div>

        {/* =========================
            BUTTON
        ========================= */}
        <button
          className="w-full bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          onClick={isLogin ? handleLogin : handleSignup}
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        {/* =========================
            TOGGLE
        ========================= */}
        <p
          className="mt-4 text-amber-100 cursor-pointer text-center"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
        >
          {isLogin
            ? "Don't have an account? Signup here"
            : "Already have an account? Login"}
        </p>

      </div>

    </div>
  );
};

export default Login;