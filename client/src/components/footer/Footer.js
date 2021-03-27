import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <footer id="footer">
            <h1>
                Made by <span>Mohamed M'hamdi</span> 
                <br/>
                © 2021
            </h1>
            <div className="socialIcons">
                <a href="https://stackoverflow.com/users/14017436/med-mhamdi" target="_blank">
                    <i class="fab fa-stack-overflow"></i>
                </a>
                <a href="https://www.linkedin.com/in/med-mhamdi/" target="_blank">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/TREMbew" target="_blank">
                    <i className="fab fa-github"></i>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
