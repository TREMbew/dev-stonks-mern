import React from "react";
import { Link, Redirect } from "react-router-dom";
import {useSelector} from "react-redux";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

import "./HomePage.css";

const HomePage = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <>
        <Navbar />
        <main id="landing">
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <div className="text-container">
                            <h1 className="title">Best community for web developers!</h1>
                            <p className="subtitle has-text-grey">
                                A portal for web developers and freelancers to showcase their
                                work to the world. Share and get inspired by creatives for
                                free!
                            </p>
                            <Link to="/signup" className="button primary-bg">
                            Get Started
                            </Link>
                        </div>
                    </div>
                    <div className="column">
                    {/*<HeaderImage id="landing-image" />*/}
                    </div>
                </div>
            </div>
        </main>
        <Footer />
        </>
    )
}

export default HomePage
