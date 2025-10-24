import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses } from "../Redux/Actions/classAction";
import { fetchAllUsers } from "../Redux/Actions/userAction";
import { fetchAllTeachers } from "../Redux/Actions/teacherAction";
import { fetchAllStudents } from "../Redux/Actions/studentAction";


const Cards = () => {

    const dispatch = useDispatch();
    const { classes } = useSelector((state) => state.classes);
    const { users } = useSelector((state) => state.userList);
    const { teachers } = useSelector((state) => state.teachers);
    const { students } = useSelector((state) => state.students);

    useEffect(() => {
        dispatch(fetchClasses());
        dispatch(fetchAllUsers());
        dispatch(fetchAllTeachers());
        dispatch(fetchAllStudents());
    }, [dispatch]);
    return (
        <>
            {/* <!-- Stats Cards --> */}
            <div className="row stats-row">
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="stat-card">
                        <div className="stat-card-body">
                            <div className="stat-info">
                                <h6>Classes</h6>
                                <div className="stat-value">{classes?.length || 0}</div>
                            </div>
                            <div className="stat-icon">
                                <i className="fas fa-school"></i>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="stat-card success">
                        <div className="stat-card-body">
                            <div className="stat-info">
                                <h6>Teachers</h6>
                                <div className="stat-value">{teachers?.length || 0}</div>
                            </div>
                            <div className="stat-icon">
                                <i className="fas fa-chalkboard-teacher"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="stat-card info">
                        <div className="stat-card-body">
                            <div className="stat-info">
                                <h6>Students</h6>
                                <div className="stat-value">{students?.length || 0}</div>
                            </div>
                            <div className="stat-icon">
                                <i className="fas fa-user-tie"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="stat-card warning">
                        <div className="stat-card-body">
                            <div className="stat-info">
                                <h6>Users</h6>
                                <div className="stat-value">{users?.length || 0}</div>
                            </div>
                            <div className="stat-icon">
                                <i className="fas fa-user"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cards
