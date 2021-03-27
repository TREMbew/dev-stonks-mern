import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingSpinner from "../../components/loading/LoadingSpinner";
import PostCard from "../../components/post-card/PostCard";
import Paginator from "../../components/paginator/Paginator";

import { getUserPosts } from "../../actions/postsActions";
import usePaginator from "../../custom/usePaginator";

import "./ProfilePosts.css";

const ProfilePosts = ({ userId })  =>{
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state) => state.posts);
    const { items, currentPage, perPage, setCurrentPage } = usePaginator(posts);

    useEffect(() => {
        dispatch(getUserPosts(userId));
    }, [dispatch, userId]);

    return (
    <>
        {loading && !items ? (
            <div className="full-height-spinner">
                <LoadingSpinner />
            </div>
        ) : (
            <section id="posts" className="container">
                {items.length === 0 ? (
                    <h1 className="title full-screen">
                        User hasn't posted anything yet !
                    </h1>
                ) : (
                <div className="columns is-multiline">
                    {items.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
                )}
                <Paginator
                    onChange={setCurrentPage}
                    current={currentPage}
                    pageSize={perPage}
                    total={posts.length}
                />
            </section>
        )}
    </>
    );
}

export default ProfilePosts;
