import React, { useState, useEffect } from "react";
import "./ProfileScreen.css";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import { getUsers, editUser } from "../../Service/api.js";
import {useNavigate} from 'react-router-dom';


const initialValue = {
  firstName: "",
  lastName: "",
  email: "",
  pic: "",
};

const ProfileScreen = () => {
  const navigate = useNavigate();
  const id = localStorage.getItem("userD");
  const [user, setUser] = useState(initialValue);
  const { firstName, lastName, email, pic } = user;
  const [avatar, setAvatar] = useState();

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const updateProfileSubmit = async(e) => {
    e.preventDefault();

    await editUser(id, {firstName, lastName, email, pic:avatar});
    navigate("/")
  };

  const updateProfileDataChange = (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "gaurav1st");
      fetch("https://api.cloudinary.com/v1_1/gaurav1st/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setAvatar(data.url.toString());
          window.alert("photo uploaded successfully")
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getAllUsers();
    
  }, []);

  const getAllUsers = async () => {
    let response = await getUsers(id);
    setUser(response.data);
    setAvatar(response.data.pic)
    // setUser({ ...user, "pic": avatar });

  };
console.log(avatar)
  return (
    <div className="updateProfileContainer">
      <div className="updateProfileBox">
        <h2 className="updateProfileHeading">Update Profile</h2>

        <form
          className="updateProfileForm"
          encType="multipart/form-data"
          onSubmit={(e) => updateProfileSubmit(e)}
        >
          <div className="updateProfileName">
            <FaceIcon />
            <input
              type="text"
              placeholder="Name"
              required
              name="firstName"
              value={firstName}
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <div className="updateProfileName">
            <FaceIcon />
            <input
              type="text"
              placeholder="Last Name"
              required
              name="lastName"
              value={lastName}
              onChange={(e) => onValueChange(e)}
            />
          </div>
          <div className="updateProfileEmail">
            <MailOutlineIcon />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={(e) => onValueChange(e)}
            />
          </div>

          <div id="updateProfileImage">
            <img src={avatar} alt="Avatar Preview" />
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={(e) =>updateProfileDataChange(e.target.files[0])}
            />
          </div>
          <input type="submit" value="Update" className="updateProfileBtn" />
        </form>
      </div>
    </div>
  );
};

export default ProfileScreen;
