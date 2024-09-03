import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import music_logo from "../../../images/music-logo.png";
const PodcastCard = ({ id, title, displayImage, delay }) => {
  return (
    <Link to={`/podcast/${id}`}>
      <motion.div
        className="podcasts-cards"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
      >
        {displayImage ? (
          <img
            className="display-image-podcasts"
            src={displayImage}
            alt="disImage"
          />
        ) : (
          <img
            className="display-image-podcasts"
            src={music_logo}
            alt="disImage"
          />
        )}

        <div className="title-podcasts">
          <p>{title}</p>
          <span class="material-symbols-outlined">play_arrow</span>
        </div>
      </motion.div>
    </Link>
  );
};

export default PodcastCard;
