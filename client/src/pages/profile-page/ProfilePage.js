import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingSpinner from "../../components/loading/LoadingSpinner";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import ProfileHeader from "../../components/profile-header/ProfileHeader";
import ProfileTabs from "../../components/profile-tabs/ProfileTabs";

import { getProfileById } from "../../actions/profileActions";

function ProfilePage() {
    const history = useHistory();
    const { id: userId } = useParams();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { profile, loading } = useSelector((state) => state.theprofile);
    useEffect(() => {
        dispatch(getProfileById(userId, history));
    }, [dispatch, userId, history]);

    return (
    <>
        <Navbar />
            {!profile || loading ? (
                <div className="full-height-spinner">
                    <LoadingSpinner />
                </div>
            ) : (
                <div id="profile" className="container">
                    <ProfileHeader
                        profile={profile}
                        ownProfile={!loading && user._id === profile.user._id}
                        id={userId}
                    />
                    <ProfileTabs profile={profile} userId={userId} />
                </div>
            )}
        <Footer />
    </>
    );
}

export default ProfilePage;