import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/authAction";

const Topbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);
// console.log(userInfo);
    // Sidebar toggle
    
    const toggleSidebar = () => {
        const sidebar = document.getElementById("sidebar");
        sidebar.classList.toggle("collapsed");
    };

    // Logout handler
    const handleLogout = () => {
        dispatch(logout()); // Redux se user data hatao
        navigate("/login"); // Login page par redirect
    };

    return (
        <div className="topbar d-flex justify-content-between align-items-center px-3 py-2 bg-light shadow-sm">
            {/* Sidebar Toggle Button */}
            <button className="btn btn-outline-secondary" onClick={toggleSidebar}>
                <i className="fas fa-bars"></i>
            </button>

            {/* Right Side (User Info + Dropdown) */}
            <div className="topbar-right d-flex align-items-center gap-3">
                <div className="dropdown">
                    <div
                        className="user-profile d-flex align-items-center gap-2"
                        data-bs-toggle="dropdown"
                        style={{ cursor: "pointer" }}
                    >
                        <div
                            className="user-avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                            style={{ width: "35px", height: "35px" }}
                        >
                            {userInfo?.username
                                ? userInfo.username.charAt(0).toUpperCase()
                                : "U"}
                        </div>
                        <span className="d-none d-md-inline fw-semibold">
                            {userInfo?.username || "Guest"}
                        </span>
                        <i className="fas fa-chevron-down small text-muted"></i>
                    </div>

                    <ul className="dropdown-menu dropdown-menu-end shadow">
                        <li>
                            <Link className="dropdown-item" to="/profile">
                                <i className="fas fa-user me-2"></i> Profile
                            </Link>
                        </li>
                        <li>
                            <Link className="dropdown-item" to="/settings">
                                <i className="fas fa-cog me-2"></i> Settings
                            </Link>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <button className="dropdown-item" onClick={handleLogout}>
                                <i className="fas fa-sign-out-alt me-2"></i> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
