import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ activeSection, setActiveSection }) => {
    const { userInfo } = useSelector((state) => state.auth); // 🔥 Redux se current user

    const role = userInfo?.role; // role nikal lo

    return (
        <div className="sidebar" id="sidebar">
            <div className="sidebar-brand">
                <h4>SMS</h4>
            </div>

            <nav className="sidebar-nav">
                <ul className="nav flex-column">

                    {/* Dashboard sab ko visible */}
                    <li className="nav-item">
                        <Link
                            className={`nav-link ${activeSection === "dashboard" ? "active" : ""}`}
                            onClick={() => setActiveSection("dashboard")}
                        >
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span> Dashboard</span>
                        </Link>
                    </li>

                    {/* Admin only */}
                    {role === "Admin" && (
                        <>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${activeSection === "users" ? "active" : ""}`}
                                    onClick={() => setActiveSection("users")}
                                >
                                    <i className="fas fa-users"></i>
                                    <span> Users</span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${activeSection === "classes" ? "active" : ""}`}
                                    onClick={() => setActiveSection("classes")}
                                >
                                    <i className="fas fa-book-open"></i>
                                    <span> Classes</span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${activeSection === "teachers" ? "active" : ""}`}
                                    onClick={() => setActiveSection("teachers")}
                                >
                                    <i className="fas fa-chalkboard-teacher"></i>
                                    <span> Teachers</span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${activeSection === "students" ? "active" : ""}`}
                                    onClick={() => setActiveSection("students")}
                                >
                                    <i className="fas fa-user-graduate"></i>
                                    <span> Students</span>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className={`nav-link ${activeSection === "settings" ? "active" : ""}`}
                                    onClick={() => setActiveSection("settings")}
                                >
                                    <i className="fas fa-gear"></i>
                                    <span> Settings</span>
                                </Link>
                            </li>
                        </>
                    )}

                    {/* Teacher only */}
                    {/* {role === "Teacher" && (
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${activeSection === "students" ? "active" : ""}`}
                                onClick={() => setActiveSection("students")}
                            >
                                <i className="fas fa-user-graduate"></i>
                                <span> Students</span>
                            </Link>
                        </li>
                    )} */}

                    {/* 👨‍🎓 Student only */}
                    {/* {role === "Student" && (
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${activeSection === "profile" ? "active" : ""}`}
                                onClick={() => setActiveSection("profile")}
                            >
                                <i className="fas fa-user"></i>
                                <span> My Profile</span>
                            </Link>
                        </li>
                    )} */}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;