import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import ProfileTabs from "../../components/profile-tabs/ProfileTabs";
import ProfileHeader from "../../components/profile-header/ProfileHeader";

import { getCurrentProfile } from "../../actions/profileActions";

const DashboardPage = () => {
    const {user} = useSelector(state => state.auth);
    const {profile, loading} = useSelector(state => state.theprofile)
    const dispatch = useDispatch();
    //const {profile, loading} = theprofile;
    //const {user} = auth
    
    useEffect(() => {
        dispatch(getCurrentProfile());
    }, []);
    return (
        <>
            <Navbar />
            {(loading && profile === null) || !user ? (
                <div className="full-height-spinner">
                    <LoadingSpinner />
                </div>
            ) : (
                <div id="profile" className="container">
                    <ProfileHeader profile={profile} isDashboard />
                    <ProfileTabs profile={profile} userId={user._id} />
                </div>
            )}
            <Footer />
        </>
    )
}

export default DashboardPage
