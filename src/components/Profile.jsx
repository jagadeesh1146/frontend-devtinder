import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../store/userSlice";
import { BASEURL } from "../utils/constants";


const Profile = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [about, setAbout] = useState(user?.about || "");
  const [skills, setSkills] = useState(
    user?.skills ? user.skills.join(", ") : ""
  );

  const [loading, setLoading] = useState(false);

  const handleEdit = () => {
    // Load latest Redux values into form
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setAbout(user?.about || "");
    setSkills(user?.skills ? user.skills.join(", ") : "");

    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const res = await axios.patch(
        BASEURL + "/profile/edit",
        {
          firstName,
          lastName,
          about,
          skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== ""),
        },
        {
          withCredentials: true,
        }
      );

     // console.log("Updated user:", res.data);

      // Update Redux
      dispatch(addUser(res.data));

      // Close edit form
      setIsEditing(false);

      alert("Profile updated successfully");
    } catch (error) {
      console.log(
        "Profile update error:",
        error.response?.data || error.message
      );

      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center gap-10 mt-10">

      {/* PROFILE CARD */}
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body">

          <h2 className="card-title">
            {user?.firstName} {user?.lastName}
          </h2>

          <p>
            <strong>About:</strong> {user?.about || "No about information"}
          </p>

          <p>
            <strong>Skills:</strong>{" "}
            {user?.skills?.join(", ") || "No skills added"}
          </p>

          <div className="card-actions justify-end mt-4">
   <button
       className="btn btn-primary"
       onClick={handleEdit}
      >
  Edit Profile
    </button>
          </div>

        </div>
      </div>

      {/* EDIT PROFILE FORM */}
      {isEditing && (
        <div className="card bg-base-100 w-96 shadow-xl">
          <div className="card-body">

            <h2 className="card-title">
              Edit Profile
            </h2>

            {/* FIRST NAME */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>

              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered"
              />
            </label>

            {/* LAST NAME */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>

              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered"
              />
            </label>

            {/* ABOUT */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">About</span>
              </div>

              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea textarea-bordered"
              />
            </label>

            {/* SKILLS */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">
                  Skills
                </span>
              </div>

              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="input input-bordered"
                placeholder="React, Node.js, MongoDB"
              />
            </label>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-4">

              <button
                className="btn btn-primary"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>

              <button
                className="btn btn-outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;