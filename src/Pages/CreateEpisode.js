import React, { useState } from "react";
import Header from "../Components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputComponent from "../Components/common/Input";
import FileInput from "../Components/common/Input/FileInput";
import Button from "../Components/common/Button";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../firebase";
import { addDoc, collection, doc } from "firebase/firestore";

const CreateEpisode = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const audioFileHandle = (file) => {
    setAudioFile(file);
  };
  const handleSubmit = async () => {
    setLoading(true);
    if (title && desc && audioFile && id) {
      try {
        const audioRef = ref(
          storage,
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);
        const audioUrl = await getDownloadURL(audioRef);
        const episodeData = {
          title: title,
          description: desc,
          audioFile: audioUrl,
        };
        await addDoc(collection(db, "podcasts", id, "episodes"), episodeData);
        toast.success("Episode created successFully");
        setLoading(false);
        navigate(`/podcast/${id}`);
        setTitle("");
        setDesc("");
        setAudioFile(null);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    } else {
      toast.error("All files should be there");
      setLoading(false);
    }
  };
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>create an Episode</h1>
        <InputComponent
          state={title}
          setState={setTitle}
          placeholder="Episode Title"
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
          accept={"audio/*"}
          id={"display-file-input"}
          fileHandleFnc={audioFileHandle}
          text={"Uplode Audio File"}
        />
        <Button
          text={loading ? "Loading..." : "Create Episode"}
          disabled={loading}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default CreateEpisode;
