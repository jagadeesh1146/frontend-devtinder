import React from "react";

const FeedCard = ({ user }) => {
  return (
    <div className="flex justify-center py-8">
      <div className="w-96 overflow-hidden rounded-2xl bg-white shadow-xl">

        {/* Profile Image */}
        <div className="h-96 w-full">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>

        {/* User Details */}
        <div className="p-6">

          <h2 className="text-2xl font-bold text-gray-800">
            {user.firstName} {user.lastName}
          </h2>

          {user.age && (
            <p className="mt-1 text-gray-500">
              {user.age} years old
            </p>
          )}

          {user.gender && (
            <p className="mt-1 text-gray-500">
              {user.gender}
            </p>
          )}

          {/* Skills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {user.skills?.map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            <button className="rounded-lg border border-red-500 px-5 py-2 font-semibold text-red-500 hover:bg-red-50">
              Ignore
            </button>

            <button className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700">
              Interested
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FeedCard;