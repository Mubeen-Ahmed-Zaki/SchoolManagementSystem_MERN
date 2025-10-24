import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyEnrolledClass } from "../../Redux/Actions/studentAction";

const MyEnrolledClass = () => {
    const dispatch = useDispatch();
    const { student, enrolledClass, loading, error } = useSelector(
        (state) => state.studentEnrolledClass || {}
    );

    const [animateIn, setAnimateIn] = useState(false);

    useEffect(() => {
        dispatch(fetchMyEnrolledClass());
        setTimeout(() => setAnimateIn(true), 100);
    }, [dispatch]);

    if (loading) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <div className="spinner-grow text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="mt-4">
                        <h5 className="text-primary mb-2">Loading your class...</h5>
                        <div className="progress mx-auto" style={{ width: "300px", height: "4px" }}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated" 
                                 style={{ width: "100%" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger border-0 shadow-lg rounded-4 d-flex align-items-center" role="alert">
                    <div className="bg-danger text-white rounded-circle p-3 me-3">
                        <i className="fas fa-exclamation-triangle fa-2x"></i>
                    </div>
                    <div>
                        <h5 className="mb-1">Oops! Something went wrong</h5>
                        <p className="mb-0">{error}</p>
                    </div>
                </div>
                <button className="btn btn-primary btn-lg shadow" onClick={() => dispatch(fetchMyEnrolledClass())}>
                    <i className="fas fa-redo me-2"></i>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4 px-4" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }}>
            {/* Hero Section - Student Profile */}
            {student && (
                <div className={`card border-0 shadow-lg mb-4 overflow-hidden rounded-4 ${animateIn ? 'fade-in' : ''}`}>
                    <div className="position-relative" style={{ 
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        padding: "3rem 2rem"
                    }}>
                        {/* Decorative circles */}
                        <div className="position-absolute" style={{ 
                            width: "200px", height: "200px", 
                            background: "rgba(255,255,255,0.1)", 
                            borderRadius: "50%", 
                            top: "-50px", right: "-50px" 
                        }}></div>
                        <div className="position-absolute" style={{ 
                            width: "150px", height: "150px", 
                            background: "rgba(255,255,255,0.1)", 
                            borderRadius: "50%", 
                            bottom: "-30px", left: "20%" 
                        }}></div>
                        
                        <div className="row align-items-center position-relative">
                            <div className="col-md-2 text-center mb-3 mb-md-0">
                                <div className="student-avatar-premium bg-white text-primary rounded-circle mx-auto d-flex align-items-center justify-content-center shadow-lg position-relative"
                                     style={{ width: "120px", height: "120px", fontSize: "3rem", fontWeight: "bold", border: "5px solid rgba(255,255,255,0.3)" }}>
                                    {student.name?.charAt(0).toUpperCase() || "S"}
                                    <div className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white border-3"
                                         style={{ width: "30px", height: "30px" }}
                                         title="Active">
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-10 text-white">
                                <h1 className="display-6 mb-3 fw-bold">
                                    Welcome back, {student.name}! 👋
                                </h1>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center bg-white bg-opacity-10 rounded-3 p-3 backdrop-blur">
                                            <i className="fas fa-envelope fa-lg me-3"></i>
                                            <div>
                                                <small className="opacity-75">Email Address</small>
                                                <p className="mb-0 fw-semibold">{student.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-center bg-white bg-opacity-10 rounded-3 p-3 backdrop-blur">
                                            <i className="fas fa-id-badge fa-lg me-3"></i>
                                            <div>
                                                <small className="opacity-75">Roll Number</small>
                                                <p className="mb-0 fw-semibold">{student.rollNo}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Class Information */}
            {enrolledClass ? (
                <>
                    {/* Class Header Card */}
                    <div className={`card border-0 shadow-lg mb-4 rounded-4 overflow-hidden ${animateIn ? 'slide-up' : ''}`} 
                         style={{ animationDelay: "0.1s" }}>
                        <div className="card-body p-4">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <div className="d-flex align-items-center mb-3">
                                        <div className="bg-primary bg-opacity-10 text-primary rounded-3 p-3 me-3">
                                            <i className="fas fa-graduation-cap fa-2x"></i>
                                        </div>
                                        <div>
                                            <h2 className="mb-1 fw-bold">{enrolledClass.className}</h2>
                                            <p className="text-muted mb-0">Section {enrolledClass.section}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 text-md-end">
                                    <button className="btn btn-outline-primary rounded-pill px-4" 
                                            onClick={() => dispatch(fetchMyEnrolledClass())}>
                                        <i className="fas fa-sync-alt me-2"></i>
                                        Refresh Data
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row g-4">
                        {/* Subjects Card */}
                        <div className="col-lg-6">
                            <div className={`card border-0 shadow-lg h-100 rounded-4 ${animateIn ? 'slide-up' : ''}`}
                                 style={{ animationDelay: "0.2s" }}>
                                <div className="card-header bg-transparent border-0 pt-4 px-4">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-info bg-opacity-10 text-info rounded-3 p-2 me-3">
                                            <i className="fas fa-book-open fa-lg"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-0 fw-bold">My Subjects</h5>
                                            <small className="text-muted">
                                                {enrolledClass.subjects?.length || 0} subjects enrolled
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body px-4 pb-4">
                                    {enrolledClass.subjects && enrolledClass.subjects.length > 0 ? (
                                        <div className="row g-3">
                                            {enrolledClass.subjects.map((subject, idx) => (
                                                <div className="col-md-6" key={idx}>
                                                    <div className="subject-card bg-light rounded-3 p-3 h-100 border border-2 border-transparent hover-lift">
                                                        <div className="d-flex align-items-center">
                                                            <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                                                                 style={{ width: "40px", height: "40px", fontSize: "0.9rem" }}>
                                                                <i className="fas fa-book"></i>
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-0 fw-semibold">{subject}</h6>
                                                                <small className="text-muted">Active</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-5">
                                            <i className="fas fa-book-dead fa-3x text-muted mb-3"></i>
                                            <p className="text-muted mb-0">No subjects assigned yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Teachers Card */}
                        <div className="col-lg-6">
                            <div className={`card border-0 shadow-lg h-100 rounded-4 ${animateIn ? 'slide-up' : ''}`}
                                 style={{ animationDelay: "0.3s" }}>
                                <div className="card-header bg-transparent border-0 pt-4 px-4">
                                    <div className="d-flex align-items-center">
                                        <div className="bg-success bg-opacity-10 text-success rounded-3 p-2 me-3">
                                            <i className="fas fa-chalkboard-teacher fa-lg"></i>
                                        </div>
                                        <div>
                                            <h5 className="mb-0 fw-bold">My Teachers</h5>
                                            <small className="text-muted">
                                                {enrolledClass.teachers?.length || 0} teachers assigned
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body px-4 pb-4">
                                    {enrolledClass.teachers && enrolledClass.teachers.length > 0 ? (
                                        <div className="teacher-list">
                                            {enrolledClass.teachers.map((teacher, idx) => (
                                                <div key={idx} className="teacher-card bg-light rounded-3 p-3 mb-3 border border-2 border-transparent hover-lift">
                                                    <div className="d-flex align-items-center">
                                                        <div className="teacher-avatar-small bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0"
                                                             style={{ width: "50px", height: "50px", fontSize: "1.2rem" }}>
                                                            {teacher.name?.charAt(0).toUpperCase() || "T"}
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h6 className="mb-1 fw-semibold">{teacher.name}</h6>
                                                            <p className="mb-1 text-muted small">
                                                                <i className="fas fa-envelope me-1"></i>
                                                                {teacher.email}
                                                            </p>
                                                            <span className="badge bg-success-subtle text-success rounded-pill px-3">
                                                                <i className="fas fa-book me-1"></i>
                                                                {teacher.subject}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-5">
                                            <i className="fas fa-user-slash fa-3x text-muted mb-3"></i>
                                            <p className="text-muted mb-0">No teachers assigned yet</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Statistics Cards */}
                        <div className="col-12">
                            <div className="row g-4">
                                <div className="col-md-4">
                                    <div className={`card border-0 shadow rounded-4 text-center p-4 stat-card bg-gradient-primary text-white ${animateIn ? 'scale-in' : ''}`}
                                         style={{ animationDelay: "0.4s" }}>
                                        <div className="mb-3">
                                            <i className="fas fa-book-reader fa-3x"></i>
                                        </div>
                                        <h2 className="display-4 fw-bold mb-2">{enrolledClass.subjects?.length || 0}</h2>
                                        <p className="mb-0 opacity-75">Total Subjects</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className={`card border-0 shadow rounded-4 text-center p-4 stat-card bg-gradient-success text-white ${animateIn ? 'scale-in' : ''}`}
                                         style={{ animationDelay: "0.5s" }}>
                                        <div className="mb-3">
                                            <i className="fas fa-chalkboard-teacher fa-3x"></i>
                                        </div>
                                        <h2 className="display-4 fw-bold mb-2">{enrolledClass.teachers?.length || 0}</h2>
                                        <p className="mb-0 opacity-75">Total Teachers</p>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className={`card border-0 shadow rounded-4 text-center p-4 stat-card bg-gradient-info text-white ${animateIn ? 'scale-in' : ''}`}
                                         style={{ animationDelay: "0.6s" }}>
                                        <div className="mb-3">
                                            <i className="fas fa-school fa-3x"></i>
                                        </div>
                                        <h3 className="fw-bold mb-2">{enrolledClass.className}</h3>
                                        <p className="mb-0 opacity-75">Current Class</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div className={`card border-0 shadow-lg rounded-4 ${animateIn ? 'fade-in' : ''}`}>
                    <div className="card-body text-center py-5">
                        <div className="empty-state-icon mb-4">
                            <i className="fas fa-inbox fa-5x text-muted"></i>
                        </div>
                        <h3 className="mb-3 fw-bold">Not Enrolled Yet</h3>
                        <p className="text-muted mb-4 lead">
                            You haven't been enrolled in any class. Please contact your administrator.
                        </p>
                        <button className="btn btn-primary btn-lg rounded-pill px-5 shadow" 
                                onClick={() => dispatch(fetchMyEnrolledClass())}>
                            <i className="fas fa-sync-alt me-2"></i>
                            Check Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyEnrolledClass;