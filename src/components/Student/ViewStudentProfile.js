import React from 'react'

const ViewStudentProfile = ({ student, onClose }) => {
    return (
        <>
            <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-info text-white">
                            <h5 className="modal-title">
                                <i className="fas fa-user-graduate me-2"></i>
                                Student Profile
                            </h5>
                            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {/* Left Side - Profile Picture */}
                                <div className="col-md-4 text-center border-end">
                                    <div className="mb-3">
                                        {student.userId?.profileImage ? (
                                            <img
                                                src={student.userId.profileImage}
                                                alt={student.userId?.username}
                                                className="rounded-circle shadow"
                                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                            />
                                        ) : (
                                            <div
                                                className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center mx-auto shadow"
                                                style={{ width: "150px", height: "150px", fontSize: "4rem", fontWeight: "bold" }}
                                            >
                                                {student.userId?.username?.charAt(0).toUpperCase() || "S"}
                                            </div>
                                        )}
                                    </div>
                                    <h5 className="mb-2">{student.userId?.username || "Unknown Student"}</h5>
                                    <span className="badge bg-info text-white rounded-pill px-3 py-2">
                                        <i className="fas fa-user-graduate me-1"></i>
                                        STUDENT
                                    </span>
                                    <div className="mt-3">
                                        <span className="badge bg-warning text-dark px-3 py-2">
                                            <i className="fas fa-hashtag me-1"></i>
                                            Roll: {student.roll || "N/A"}
                                        </span>
                                    </div>
                                </div>

                                {/* Right Side - Student Details */}
                                <div className="col-md-8">
                                    <h6 className="text-info mb-3">
                                        <i className="fas fa-info-circle me-2"></i>
                                        Personal Information
                                    </h6>

                                    <div className="mb-3">
                                        <label className="text-muted small mb-1">
                                            <i className="fas fa-user me-2"></i>
                                            Full Name
                                        </label>
                                        <p className="fw-bold mb-0">{student.userId?.username || "N/A"}</p>
                                    </div>

                                    <div className="mb-3">
                                        <label className="text-muted small mb-1">
                                            <i className="fas fa-envelope me-2"></i>
                                            Email Address
                                        </label>
                                        <p className="fw-bold mb-0">{student.userId?.email || "N/A"}</p>
                                    </div>

                                    <div className="mb-3">
                                        <label className="text-muted small mb-1">
                                            <i className="fas fa-school me-2"></i>
                                            Class & Section
                                        </label>
                                        <p className="fw-bold mb-0">
                                            {student.classId ? (
                                                <span className="badge bg-success px-3 py-2">
                                                    {student.classId?.className || "N/A"} - Section {student.classId?.section || "N/A"}
                                                </span>
                                            ) : (
                                                <span className="badge bg-secondary px-3 py-2">
                                                    Not Assigned
                                                </span>
                                            )}
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <label className="text-muted small mb-1">
                                            <i className="fas fa-hashtag me-2"></i>
                                            Roll Number
                                        </label>
                                        <p className="fw-bold mb-0">
                                            <span className="badge bg-warning text-dark px-3 py-2">
                                                {student.roll || "N/A"}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <label className="text-muted small mb-1">
                                            <i className="fas fa-phone me-2"></i>
                                            Phone Number
                                        </label>
                                        <p className="fw-bold mb-0">{student.userId?.phone || "Not provided"}</p>
                                    </div>

                                    {student.guardian && (
                                        <div className="mb-3">
                                            <label className="text-muted small mb-1">
                                                <i className="fas fa-user-shield me-2"></i>
                                                Guardian Information
                                            </label>
                                            <div className="card bg-light p-2">
                                                <p className="mb-1">
                                                    <strong>Name:</strong> {student.guardian.name || "N/A"}
                                                </p>
                                                <p className="mb-1">
                                                    <strong>Contact:</strong> {student.guardian.contact || "N/A"}
                                                </p>
                                                <p className="mb-0">
                                                    <strong>Relation:</strong> {student.guardian.relation || "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <hr />

                                    <div className="row">
                                        <div className="col-6">
                                            <label className="text-muted small mb-1">
                                                <i className="fas fa-fingerprint me-2"></i>
                                                Student ID
                                            </label>
                                            <p className="small mb-0">{student._id || "N/A"}</p>
                                        </div>
                                        <div className="col-6">
                                            <label className="text-muted small mb-1">
                                                <i className="fas fa-calendar-alt me-2"></i>
                                                Enrolled Date
                                            </label>
                                            <p className="small mb-0">
                                                {student.createdAt
                                                    ? new Date(student.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })
                                                    : "N/A"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                <i className="fas fa-times me-2"></i>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ViewStudentProfile
