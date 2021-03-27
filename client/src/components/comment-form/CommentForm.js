import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addComment } from "../../actions/postActions";

const CommentForm = ({ postId }) => {
    const [text, setText] = useState("");
    const dispatch = useDispatch()

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                dispatch(addComment(postId, { text }));
                setText("");
            }}
        >
            <textarea
                className="textarea"
                placeholder="Awesome ! I work with the same tech stack too."
                name="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            ></textarea>
            <button type="submit" className="button primary-bg mt-4">
                Post
            </button>
        </form>
    );
};

export default CommentForm;