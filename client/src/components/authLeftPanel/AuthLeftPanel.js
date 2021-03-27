import React from "react";
import { Link } from "react-router-dom";

import "./AuthLeftPanel.css";

const AuthLeftPanel = ({text}) => {
    return (
        <div className="column is-one-third" id="auth-left-panel">
            <div className="text-container">
                <Link to="/" className="logo">
                    dev-Stonks
                </Link>
                <p>{text}</p>
            </div>
        </div>
    );
};

export default AuthLeftPanel