import React, {useEffect} from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {useDispatch} from 'react-redux'

import Alert from './components/alert/Alert';
import PrivateRoute from "./PrivateRoute";

import HomePage from "./pages/home-page/HomePage";
import SignupPage from "./pages/signup-page/SignupPage";
import SigninPage from "./pages/signin-page/SigninPage";
import DashboardPage from "./pages/dashboard-page/DashboardPage";
import CreateProfilePage from "./pages/create-profile-page/CreateProfilePage";
import EditProfilePage from "./pages/edit-profile-page/EditProfilePage";
import ProfilesPage from "./pages/profiles-page/ProfilesPage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import PostsPage from "./pages/posts-page/PostsPage";
import AddPostPage from "./pages/add-post-page/AddPostPage";
import FeedPage from "./pages/feed-page/FeedPage";
import PostPage from "./pages/post-page/PostPage";

import setAuthToken from "./helpers/setAuthToken";
import {loadUser} from "./actions/authActions"

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUser())
  }, [])
  return (
      <BrowserRouter>
        <Alert />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/signin" component={SigninPage} />
          <PrivateRoute exact path="/dashboard" component={DashboardPage} />
          <PrivateRoute exact path="/profile/new" component={CreateProfilePage} />
          <PrivateRoute exact path="/profile/edit" component={EditProfilePage} />
          <PrivateRoute exact path="/profiles" component={ProfilesPage} />
          <PrivateRoute exact path="/profile/:id" component={ProfilePage} />
          <PrivateRoute exact path="/posts" component={PostsPage} />
          <PrivateRoute exact path="/posts/new" component={AddPostPage} />
          <PrivateRoute exact path="/feed" component={FeedPage} />
          <PrivateRoute exact path="/posts/:id" component={PostPage} />
        </Switch>
      </BrowserRouter>
  );
};

export default App;