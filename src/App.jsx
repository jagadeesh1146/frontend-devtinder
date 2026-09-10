import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./auth/Login";
import { Provider } from "react-redux";
import store from "./store/store";
import Feed from "./components/Feed";
const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/feed" element={<Feed/>}/>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  );
};

export default App;