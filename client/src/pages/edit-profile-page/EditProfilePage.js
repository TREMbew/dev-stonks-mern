import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import LeftPanel from "../../components/authLeftPanel/AuthLeftPanel";
import ProfileInput from "../../components/profile-input/ProfileInput";

import {createProfile, getCurrentProfile} from "../../actions/profileActions";

import "../create-profile-page/CreateProfilePage.css";

const EditProfilePage = ({ history }) => {
    const [formData, setFormData] = useState({
        bio: "",
        website: "",
        location: "",
        skills: "",
        githubUsername: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        codepen: "",
        github: "",
    });

    const {profile, loading} = useSelector(state => state.theprofile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentProfile());
        setFormData({
            bio: loading || !profile.bio ? "" : profile.bio,
            website: loading || !profile.website ? "" : profile.website,
            location: loading || !profile.location ? "" : profile.location,
            skills: loading || !profile.skills ? "" : profile.skills.join(","),
            githubUsername: loading || !profile.githubUsername ? "" : profile.githubUsername,
            twitter: loading || !profile.social ? "" : profile.social.twitter,
            instagram: loading || !profile.social ? "" : profile.social.instagram,
            linkedin: loading || !profile.social ? "" : profile.social.linkedin,
            codepen: loading || !profile.social ? "" : profile.social.codepen,
            github: loading || !profile.social ? "" : profile.social.github,
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    const {
        bio,
        website,
        location,
        skills,
        githubUsername,
        twitter,
        instagram,
        linkedin,
        codepen,
        github,
    } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createProfile(formData, history, true));
    };

    return (
    <section id="create-profile">
      <div className="columns">
        <LeftPanel>Let's create your profile now, shall we ?</LeftPanel>
        <div className="column">
          <div className="container" id="create-profile-right">
            <h1 className="title">Create Profile</h1>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Website & GitHub</label>
                </div>
                <div className="field-body">
                  <ProfileInput
                    placeholder="johndoe.io"
                    value={website}
                    icon="fas fa-globe"
                    name="website"
                    onChange={onChange}
                  />
                  <ProfileInput
                    placeholder="GitHub username"
                    value={githubUsername}
                    icon="fab fa-github"
                    name="githubUsername"
                    smallText="This will be used to fetch your repos"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Location</label>
                </div>
                <div className="field-body">
                  <ProfileInput
                    placeholder="Mumbai, India"
                    value={location}
                    icon="fas fa-map-marker-alt"
                    name="location"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Skills</label>
                </div>
                <div className="field-body">
                  <ProfileInput
                    placeholder="React, Vue, NodeJS, PHP"
                    value={skills}
                    icon="fas fa-laptop-code"
                    name="skills"
                    smallText="Please seperate each skill using a comma"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Bio</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <textarea
                        className="textarea has-fixed-size"
                        placeholder="MERN Stack Developer"
                        rows="2"
                        name="bio"
                        value={bio}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Socials</label>
                </div>
                <div className="field-body">
                  <ProfileInput
                    placeholder="Twitter profile link"
                    value={twitter}
                    icon="fab fa-twitter"
                    name="twitter"
                    onChange={onChange}
                  />
                  <ProfileInput
                    placeholder="Instagram profile link"
                    value={instagram}
                    icon="fab fa-instagram"
                    name="instagram"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal"></div>
                <div className="field-body">
                  <ProfileInput
                    placeholder="LinkedIn profile link"
                    value={linkedin}
                    icon="fab fa-linkedin"
                    name="linkedin"
                    onChange={onChange}
                  />
                  <ProfileInput
                    placeholder="Codepen profile link"
                    value={codepen}
                    icon="fab fa-codepen"
                    name="codepen"
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label"></div>
                <div className="field-body">
                  <div className="field is-expanded">
                    <ProfileInput
                      placeholder="GitHub profile link"
                      value={github}
                      icon="fab fa-github"
                      name="github"
                      onChange={onChange}
                    />
                  </div>
                </div>
              </div>
              <div className="field is-grouped mt-5 is-grouped-centered">
                <p className="control">
                  <button type="submit" className="button green-bg">
                    Submit
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProfilePage;
