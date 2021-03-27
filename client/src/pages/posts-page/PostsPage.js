import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import LoadingSpinner from "../../components/loading/LoadingSpinner";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import PostCard from "../../components/post-card/PostCard";
import Paginator from "../../components/paginator/Paginator";

import { getPosts } from "../../actions/postsActions";
import usePaginator from "../../custom/usePaginator";

function PostsPage() {
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state) => state.post);
    const { items, currentPage, perPage, setCurrentPage } = usePaginator(posts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
    <>
        <Navbar />
        {loading ? (
            <div className="full-height-spinner">
                <LoadingSpinner />
            </div>
        ) : (
            <section id="posts" className="container px-5">
                <h1 className="title">Recent Posts</h1>
                <div className="columns is-multiline">
                    {items.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
                <Paginator
                    onChange={setCurrentPage}
                    current={currentPage}
                    pageSize={perPage}
                    total={posts.length}
                />
            </section>
        )}
        <Footer />
    </>
    );
}

export default PostsPage;