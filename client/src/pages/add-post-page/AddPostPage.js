import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import LeftPanel from "../../components/authLeftPanel/AuthLeftPanel";

import { addPost } from "../../actions/postActions";

import "./AddPostPage.css";

const AddPostPage = ({ history }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        postImage: "",
        techTags: "",
        websiteUrl: "",
        repoUrl: "",
    });

    const {
        title,
        description,
        techTags,
        websiteUrl,
        repoUrl,
        postImage,
    } = formData;
    const isLoading = useSelector(state => state.post.loading)
    const dispatch = useDispatch()

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onImageSelect = (e) => {
        setFormData({ ...formData, postImage: e.target.files });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const post = new FormData();
        post.append("title", title);
        post.append("description", description);
        for (const key of Object.keys(postImage)) {
            post.append("postImage", postImage[key]);
        }
        post.append("techTags", techTags);
        post.append("websiteUrl", websiteUrl);
        post.append("repoUrl", repoUrl);
        dispatch(addPost(post, history));
    };

    return (
    <section id="add-post">
      <div className="columns">
        <LeftPanel>Awesome ! We're excited to have you post.</LeftPanel>
        <div className="column">
          <div className="container" id="add-post-right">
            <h1 className="title">Create a Post</h1>
            <form encType="multipart/form-data" onSubmit={(e) => onSubmit(e)}>
              <div className="field">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Website name might be a good idea to put here !"
                    name="title"
                    value={title}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Description</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    placeholder="Tell us what your website is all about !"
                    name="description"
                    rows="3"
                    value={description}
                    onChange={(e) => onChange(e)}
                  ></textarea>
                </div>
              </div>
              <div className="field">
                <label className="label">Images</label>
                <div className="file is-primary">
                  <label className="file-label">
                    <input
                      className="file-input"
                      type="file"
                      name="postImage"
                      multiple
                      required
                      onChange={(e) => onImageSelect(e)}
                    />
                    <span className="file-cta">
                      <span className="file-icon">
                        <i className="fas fa-upload"></i>
                      </span>
                      <span className="file-label">Upload upto 5 images</span>
                    </span>
                  </label>
                </div>
              </div>
              <div className="field">
                <label className="label">Technologies Used</label>
                <p className="control has-icons-left ">
                  <input
                    className="input"
                    type="text"
                    placeholder="React, NodeJS, MongoDB"
                    name="techTags"
                    value={techTags}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-tag"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <label className="label">Live Website URL</label>
                <p className="control has-icons-left ">
                  <input
                    className="input"
                    type="text"
                    placeholder="https://google.com"
                    name="websiteUrl"
                    value={websiteUrl}
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-globe"></i>
                  </span>
                </p>
              </div>
              <div className="field">
                <label className="label">Source Code URL</label>
                <p className="control has-icons-left ">
                  <input
                    className="input"
                    type="text"
                    placeholder="https://github.com/driwwwle"
                    name="repoUrl"
                    value={repoUrl}
                    onChange={(e) => onChange(e)}
                  />
                  <span className="icon is-small is-left">
                    <i className="fab fa-github"></i>
                  </span>
                </p>
              </div>
              <p className="control mt-5">
                <button
                  type="submit"
                  className={`button green-bg ${
                    isLoading ? "is-loading" : null
                  }`}
                >
                  Submit
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddPostPage;