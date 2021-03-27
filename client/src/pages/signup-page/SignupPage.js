import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import AuthLeftPanel from "../../components/authLeftPanel/AuthLeftPanel";

import { setAlert } from "../../actions/alertActions";
import { registerUser } from "../../actions/authActions";

import "./SignupPage.css";

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const isLoading = useSelector(state => state.auth.loading);
    const dispatch = useDispatch();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            dispatch(setAlert("Password do not match", "is-danger"));
        } else if (password.length < 6) {
            dispatch(setAlert("Password should be atleast 6 characters long", "is-danger"));
        } else {
            dispatch(registerUser({ name, email, password }));
        }
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <section id="signup">
            <div className="columns">
                <AuthLeftPanel>Sign up to discover creative web developers</AuthLeftPanel>
                    <div className="column">
                        <div className="container" id="signup-right">
                            <h1 className="title">Sign Up</h1>
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <div className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="text"
                                            placeholder="John Doe"
                                            name="name"
                                            value={name}
                                            onChange={(e) => onChange(e)}
                                            required
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-user"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <div className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="email"
                                            placeholder="example@example.com"
                                            name="email"
                                            value={email}
                                            onChange={(e) => onChange(e)}
                                            required
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-envelope"></i>
                                        </span>
                                    </div>
                                        <p className="help">
                                        This email will be used to fetch your gravatar
                                        </p>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <p className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="password"
                                            placeholder="Min 6 characters"
                                            name="password"
                                            value={password}
                                            onChange={(e) => onChange(e)}
                                            required
                                        />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                    </p>
                                </div>
                                <div className="field">
                                    <label className="label">Confirm Password</label>
                                    <p className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="password"
                                            placeholder="Reenter password"
                                            name="password2"
                                            value={password2}
                                            onChange={(e) => onChange(e)}
                                            required
                                        />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-lock"></i>
                                    </span>
                                    </p>
                                </div>
                                <p className="control mt-5">
                                <button
                                    type="submit"
                                    className={`button green-bg ${
                                        isLoading ? "is-loading" : null
                                    }`}
                                >
                                    Submit
                                </button>
                                </p>
                            </form>
                            <p className="mt-6">
                                Already have an account ? <Link to="/signin">Sign In</Link>
                            </p>
                        </div>
                    </div>
            </div>
        </section>
    );
};


export default SignupPage
