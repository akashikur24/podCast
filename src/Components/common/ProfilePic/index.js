import React, { useState } from "react";
import "./style.css";

function ProfilePic({ accept, id, fileHandleFnc, text }) {
  const [profile, setProfile] = useState();
  const onChange = (e) => {
    setProfile(e.target.files[0]);
    fileHandleFnc(e.target.files[0]);
  };

  return (
    <>
      <label
        htmlFor={id}
        className={`profile-input ${!profile ? "label-input" : "active"}`}
      >
        {profile ? (
          <img src={URL.createObjectURL(profile)} alt="profile" />
        ) : (
          <span class="material-symbols-outlined">person</span>
        )}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </>
  );
}

export default ProfilePic;
