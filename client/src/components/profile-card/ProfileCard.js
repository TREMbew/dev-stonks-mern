import React from "react";
import { useHistory } from "react-router-dom";

import "./ProfileCard.css";

const ProfileCard = ({profile: { user, social, bio, followers, following, skills }}) => {
    const history = useHistory();
  return (
    <div className="column is-4">
      <div
        className="card"
        onClick={() => history.push(`/profile/${user._id}`)}
      >
        <header className="card-header">
          <img src={user.avatar} alt="User avatar" />
        </header>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{user.name}</p>
              <p className="subtitle is-6">{bio}</p>
            </div>
          </div>
          <div className="content">
            <p>
              Skilled in: {skills.slice(0, 4).join(", ")}
              {skills.length > 4 && <span> and more</span>}
            </p>
            <div className="social-icons">
              {social && social.twitter && (
                <a href={social.twitter} target="_blank">
                  <i className="fab fa-twitter"></i>
                </a>
              )}
              {social && social.instagram && (
                <a href={social.instagram} target="_blank">
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {social && social.linkedin && (
                <a href={social.linkedin} target="_blank">
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {social && social.codepen && (
                <a href={social.codepen} target="_blank">
                  <i className="fab fa-codepen"></i>
                </a>
              )}
              {social && social.github && (
                <a href={social.github} target="_blank">
                  <i className="fab fa-github"></i>
                </a>
              )}
            </div>
            <br />
          </div>
        </div>
        <footer className="card-footer">
          <p className="card-footer-item">{followers.length} Followers</p>
          <p className="card-footer-item">{following.length} Following</p>
        </footer>
      </div>
    </div>
  );
};

export default ProfileCard;