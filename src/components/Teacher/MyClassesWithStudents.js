// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMyClassesWithStudents } from "../../Redux/Actions/teacherAction";

// const MyClassesWithStudents = () => {
//     const dispatch = useDispatch();
//     const { teacher, classes, loading, error } = useSelector((state) => state.teacherClasses || {});

//     const [expandedClass, setExpandedClass] = useState(null);

//     useEffect(() => {
//         dispatch(fetchMyClassesWithStudents());
//     }, [dispatch]);

//     const toggleClassExpand = (classId) => {
//         setExpandedClass(expandedClass === classId ? null : classId);
//     };

//     if (loading) {
//         return (
//             <div className="container py-5">
//                 <div className="text-center">
//                     <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
//                         <span className="visually-hidden">Loading...</span>
//                     </div>
//                     <p className="mt-3 text-muted">Loading your classes...</p>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="container py-5">
//                 <div className="alert alert-danger d-flex align-items-center" role="alert">
//                     <i className="fas fa-exclamation-triangle me-2"></i>
//                     <div>
//                         <strong>Error:</strong> {error}
//                     </div>
//                 </div>
//                 <button className="btn btn-primary" onClick={() => dispatch(fetchMyClassesWithStudents())}>
//                     <i className="fas fa-redo me-2"></i>
//                     Retry
//                 </button>
//             </div>
//         );
//     }

//     return (
//         <div className="container py-4">
//             {/* Teacher Profile Card */}
//             {teacher && (
//                 <div className="card mb-4 shadow-sm border-0">
//                     <div className="card-body bg-gradient-primary text-white rounded">
//                         <div className="row align-items-center">
//                             <div className="col-md-8">
//                                 <h4 className="mb-2">
//                                     <i className="fas fa-chalkboard-teacher me-2"></i>
//                                     {teacher.username}
//                                 </h4>
//                                 <p className="mb-1">
//                                     <i className="fas fa-envelope me-2"></i>
//                                     {teacher.email}
//                                 </p>
//                                 <p className="mb-0">
//                                     <i className="fas fa-book me-2"></i>
//                                     Subject: <strong>{teacher.subject || "N/A"}</strong>
//                                 </p>
//                             </div>
//                             <div className="col-md-4 text-md-end mt-3 mt-md-0">
//                                 <div className="d-inline-block bg-white text-primary rounded p-3 shadow">
//                                     <h2 className="mb-0">{classes?.length || 0}</h2>
//                                     <small>Total Classes</small>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {/* Page Header */}
//             <div className="d-flex justify-content-between align-items-center mb-4">
//                 <h3 className="mb-0">
//                     <i className="fas fa-school me-2 text-primary"></i>
//                     My Classes
//                 </h3>
//                 <button className="btn btn-outline-primary" onClick={() => dispatch(fetchMyClassesWithStudents())}>
//                     <i className="fas fa-sync-alt me-2"></i>
//                     Refresh
//                 </button>
//             </div>

//             {/* Classes List */}
//             {classes && classes.length > 0 ? (
//                 <div className="row g-4">
//                     {classes.map((cls, index) => (
//                         <div className="col-12" key={cls._id}>
//                             <div className="card shadow-sm border-0 hover-shadow">
//                                 {/* Class Header */}
//                                 <div
//                                     className="card-header bg-white border-bottom-0 cursor-pointer"
//                                     onClick={() => toggleClassExpand(cls._id)}
//                                     style={{ cursor: "pointer" }}
//                                 >
//                                     <div className="d-flex justify-content-between align-items-center">
//                                         <div className="d-flex align-items-center">
//                                             <div className="me-3">
//                                                 <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
//                                                     style={{ width: "50px", height: "50px", fontSize: "1.5rem" }}>
//                                                     {index + 1}
//                                                 </div>
//                                             </div>
//                                             <div>
//                                                 <h5 className="mb-1">
//                                                     <i className="fas fa-graduation-cap me-2 text-primary"></i>
//                                                     {cls.className} - Section {cls.section}
//                                                 </h5>
//                                                 <small className="text-muted">
//                                                     <i className="fas fa-users me-1"></i>
//                                                     {cls.students?.length || 0} Students
//                                                 </small>
//                                             </div>
//                                         </div>
//                                         <button className="btn btn-link text-decoration-none">
//                                             <i className={`fas fa-chevron-${expandedClass === cls._id ? 'up' : 'down'} text-primary`}></i>
//                                         </button>
//                                     </div>
//                                 </div>

//                                 {/* Students List - Collapsible */}
//                                 {expandedClass === cls._id && (
//                                     <div className="card-body">
//                                         {cls.students && cls.students.length > 0 ? (
//                                             <>
//                                                 <h6 className="mb-3 text-primary">
//                                                     <i className="fas fa-user-graduate me-2"></i>
//                                                     Students Enrolled
//                                                 </h6>
//                                                 <div className="table-responsive">
//                                                     <table className="table table-hover align-middle">
//                                                         <thead className="table-light">
//                                                             <tr>
//                                                                 <th style={{ width: "60px" }} className="text-center">#</th>
//                                                                 <th>Roll No</th>
//                                                                 <th>Student Name</th>
//                                                                 <th>Email</th>
//                                                             </tr>
//                                                         </thead>
//                                                         <tbody>
//                                                             {cls.students.map((student, idx) => (
//                                                                 <tr key={student._id}>
//                                                                     <td className="text-center">
//                                                                         <span className="badge bg-secondary">{idx + 1}</span>
//                                                                     </td>
//                                                                     <td>
//                                                                         <span className="badge bg-warning text-dark">
//                                                                             <i className="fas fa-hashtag me-1"></i>
//                                                                             {student.rollNo || student.roll || "N/A"}
//                                                                         </span>
//                                                                     </td>
//                                                                     <td>
//                                                                         <div className="d-flex align-items-center">
//                                                                             <div className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-2"
//                                                                                 style={{ width: "35px", height: "35px", fontSize: "0.9rem" }}>
//                                                                                 {student.userId.username?.charAt(0).toUpperCase() || "S"}
//                                                                             </div>
//                                                                             <strong>{student.userId.username || "Unknown Student"}</strong>
//                                                                         </div>
//                                                                     </td>
//                                                                     <td>
//                                                                         <small className="text-muted">
//                                                                             <i className="fas fa-envelope me-1"></i>
//                                                                             {student.userId.email || "N/A"}
//                                                                         </small>
//                                                                     </td>
//                                                                 </tr>
//                                                             ))}
//                                                         </tbody>
//                                                     </table>
//                                                 </div>
//                                             </>
//                                         ) : (
//                                             <div className="text-center py-4">
//                                                 <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
//                                                 <p className="text-muted mb-0">No students enrolled in this class yet</p>
//                                             </div>
//                                         )}
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="text-center py-5">
//                     <i className="fas fa-book-open fa-4x text-muted mb-3"></i>
//                     <h4 className="text-muted">No Classes Assigned</h4>
//                     <p className="text-muted mb-0">You don't have any classes assigned yet. Please contact the administrator.</p>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyClassesWithStudents;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyClassesWithStudents } from "../../Redux/Actions/teacherAction";

const MyClassesWithStudents = () => {
    const dispatch = useDispatch();
    const { teacher, classes, loading, error } = useSelector((state) => state.teacherClasses || {});

    const [expandedClass, setExpandedClass] = useState(null);
    const [animateIn, setAnimateIn] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchMyClassesWithStudents());
        setTimeout(() => setAnimateIn(true), 100);
    }, [dispatch]);

    const toggleClassExpand = (classId) => {
        setExpandedClass(expandedClass === classId ? null : classId);
    };

    const getTotalStudents = () => {
        return classes?.reduce((total, cls) => total + (cls.students?.length || 0), 0) || 0;
    };

    const filterStudents = (students) => {
        if (!searchTerm) return students;
        return students.filter(student => 
            student.userId?.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.userId?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.roll?.toString().includes(searchTerm)
        );
    };

    if (loading) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <div className="spinner-grow text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="mt-4">
                        <h5 className="text-primary mb-2">Loading your classes...</h5>
                        <div className="progress mx-auto" style={{ width: "300px", height: "4px" }}>
                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary" 
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
                <button className="btn btn-primary btn-lg shadow" onClick={() => dispatch(fetchMyClassesWithStudents())}>
                    <i className="fas fa-redo me-2"></i>
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div className="container-fluid py-4 px-4" style={{ background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", minHeight: "100vh" }}>
            {/* Hero Section - Teacher Profile */}
            {teacher && (
                <div className={`card border-0 shadow-lg mb-4 overflow-hidden rounded-4 ${animateIn ? 'fade-in' : ''}`}>
                    <div className="position-relative" style={{ 
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        padding: "3rem 2rem"
                    }}>
                        {/* Decorative elements */}
                        <div className="position-absolute" style={{ 
                            width: "250px", height: "250px", 
                            background: "rgba(255,255,255,0.1)", 
                            borderRadius: "50%", 
                            top: "-80px", right: "-80px",
                            animation: "float 6s ease-in-out infinite"
                        }}></div>
                        <div className="position-absolute" style={{ 
                            width: "180px", height: "180px", 
                            background: "rgba(255,255,255,0.1)", 
                            borderRadius: "50%", 
                            bottom: "-50px", left: "15%",
                            animation: "float 8s ease-in-out infinite"
                        }}></div>
                        
                        <div className="row align-items-center position-relative">
                            <div className="col-lg-2 col-md-3 text-center mb-3 mb-md-0">
                                <div className="teacher-avatar-premium bg-white text-primary rounded-circle mx-auto d-flex align-items-center justify-content-center shadow-lg position-relative"
                                     style={{ width: "120px", height: "120px", fontSize: "3rem", fontWeight: "bold", border: "5px solid rgba(255,255,255,0.3)" }}>
                                    <i className="fas fa-chalkboard-teacher"></i>
                                    <div className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-white border-3"
                                         style={{ width: "30px", height: "30px" }}
                                         title="Online">
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-10 col-md-9 text-white">
                                <h1 className="display-6 mb-3 fw-bold">
                                    Welcome, {teacher.username}! 👨‍🏫
                                </h1>
                                <div className="row g-3">
                                    <div className="col-lg-4 col-md-6">
                                        <div className="d-flex align-items-center bg-white bg-opacity-10 rounded-3 p-3 backdrop-blur">
                                            <i className="fas fa-envelope fa-lg me-3"></i>
                                            <div>
                                                <small className="opacity-75">Email</small>
                                                <p className="mb-0 fw-semibold">{teacher.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="d-flex align-items-center bg-white bg-opacity-10 rounded-3 p-3 backdrop-blur">
                                            <i className="fas fa-book fa-lg me-3"></i>
                                            <div>
                                                <small className="opacity-75">Subject</small>
                                                <p className="mb-0 fw-semibold">{teacher.subject || "N/A"}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <div className="d-flex align-items-center bg-white bg-opacity-10 rounded-3 p-3 backdrop-blur">
                                            <i className="fas fa-user-tie fa-lg me-3"></i>
                                            <div>
                                                <small className="opacity-75">Role</small>
                                                <p className="mb-0 fw-semibold">{teacher.role || "Teacher"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Statistics Dashboard */}
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <div className={`card border-0 shadow-lg rounded-4 stat-card-teacher bg-gradient-primary text-white ${animateIn ? 'scale-in' : ''}`}
                         style={{ animationDelay: "0.2s" }}>
                        <div className="card-body p-4 text-center">
                            <div className="mb-3">
                                <i className="fas fa-school fa-3x"></i>
                            </div>
                            <h2 className="display-4 fw-bold mb-2">{classes?.length || 0}</h2>
                            <p className="mb-0 opacity-75">Total Classes</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`card border-0 shadow-lg rounded-4 stat-card-teacher bg-gradient-success text-white ${animateIn ? 'scale-in' : ''}`}
                         style={{ animationDelay: "0.3s" }}>
                        <div className="card-body p-4 text-center">
                            <div className="mb-3">
                                <i className="fas fa-users fa-3x"></i>
                            </div>
                            <h2 className="display-4 fw-bold mb-2">{getTotalStudents()}</h2>
                            <p className="mb-0 opacity-75">Total Students</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`card border-0 shadow-lg rounded-4 stat-card-teacher bg-gradient-warning text-white ${animateIn ? 'scale-in' : ''}`}
                         style={{ animationDelay: "0.4s" }}>
                        <div className="card-body p-4 text-center">
                            <div className="mb-3">
                                <i className="fas fa-book-reader fa-3x"></i>
                            </div>
                            <h2 className="display-4 fw-bold mb-2">{teacher?.subject ? 1 : 0}</h2>
                            <p className="mb-0 opacity-75">Subjects Teaching</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header with Search */}
            <div className={`card border-0 shadow-sm mb-4 rounded-4 ${animateIn ? 'slide-up' : ''}`} style={{ animationDelay: "0.5s" }}>
                <div className="card-body p-4">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h3 className="mb-0 fw-bold">
                                <i className="fas fa-graduation-cap me-2 text-primary"></i>
                                My Classes & Students
                            </h3>
                        </div>
                        <div className="col-md-6 mt-3 mt-md-0">
                            <div className="d-flex gap-2">
                                <div className="input-group">
                                    <span className="input-group-text bg-white border-end-0">
                                        <i className="fas fa-search text-muted"></i>
                                    </span>
                                    <input 
                                        type="text" 
                                        className="form-control border-start-0 ps-0" 
                                        placeholder="Search students..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                                <button className="btn btn-primary rounded-pill px-4" 
                                        onClick={() => dispatch(fetchMyClassesWithStudents())}>
                                    <i className="fas fa-sync-alt me-2"></i>
                                    Refresh
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Classes List */}
            {classes && classes.length > 0 ? (
                <div className="row g-4">
                    {classes.map((cls, index) => {
                        const filteredStudents = filterStudents(cls.students || []);
                        return (
                            <div className="col-12" key={cls._id}>
                                <div className={`card border-0 shadow-lg rounded-4 overflow-hidden class-card-premium ${animateIn ? 'slide-up' : ''}`}
                                     style={{ animationDelay: `${0.6 + index * 0.1}s` }}>
                                    {/* Class Header */}
                                    <div className="card-header bg-white border-0 p-4" 
                                         onClick={() => toggleClassExpand(cls._id)}
                                         style={{ cursor: "pointer" }}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <div className="class-number bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center me-3"
                                                     style={{ width: "60px", height: "60px", fontSize: "1.5rem", fontWeight: "bold" }}>
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <h4 className="mb-1 fw-bold">
                                                        {cls.className} - Section {cls.section}
                                                    </h4>
                                                    <div className="d-flex gap-3">
                                                        <span className="badge bg-primary-subtle text-primary">
                                                            <i className="fas fa-users me-1"></i>
                                                            {cls.students?.length || 0} Students
                                                        </span>
                                                        {searchTerm && filteredStudents.length !== cls.students?.length && (
                                                            <span className="badge bg-warning-subtle text-warning">
                                                                <i className="fas fa-filter me-1"></i>
                                                                {filteredStudents.length} Filtered
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <button className="btn btn-outline-primary rounded-circle" style={{ width: "45px", height: "45px" }}>
                                                    <i className={`fas fa-chevron-${expandedClass === cls._id ? 'up' : 'down'}`}></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Students List - Collapsible */}
                                    {expandedClass === cls._id && (
                                        <div className="card-body p-4 bg-light">
                                            {filteredStudents.length > 0 ? (
                                                <>
                                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                                        <h5 className="mb-0 text-primary fw-bold">
                                                            <i className="fas fa-user-graduate me-2"></i>
                                                            Students Enrolled
                                                        </h5>
                                                        <span className="badge bg-primary px-3 py-2">
                                                            {filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}
                                                        </span>
                                                    </div>
                                                    <div className="row g-3">
                                                        {filteredStudents.map((student, idx) => (
                                                            <div className="col-md-6" key={student._id}>
                                                                <div className="card border-0 shadow-sm student-card-hover h-100">
                                                                    <div className="card-body p-3">
                                                                        <div className="d-flex align-items-center">
                                                                            <div className="position-relative me-3">
                                                                                <div className="student-avatar-small bg-info text-white rounded-circle d-flex align-items-center justify-content-center"
                                                                                     style={{ width: "50px", height: "50px", fontSize: "1.2rem", fontWeight: "bold" }}>
                                                                                    {student.userId?.username?.charAt(0).toUpperCase() || "S"}
                                                                                </div>
                                                                                {/* <span className="position-absolute bottom-0 end-0 bg-success border border-white border-2 rounded-circle"
                                                                                      style={{ width: "15px", height: "15px" }}></span> */}
                                                                            </div>
                                                                            <div className="flex-grow-1">
                                                                                <h6 className="mb-1 fw-semibold">
                                                                                    {student.userId?.username || "Unknown"}
                                                                                </h6>
                                                                                <p className="mb-1 text-muted small">
                                                                                    <i className="fas fa-envelope me-1"></i>
                                                                                    {student.userId?.email || "N/A"}
                                                                                </p>
                                                                                <span className="badge bg-warning text-dark">
                                                                                    <i className="fas fa-hashtag me-1"></i>
                                                                                    Roll: {student.roll || "N/A"}
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-center py-5">
                                                    <i className="fas fa-search-minus fa-4x text-muted mb-3"></i>
                                                    <h5 className="text-muted">No students found</h5>
                                                    <p className="text-muted mb-0">Try adjusting your search filters</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className={`card border-0 shadow-lg rounded-4 ${animateIn ? 'fade-in' : ''}`}>
                    <div className="card-body text-center py-5">
                        <div className="empty-state-icon mb-4">
                            <i className="fas fa-book-open fa-5x text-muted"></i>
                        </div>
                        <h3 className="mb-3 fw-bold">No Classes Assigned Yet</h3>
                        <p className="text-muted mb-4 lead">
                            You don't have any classes assigned. Please contact the administrator.
                        </p>
                        <button className="btn btn-primary btn-lg rounded-pill px-5 shadow" 
                                onClick={() => dispatch(fetchMyClassesWithStudents())}>
                            <i className="fas fa-sync-alt me-2"></i>
                            Check Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyClassesWithStudents;