import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASEURL } from "../utils/constants";
import { addRequest } from "../store/requestSlice";

const Requests = () => {

    const dispatch = useDispatch();

    // Get requests from Redux
    const requests = useSelector((store) => store.request);

    // Get received requests
    const getRequests = async () => {
        try {
            const res = await axios.get(
                BASEURL + "/user/request/received",
                {
                    withCredentials: true
                }
            );

            console.log("Received Requests:", res.data.data);

            // Store received requests in Redux
            dispatch(addRequest(res.data.data));

        } catch (err) {
            console.log("ERROR:", err);
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
        }
    };

    // Accept / Reject request
    const reviewRequest = async (status, requestId) => {
        try {
            const res = await axios.post(
                BASEURL + `/request/review/${status}/${requestId}`,
                {},
                {
                    withCredentials: true
                }
            );

            console.log("Review response:", res.data);

            // Remove the reviewed request from the UI
            const updatedRequests = requests.filter(
                (request) => request._id !== requestId
            );

            dispatch(addRequest(updatedRequests));

        } catch (err) {
            console.log("ERROR:", err);
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
        }
    };

    useEffect(() => {
        getRequests();
    }, []);

    return (
        <div className="min-h-screen bg-base-200 py-10">

            <h1 className="text-3xl font-bold text-center mb-8">
                Connection Requests
            </h1>

            <div className="flex flex-wrap justify-center gap-6">

                {requests?.map((request) => (

                    <div
                        key={request._id}
                        className="card w-80 bg-base-100 shadow-xl"
                    >

                        <div className="card-body items-center text-center">

                            {/* Avatar */}
                            <div className="avatar placeholder">
                                <div className="bg-primary text-primary-content w-20 rounded-full flex items-center justify-center">

                                    <span className="text-2xl">
                                        {request.fromUserId?.firstName?.[0]}
                                    </span>

                                </div>
                            </div>

                            {/* Name */}
                            <h2 className="card-title mt-3">

                                {request.fromUserId?.firstName}{" "}

                                {request.fromUserId?.lastName}

                            </h2>

                            {/* About */}
                            <p className="text-gray-500">

                                {request.fromUserId?.about}

                            </p>

                            {/* Buttons */}
                            <div className="card-actions mt-4">

                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        reviewRequest(
                                            "accepted",
                                            request._id
                                        )
                                    }
                                >
                                    Accept
                                </button>

                                <button
                                    className="btn btn-error"
                                    onClick={() =>
                                        reviewRequest(
                                            "rejected",
                                            request._id
                                        )
                                    }
                                >
                                    Reject
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Requests;