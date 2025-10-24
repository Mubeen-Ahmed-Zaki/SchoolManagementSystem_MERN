import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../Redux/Actions/authAction";

const Signup = () => {
    const dispatch = useDispatch();
    const { loading, error, userInfo } = useSelector((state) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    // Toggle password visibility
    const togglePassword = () => setShowPassword(!showPassword);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signupUser(formData)); // call redux action
        setFormData({
            username: "",
            email: "",
            password: "",
        })
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
            <div className="auth-container">
                <div className="auth-card form-container active" id="loginForm">
                    <div className="auth-header">
                        <h2>Create Account</h2>
                        <p>Sign up to get started</p>
                    </div>

                    <div className="auth-body">
                        {/* Show success or error message */}
                        {error ? (
                            <div className="alert alert-danger">{error}</div>
                        ) : userInfo ? (
                            <div className="alert alert-success">
                                {userInfo.msg || "Account created successfully!"}
                            </div>
                        ) : null}

                        {/* Corrected form syntax */}
                        <form onSubmit={handleSubmit}>
                            {/* Full Name */}
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <div className="input-group">
                                    <i className="fas fa-user input-group-icon"></i>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="form-group">
                                <label className="form-label">Email Address</label>
                                <div className="input-group">
                                    <i className="fas fa-envelope input-group-icon"></i>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <div className="input-group">
                                    <i className="fas fa-lock input-group-icon"></i>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <i
                                        className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"
                                            } password-toggle`}
                                        onClick={togglePassword}
                                        style={{ cursor: "pointer" }}
                                    ></i>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="agreeTerms"
                                    required
                                />
                                <label className="form-check-label" htmlFor="agreeTerms">
                                    I agree to the <Link to="/">Terms & Conditions</Link>
                                </label>
                            </div>

                            {/* Button */}
                            <button type="submit" className="btn-auth" id="signupBtn">
                                {loading ? "Creating..." : "Signup"}
                            </button>
                        </form>

                        {/* Divider */}
                        {/* <div className="divider">
                            <span>Or sign up with</span>
                        </div> */}

                        {/* Social Buttons */}
                        {/* <div className="social-login">
                            <button className="btn-social btn-google">
                                <i className="fab fa-google"></i> Google
                            </button>
                            <button className="btn-social btn-facebook">
                                <i className="fab fa-facebook-f"></i> Facebook
                            </button>
                        </div> */}
                    </div>

                    <div className="auth-footer">
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
