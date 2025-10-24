import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudents, deleteStudent } from "../../Redux/Actions/studentAction";
import { fetchAllUsers } from "../../Redux/Actions/userAction";
import { fetchClasses } from "../../Redux/Actions/classAction";
import ViewStudentProfile from "./ViewStudentProfile";
import CreateStudent from "./CreateStudent";

const Students = () => {
    const dispatch = useDispatch();
    const { students, loading, error } = useSelector((state) => state.students);
    const { users } = useSelector((state) => state.userList);
    const { classes } = useSelector((state) => state.classes);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "", type: "" });

    const showToast = (message, type = "success") => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    };

    useEffect(() => {
        dispatch(fetchAllStudents());
        dispatch(fetchAllUsers());
        dispatch(fetchClasses());
    }, [dispatch]);

    // ------------------ Delete
    const handleDelete = async (studentId) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            const result = await dispatch(deleteStudent(studentId));

            if (result.success) {
                showToast(result.message, "success");
                dispatch(fetchAllStudents());
            } else {
                showToast(result.message || "Error deleting student", "danger");
            }
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }}></div>
                <p className="mt-3 text-muted">Loading students...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-danger">
                    <strong>Error:</strong> {error}
                </div>
                <button className="btn btn-primary" onClick={() => dispatch(fetchAllStudents())}>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="container py-4">
            {/* Toast Notification */}
            <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
                <div className={`toast ${toast.show ? "show" : ""}`} role="alert">
                    {/* <div className={`toast-header bg-${toast.type} text-white d-none`}>
                        <strong className="me-auto">
                            {toast.type === "success" ? "Success" : "Error"}
                        </strong>
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            onClick={() => setToast({ show: false, message: "", type: "" })}
                        ></button>
                    </div> */}
                    <div className={`toast-body bg-${toast.type} text-white position-relative`}>{toast.message}
                        <button
                            type="button"
                            className="btn-close btn-close-white position-absolute"
                            style={{right:"10px"}}
                            onClick={() => setToast({ show: false, message: "", type: "" })}
                        ></button>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="page-header mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h2 className="mb-1">
                            <i className="fas fa-user-graduate me-2 text-primary"></i> All Students </h2>
                        <p className="text-muted mb-0"> Total Students:
                            <span className="badge bg-primary">{students?.length || 0}</span>
                        </p>
                    </div>
                    <button className="btn btn-info text-white" onClick={() => setShowCreateModal(true)}>
                        <i className="fas fa-plus me-2"></i> Create Student
                    </button>
                </div>
            </div>

            {/* Students Table */}
            {students && students.length > 0 ? (
                <div className="card shadow-sm">
                    <div className="table-responsive">
                        <table className="table table-hover table-striped mb-0">
                            <thead className="table-info">
                                <tr>
                                    <th className="text-center" style={{ width: "80px" }}>Sr#</th>
                                    <th>Student Name</th>
                                    <th className="text-center">Roll No</th>
                                    <th>Class</th>
                                    <th className="text-center" colSpan={2}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student, index) => (
                                    <tr key={student._id}>
                                        <td className="text-center align-middle">
                                            <span className="badge bg-secondary">{index + 1}</span>
                                        </td>
                                        <td className="align-middle">
                                            <div className="d-flex align-items-center">
                                                <div className="me-3">
                                                    {student.userId?.profileImage ? (
                                                        <img
                                                            src={student.userId.profileImage}
                                                            alt={student.userId.username}
                                                            className="rounded-circle"
                                                            style={{ width: "40px", height: "40px", objectFit: "cover" }}
                                                        />
                                                    ) : (
                                                        <div
                                                            className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center"
                                                            style={{ width: "40px", height: "40px", fontSize: "1.2rem" }}
                                                        >
                                                            {student.userId?.username?.charAt(0).toUpperCase() || "S"}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h6 className="mb-0">
                                                        {student.userId?.username || "Unknown"}
                                                    </h6>
                                                    <small className="text-muted">
                                                        <i className="fas fa-envelope me-1"></i>
                                                        {student.userId?.email || "N/A"}
                                                    </small>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center align-middle">
                                            <span className="badge bg-warning text-dark">
                                                {student.roll || "N/A"}
                                            </span>
                                        </td>
                                        <td className="align-middle">
                                            {student.classId ? (
                                                <span className="badge bg-success">
                                                    <i className="fas fa-chalkboard me-1"></i>
                                                    {student.classId.className} - Section {student.classId.section}
                                                </span>
                                            ) : (
                                                <span className="badge bg-secondary">Not Assigned</span>
                                            )}
                                        </td>
                                        <td className="text-center align-middle">
                                            <button
                                                className="btn btn-sm btn-primary me-1"
                                                onClick={() => setSelectedStudent(student)}
                                            >
                                                <i className="fas fa-eye me-1"></i>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(student._id)}
                                                className="btn btn-outline-danger btn-sm"
                                            >
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="text-center py-5">
                    <i className="fas fa-user-slash fa-4x text-muted mb-3"></i>
                    <h4 className="text-muted">No Students Found</h4>
                    <button
                        className="btn btn-info text-white"
                        onClick={() => setShowCreateModal(true)}
                    >
                        <i className="fas fa-plus me-2"></i>Create Student
                    </button>
                </div>
            )}

            {/* Profile Modal */}
            {selectedStudent && (
                <ViewStudentProfile
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                />
            )}

            {/* Create Student Modal */}
            {showCreateModal && (
                <CreateStudent
                    show={showCreateModal}
                    onClose={() => setShowCreateModal(false)}
                    users={users}
                    students={students}
                    classes={classes}
                    dispatch={dispatch}
                    fetchAllStudents={fetchAllStudents}
                    showToast={showToast}
                />
            )}
        </div>
    );
};

export default Students;