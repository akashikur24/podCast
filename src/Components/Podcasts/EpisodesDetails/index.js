import React from "react";
import Button from "../../common/Button";
import "./style.css";
import { auth } from "../../../firebase";

const Episodes = ({
  index,
  title,
  description,
  audioFile,
  onClick,
  epId,
  createdBy,
  deleteEpisode,
  setIsPlay,
}) => {
  return (
    <div style={{ width: "100%" }}>
      <h2 style={{ textAlign: "left", marginBottom: 0 }} className="ep-title">
        {index}.{title}
      </h2>
      <p style={{ marginLeft: "1rem" }} className="podcast-description ">
        {description}
      </p>
      <div className="btn-flx">
        <Button
          text={"play"}
          onClick={() => {
            onClick(audioFile);
            setIsPlay(true);
          }}
          style={{ width: "100px" }}
          podcast_class={true}
        />

        {auth.currentUser.uid === createdBy && (
          <div className="delete-Icon">
            <span
              class="material-symbols-outlined"
              onClick={() => deleteEpisode(epId)}
            >
              delete
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Episodes;
