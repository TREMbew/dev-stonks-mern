import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { addLike, removeLike } from "../../actions/postActions";

import "./PostHeader.css";

const PostHeader = ({ post: { user, title, likes, _id }}) => {
    const [likeUnlikeText, setLikeUnlikeText] = useState("Like");

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const likeOrUnlikeButton = () => (
        <button
            onClick={() => {
                if (likeUnlikeText === "Like") {
                    dispatch(addLike(_id));
                    setLikeUnlikeText("Unlike");
                } else {
                    dispatch(removeLike(_id));
                    setLikeUnlikeText("Like");
                }
            }}
            className="button is-danger mr-5"
        >
            <i className="fas fa-heart mr-2"></i> {likeUnlikeText}
        </button>
    );

    useEffect(() => {
        if (likes.filter((like) => like.user._id === auth.user._id).length === 0) {
            setLikeUnlikeText("Like");
        } else {
            setLikeUnlikeText("Unlike");
        }
    // eslint-disable-next-line
    }, [auth.user._id]);

  return (
    <div className="post-header px-5 mb-2">
      <div className="post-header-left">
        <img src={user.avatar} alt="Post owner avatar" />
        <div className="post-header-text">
          <h1>{title}</h1>
          <h3>
            by{" "}
            <Link
              to={`/profile/${user._id}`}
              className="primary-text has-text-weight-bold"
            >
              {user.name}
            </Link>
          </h3>
        </div>
      </div>
      <div className="post-header-right">{likeOrUnlikeButton()}</div>
    </div>
  );
};

export default PostHeader;
