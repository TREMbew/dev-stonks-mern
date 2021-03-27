import { combineReducers } from "redux";

import alert from "./alertReducer";
import auth from "./authReducer";
import theprofile from "./profileReducer";
import post from "./postReducer";
import posts from "./postsReducer";

export default combineReducers({ alert, auth, theprofile, post, posts });