import React from "react";
import Header from "../Components/common/Header";
import CreateAPodcastForm from "../Components/StartAPodcast/CreateAPodcastForm";

const CreateAProdcast = () => {
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create a Podcast</h1>
        <CreateAPodcastForm />
      </div>
    </div>
  );
};

export default CreateAProdcast;
