import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../Redux/Actions/authAction";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, userInfo } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    useEffect(() => {
        if (userInfo) {
            navigate("/"); 
        }
    }, [userInfo, navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
            <div className="auth-container">
                <div className="auth-card form-container active">
                    <div className="auth-header">
                        <h2>Welcome Back</h2>
                        <p>Login to your account</p>
                    </div>

                    <div className="auth-body">
                        {error ? (
                            <div className="alert alert-danger">{error}</div>
                        ) : userInfo ? (
                            <div className="alert alert-success">{userInfo.msg}</div>
                        ) : null}

                        <form onSubmit={handleSubmit}>
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

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <div className="input-group">
                                    <i className="fas fa-lock input-group-icon"></i>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <i
                                        className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} password-toggle`}
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ cursor: "pointer" }}
                                    ></i>
                                </div>
                            </div>

                            <button type="submit" className="btn-auth" id="loginBtn">
                                {loading ? "Logging in..." : "Login"}
                            </button>
                        </form>

                        <div className="auth-footer">
                            <p>
                                Don’t have an account? <Link to="/signup">Sign Up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
