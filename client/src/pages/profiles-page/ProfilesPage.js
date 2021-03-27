import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import ProfileCard from "../../components/profile-card/ProfileCard";
import Paginator from "../../components/paginator/Paginator";

import { getProfiles } from "../../actions/profileActions";
import usePaginator from "../../custom/usePaginator";

const ProfilesPage = () => {
    const dispatch = useDispatch();
    const { profiles, loading } = useSelector((state) => state.theprofile);
    const { items, currentPage, perPage, setCurrentPage } = usePaginator(profiles);

    useEffect(() => {
        dispatch(getProfiles());
    }, [dispatch]);

    return (
    <>
        <Navbar />
            {loading ? (
                <div className="full-height-spinner">
                    <LoadingSpinner />
                </div>
            ) : (
                <section id="profiles-page" className="container px-5">
                    <h1 className="title">All Developer Profiles</h1>
                    <div className="profile-cards columns is-multiline">
                        {items.map((profile) => (
                            <ProfileCard key={profile._id} profile={profile} />
                        ))}
                    </div>
                    <Paginator
                        onChange={setCurrentPage}
                        current={currentPage}
                        pageSize={perPage}
                        total={profiles.length}
                    />
                </section>
            )}
        <Footer />
    </>
    );
}

export default ProfilesPage;