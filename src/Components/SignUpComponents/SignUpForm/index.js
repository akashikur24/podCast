import React, { useState } from "react";
import InputComponent from "../../common/Input";
import Button from "../../common/Button";
import { auth, db, storage } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../Slices/userSlice";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import ProfilePic from "../../common/ProfilePic";

function SignUpForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const uploadImage = async (file) => {
    setLoading(true);
    try {
      const profileRef = ref(storage, `profile/${Date.now()}`);
      await uploadBytes(profileRef, file);
      const imageUrl = await getDownloadURL(profileRef);
      setProfileImage(imageUrl);
      setLoading(false);
      toast.success("Image Uploaded!");
    } catch (error) {
      toast.error("Error Occurred While Uploading Image Please Try again!");
    }
  };

  const handleSignup = async () => {
    setLoading(true);
    if (
      password === confirmPassword &&
      password.length >= 6 &&
      fullName &&
      email
    ) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        if (profileImage) {
          await setDoc(doc(db, "users", user.uid), {
            name: fullName,
            email: user.email,
            uid: user.uid,
            profilePic: profileImage,
          });

          // Save data in the redux, call the redux action
          dispatch(
            setUser({
              name: fullName,
              email: user.email,
              uid: user.uid,
              profilePic: profileImage,
            })
          );
        } else {
          await setDoc(doc(db, "users", user.uid), {
            name: fullName,
            email: user.email,
            uid: user.uid,
          });

          // Save data in the redux, call the redux action
          dispatch(
            setUser({
              name: fullName,
              email: user.email,
              uid: user.uid,
            })
          );
        }

        toast.success("User has been created!");
        setLoading(false);
        navigate("/profile");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      if (password !== confirmPassword) {
        toast.error(
          "Please Make Sure your password and Confirm Password matches!"
        );
      } else if (password.length < 6) {
        toast.error(
          "Please Make Sure your password is more than 6 digits long!"
        );
      } else {
        toast.error("Fill all the Details");
      }
      setLoading(false);
      // throw an error
    }
  };

  return (
    <>
      <ProfilePic
        id="user-image"
        fileHandleFnc={uploadImage}
        accept={"image/*"}
        text={"Profile"}
      />

      <InputComponent
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        type="text"
        required={true}
      />
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="text"
        required={true}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />
      <InputComponent
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        type="password"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "Signup"}
        disabled={loading}
        onClick={handleSignup}
      />
    </>
  );
}

export default SignUpForm;
