import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASEURL } from "../utils/constants";

const Connections = () => {

    const [connections, setConnections] = useState([]);

    const getConnections = async () => {
        try {
            const res = await axios.get(
                BASEURL + "/user/connections",
                {
                    withCredentials: true
                }
            );

            console.log(res.data.data);
            setConnections(res.data.data );

        } catch (err) {
            console.log("ERROR:", err);
            console.log("FULL RESPONSE:", res);
           console.log("RESPONSE DATA:", res.data);
            console.log("CONNECTION DATA:", res.data?.data);
        }
    };

    useEffect(() => {
        getConnections();
    }, []);

    //if(connections.length === 0) return <h1>no connections found</h1>

    return (
        <div className="min-h-screen bg-base-200 py-10">

            <h1 className="text-3xl font-bold text-center mb-8">
                My Connections
            </h1>

            <div className="flex flex-wrap justify-center gap-6">

                {connections.map((connection) => (

                    <div
                        key={connection._id}
                        className="card w-80 bg-base-100 shadow-xl"
                    >

                        <div className="card-body items-center text-center">

                            {/* Profile avatar */}
                            <div className="avatar placeholder">
                                <div className="bg-primary text-primary-content flex items-center justify-center w-20 rounded-full">
                                    <span className="text-2xl ">
                                        {connection.firstName?.[0]}
                                    </span>
                                </div>
                            </div>

                            <h2 className="card-title mt-3">
                                {connection.firstName} {connection.lastName}
                            </h2>
                            <h3 className="mt-2 text-gray-500">
                                {connection.about}
                            </h3>

                            <div className="card-actions mt-4">
                                <button className="btn btn-primary">
                                    Message
                                </button>
                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default Connections;