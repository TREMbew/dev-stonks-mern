import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import AuthLeftPanel from "../../components/authLeftPanel/AuthLeftPanel";

import {loginUser} from "../../actions/authActions";

import "./SigninPage.css";

const SigninPage = () => {
    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })
    const {email, password} = formData;
    console.log(email)

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const isLoading = useSelector(state => state.auth.loading)
    const dispatch = useDispatch()

    const onChangehandler = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value});
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    };

    if (isAuthenticated) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <section id="signin">
            <div className="columns">
                <AuthLeftPanel>Welcome back ! Ready to inspire and get inspired today ?</AuthLeftPanel>
                <div className="column">
                    <div className="container" id="signin-right">
                        <h1 className="title">Sign In</h1>
                        <form onSubmit={(e) => onSubmit(e)}>
                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control has-icons-left">
                                    <input
                                        className="input"
                                        type="email"
                                        placeholder="example@example.com"
                                        name="email"
                                        value={email}
                                        onChange={(e) => onChangehandler(e)}
                                        required
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Password</label>
                                <p className="control has-icons-left">
                                    <input
                                        className="input"
                                        type="password"
                                        placeholder="Enter password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => onChangehandler(e)}
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
                            Don't have an account ? <Link to="/signup">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>    
        </section>
    )
}

export default SigninPage

