import React, { useEffect, useState } from "react";
import Header from "../Components/common/Header";
import { useNavigate, useParams } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { toast } from "react-toastify";
import Button from "../Components/common/Button";
import Episodes from "../Components/Podcasts/EpisodesDetails";
import AudioPlay from "../Components/Podcasts/AudioPlayer";

const PodcastDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [podcast, setPodcasts] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [playingFile, setPlayingFile] = useState("");
  const [isPlay, setIsPlay] = useState(false);
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  const getData = async () => {
    try {
      const docRef = doc(db, "podcasts", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPodcasts({ id: id, ...docSnap.data() });
      } else {
        navigate("/podcasts");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    // fetching a data
    const unsubscribe = onSnapshot(
      query(collection(db, "podcasts", id, "episodes")),
      (querySnapshot) => {
        const episodesData = [];
        querySnapshot.forEach((doc) => {
          episodesData.push({ id: doc.id, ...doc.data() });
        });
        setEpisodes(episodesData);
      },
      (error) => {
        console.error("Error fetching podcasts:", error);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const deleteEpisode = async (episodeId) => {
    try {
      await deleteDoc(doc(db, "podcasts", id, "episodes", episodeId)); // Delete the episode
      setIsPlay(false);
      toast.success("Episode deleted successfully");
    } catch (error) {
      toast.error("Error deleting episode:", error);
    }
  };
  const deletePodcast = async () => {
    try {
      await deleteDoc(doc(db, "podcasts", id)); // Delete the podcast

      toast.success("Podcast deleted successfully");
      navigate("/podcasts");
    } catch (error) {
      toast.error("Error deleting podcast:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="prodcast-wrapper" style={{ marginTop: "2rem" }}>
        {podcast.id && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div
                className="banner-wrapper"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, -0.3),rgba(0, 0, 0, 6.9)), url(${podcast.bannerImage})`,
                }}
              >
                <div className="inside-bg">
                  <h1 className="podcast-title-heading">{podcast.title}</h1>
                  {podcast.createdBy === auth.currentUser.uid && (
                    <div className="flex-button">
                      <Button
                        text="create episodes"
                        podcast_class={true}
                        onClick={() => {
                          navigate(`/podcast/${id}/create-episode`);
                        }}
                      />
                      <div className="delete-Icon">
                        <span
                          class="material-symbols-outlined"
                          onClick={deletePodcast}
                        >
                          delete
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="podcast-description">{podcast.description}</p>
            <h1 className="podcast-episode-heading">Episodes</h1>

            {episodes.length > 0 ? (
              <div className="episodes">
                {episodes.map((episode, index) => (
                  <Episodes
                    key={index}
                    index={index + 1}
                    title={episode.title}
                    description={episode.description}
                    audioFile={episode.audioFile}
                    onClick={(file) => setPlayingFile(file)}
                    epId={episode.id}
                    createdBy={podcast.createdBy}
                    deleteEpisode={deleteEpisode}
                    setIsPlay={setIsPlay}
                  />
                ))}
              </div>
            ) : (
              <p>No Episodes</p>
            )}
          </>
        )}
      </div>

      {playingFile && isPlay && (
        <AudioPlay
          audioSrc={playingFile}
          image={podcast.displayImage}
          setIsPlay={setIsPlay}
        />
      )}
    </div>
  );
};

export default PodcastDetails;
