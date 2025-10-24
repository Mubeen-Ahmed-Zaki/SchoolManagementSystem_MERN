const AdminViewTeacherProfile = ({ teacher, onClose }) => {
    if (!teacher) return null;

    return (
        <>

            {/* View Profile Modal */}
            <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-success text-white">
                            <h5 className="modal-title">
                                <i className="fas fa-chalkboard-teacher me-2"></i>
                                Teacher Profile
                            </h5>
                            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {/* Left Side - Profile Picture */}
                                <div className="col-md-4 text-center border-end">
                                    <div className="mb-3">
                                        {teacher.userId?.profileImage ? (
                                            <img
                                                src={teacher.userId.profileImage}
                                                alt={teacher.userId?.username}
                                                className="rounded-circle shadow"
                                                style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                            />
                                        ) : (
                                            <div
                                                className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center mx-auto shadow"
                                                style={{ width: "150px", height: "150px", fontSize: "4rem", fontWeight: "bold" }}
                                            >
                                                {teacher.userId?.username?.charAt(0).toUpperCase() || "T"}
                                            </div>
                                        )}
                                    </div>
                                    <h5 className="mb-2">{teacher.userId?.username || "Unknown Teacher"}</h5>
                                    <span className="badge bg-warning text-dark rounded-pill px-3 py-2">
                                        <i className="fas fa-chalkboard-teacher me-1"></i>
                                        TEACHER
                                    </span>
                                </div>

                                {/* Right Side - Teacher Details */}
                                <div className="col-md-8">
                                    <h6 className="text-success mb-3">
                                        <i className="fas fa-info-circle me-2"></i>
                                        Personal Information
                                    </h6>

                                    <div className="mb-3">
                                        <label className="text-muted small mb-1">
                                            <i className="fas fa-user me-2"></i>
                                            Full Name
                                        </label>
                                        <p className="fw-bold mb-0">{teacher.userId?.username || "N/A"}</p>
                                    </div>

                                    <div className="mb-3">
                                        <label className="text-muted small mb-1">
                                            <i className="fas fa-envelope me-2"></i>
                                            Email Address
                                        </label>
                                        <p className="fw-bold mb-0">{teacher.userId?.email || "N/A"}</p>
                                    </div>

                                    <div className="mb-3">
                                        <label className="text-muted small mb-1">
                                            <i className="fas fa-book me-2"></i>
                                            Subject
                                        </label>
                                        <p className="fw-bold mb-0">
                                            <span className="badge bg-info text-dark px-3 py-2">
                                                {teacher.subject || "N/A"}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="mb-3">
                                        <label className="text-muted small mb-1">
                                            <i className="fas fa-phone me-2"></i>
                                            Phone Number
                                        </label>
                                        <p className="fw-bold mb-0">{teacher.userId?.phone || "Not provided"}</p>
                                    </div>

                                    <hr />

                                    <div className="row">
                                        <div className="col-6">
                                            <label className="text-muted small mb-1">
                                                <i className="fas fa-fingerprint me-2"></i>
                                                Teacher ID
                                            </label>
                                            <p className="small mb-0">{teacher._id || "N/A"}</p>
                                        </div>
                                        <div className="col-6">
                                            <label className="text-muted small mb-1">
                                                <i className="fas fa-calendar-alt me-2"></i>
                                                Joined Date
                                            </label>
                                            <p className="small mb-0">
                                                {teacher.createdAt
                                                    ? new Date(teacher.createdAt).toLocaleDateString('en-US', {
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

export default AdminViewTeacherProfile