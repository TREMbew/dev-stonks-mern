import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import LoadingSpinner from "../../components/loading/LoadingSpinner";
import PostCard from "../../components/post-card/PostCard";
//import { ReactComponent as NoPostsImage } from "../../assets/images/no-posts.svg";

import { getFeed } from "../../actions/postActions";

import "./FeedPage.css";

const FeedPage = () => {
    const {loading, posts} = useSelector(state => state.post);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFeed());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
    <>
        <Navbar />
        {loading ? (
            <LoadingSpinner />
        ) : (
            <section id="posts" className="container px-5">
                {posts.length ? (
                    <>
                        <h1 className="title">Your Feed</h1>
                        <div className="columns is-multiline">
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="container is-empty">
                        {/*<NoPostsImage />*/}
                        <h1 className="subtitle">
                            Uh oh ! Your feed is empty. Go on and follow some more users.
                        </h1>
                    </div>
                )}
            </section>
        )}
        <Footer />
    </>
    );
};

export default FeedPage;
