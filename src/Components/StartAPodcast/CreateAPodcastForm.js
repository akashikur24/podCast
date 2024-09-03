import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputComponent from "../common/Input";
import Button from "../common/Button";
import { toast } from "react-toastify";
import FileInput from "../common/Input/FileInput";
import { auth, db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import music_logo from "../../images/music-logo.png";
import { addDoc, collection } from "firebase/firestore";
const CreateAPodcastForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [displayImage, setDisplayImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (title && desc) {
      setLoading(true);
      try {
        const bannerImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(bannerImageRef, bannerImage);
        const bannerImageUrl = await getDownloadURL(bannerImageRef);
        const displayImageRef = ref(
          storage,
          `podcasts/${auth.currentUser.uid}/${Date.now()}`
        );

        if (displayImage) {
          await uploadBytes(displayImageRef, displayImage);
        } else {
          const response = await fetch(music_logo);
          const blob = await response.blob();
          await uploadBytes(displayImageRef, blob);
        }

        const displayImageUrl = await getDownloadURL(displayImageRef);

        const podcastData = {
          title: title,
          description: desc,
          bannerImage: bannerImageUrl,
          displayImage: displayImageUrl,
          createdBy: auth.currentUser.uid,
        };
        const docRef = await addDoc(collection(db, "podcasts"), podcastData);

        navigate(`/podcast/${docRef.id}`);
        setTitle("");
        setDesc("");
        setBannerImage(null);
        setDisplayImage(null);
        toast.success("success podcast created");
        setLoading(false);
      } catch (e) {
        toast.error("Error While creating a Prodcast");
        setLoading(false);
      }
    } else {
      toast.error("Please atleast enter title and description of the podcast ");
    }
  };

  const bannerImageHandle = (file) => {
    setBannerImage(file);
  };
  const displayImageHandle = (file) => {
    setDisplayImage(file);
  };
  return (
    <>
      <InputComponent
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
      />
      <InputComponent
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="text"
        required={true}
      />
      <FileInput
        accept={"image/*"}
        id={"display-image-input"}
        fileHandleFnc={displayImageHandle}
        text={"Display image Upload"}
      />
      <FileInput
        accept={"image/*"}
        id={"banner-image-input"}
        fileHandleFnc={bannerImageHandle}
        text={"Banner image Upload"}
        w
      />
      <Button
        text={loading ? "Loading..." : "Create Podcast"}
        disabled={loading}
        onClick={handleSubmit}
      />
    </>
  );
};

export default CreateAPodcastForm;
