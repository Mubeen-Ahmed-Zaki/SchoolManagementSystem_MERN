import React, { useEffect, useState } from "react";
import "../style.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Cards from "./Cards";
import GetClasses from "./classComponents/GetClasses";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses } from "../Redux/Actions/classAction";
import Users from "./User/Users";
import Teachers from "./Teacher/Teachers";
import Students from "./Student/Students";
import MyClassesWithStudents from "./Teacher/MyClassesWithStudents";
import MyEnrolledClass from "./Student/MyEnrolledClass";

const Home = () => {
    const [activeSection, setActiveSection] = useState("dashboard");
    const { userInfo } = useSelector((state) => state.auth); //Current user
    const role = userInfo?.role;
    // const dispatch = useDispatch();

    // Agar classes section active hai to data fetch kare
    // useEffect(() => {
    //     if (activeSection === "classes") {
    //         dispatch(fetchClasses());
    //     }
    // }, [activeSection, dispatch]);

    // Section names readable banane ke liye
    const sectionNames = {
        dashboard: "Dashboard",
        users: "Users",
        classes: "Classes",
        teachers: "Teachers",
        students: "Students",
        settings: "Settings",
    };

    return (
        <>
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

            <div className="main-content">
                <Topbar />

                <div className="dashboard-content">
                    {/*Dynamic Page Heading */}
                    <div className="page-heading">
                        <h1 className="h1 mb-0 text-gray-800">
                            {sectionNames[activeSection] || "Dashboard"}
                        </h1>
                    </div>

                    {/* Dynamic Section Rendering */}
                    {activeSection === "dashboard" && (
                        <>
                            {role === "Teacher" ? (
                                <MyClassesWithStudents />
                            ) : role === "Student" ? (
                                <MyEnrolledClass/>
                            ) : (
                                <Cards />
                            )}
                        </>
                    )}
                    {activeSection === "classes" && <GetClasses />}
                    {activeSection === "users" && <Users />}
                    {activeSection === "teachers" && <Teachers />}
                    {activeSection === "students" && <Students />}
                    {activeSection === "settings" && <h3>Settings Section comming soon...</h3>}
                    {/* {activeSection === "profile" && <Profile/>} */}
                </div>
            </div>
        </>
    );
};

export default Home;
