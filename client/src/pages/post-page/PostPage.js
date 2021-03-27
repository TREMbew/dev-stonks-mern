import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import LoadSpinner from "../../components/loading/LoadingSpinner";
import PostCarousel from "../../components/post-carousel/PostCarousel";
import PostTiles from "../../components/post-tiles/PostTiles";
import PostHeader from "../../components/post-header/PostHeader";

import { getPostById } from "../../actions/postActions";

const PostPage = ({ match, history }) => {
    console.log(match, history);

    const {post, loading} = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostById(match.params.id, history));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
    <>
        <Navbar />
        {loading || !post ? (
            <div className="full-height-spinner">
                <LoadSpinner />
            </div>
        ) : (
        <>
            <section id="post" className="container">
                <PostHeader post={post} />
                <PostCarousel images={post.images} />
                <PostTiles post={post} />
            </section>
        </>
        )}
        <Footer />
    </>
    );
};


export default PostPage;
