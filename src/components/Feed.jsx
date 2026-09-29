import axios from "axios";
import React, { useEffect } from "react";
import { BASEURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../store/feedSlice";
import FeedCard from "./FeedCard";

const Feed = () => {

  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASEURL + "/feed", {
        withCredentials: true,
      });

      console.log(res.data);

      dispatch(addFeed(res.data.users));

    } catch (err) {
      console.log(err.response);
    }
  };

  useEffect(() => {
    // Call API only when Redux feed is empty
    if (feed.length === 0) {
      getFeed();
    }
  }, []);

 // if(feed.length === 0) return <h3>no users found!!!</h3>
  if (feed.length === 0) {
    return <h2 className="text-2xl text-gray-600">No feed available</h2>;
  }

  return (
    <div>
      {feed.length > 0 &&
        feed.map((user) => (
          <FeedCard
            key={user._id}
            user={user}
          />
        ))}
    </div>
  );
};

export default Feed;