import React from "react";
import Moment from "react-moment";
import { useSelector, useDispatch } from "react-redux";

import { deleteComment } from "../../actions/postActions";

import "./Comment.css";

const Comment = ({ comment, postId, commentId }) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <article className="media">
            <figure className="media-left">
                <p className="image is-64x64">
                    <img src={comment.avatar} alt="User avatar" />
                </p>
            </figure>
            <div className="media-content">
                <div className="content">
                    <p>
                        <strong>
                            {comment.name}
                            <br />
                        </strong>
                        <small>
                            <Moment fromNow>{comment.date}</Moment>
                        </small>
                        <br />
                            {comment.text}
                    </p>
                </div>
            </div>
            {comment.userId === auth.user._id && (
            <div className="media-right">
                <button
                    onClick={(e) => dispatch(deleteComment(postId, commentId))}
                    className="delete mr-5"
                ></button>
            </div>
            )}
        </article>
    );
};

export default Comment;
