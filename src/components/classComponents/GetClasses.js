import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses, createClass, updateClass, deleteClass } from "../../Redux/Actions/classAction";
import { assignTeacherToClass, removeTeacherFromClass, fetchAllTeachers } from "../../Redux/Actions/teacherAction";
import { assignStudentToClass, removeStudentFromClass, fetchAllStudents } from "../../Redux/Actions/studentAction";

const ClassList = () => {

    // --------------------------------
    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);


    const dispatch = useDispatch();
    const { classes, loading, error, loading: classLoading } = useSelector((state) => state.classes || {});
    const { teachers, loading: teacherLoading } = useSelector((state) => state.teachers || {});
    const { students, loading: studentLoading } = useSelector((state) => state.students || {});

    const [className, setClassName] = useState("");
    const [section, setSection] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [editData, setEditData] = useState({ id: "", className: "", section: "" });

    const [deleteId, setDeleteId] = useState("");

    useEffect(() => {
        dispatch(fetchAllTeachers());
        dispatch(fetchClasses());
    }, [dispatch]);

    // Add Modal Functions
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setClassName("");
        setSection("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createClass({ className, section }));
        handleCloseModal();
    };

    // Edit Modal Functions
    const handleOpenEditModal = (cls) => {
        setEditData({
            id: cls._id,
            className: cls.className,
            section: cls.section
        });
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setEditData({ id: "", className: "", section: "" });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        dispatch(updateClass(editData.id, {
            className: editData.className,
            section: editData.section
        }));
        handleCloseEditModal();
    };

    // Delete Modal Functions
    const handleOpenDeleteModal = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setDeleteId("");
    };

    const handleDeleteConfirm = () => {
        dispatch(deleteClass(deleteId));
        handleCloseDeleteModal();
    };

    // ----------------------- class assign to teacher

    const [showModalAssTeachToCls, setShowModalAssTeachToCls] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        teacherId: "",
        classId: "",
    });

    // Fetch teachers and classes when modal opens
    useEffect(() => {
        if (showModalAssTeachToCls) {
            dispatch(fetchAllTeachers());
            // dispatch(fetchClasses());
        }
    }, [dispatch, showModalAssTeachToCls]);

    // Input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAssTeachToClsSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await dispatch(assignTeacherToClass(formData.teacherId, formData.classId));

            //
            setPopupMessage(res?.message || "Teacher assigned successfully!");
            setShowPopup(true);

            // 3 second
            setTimeout(() => setShowPopup(false), 3000);

            // Modal close & data refresh
            setShowModalAssTeachToCls(false);
            dispatch(fetchClasses());
        } catch (err) {
            setPopupMessage(err.message || "Failed to assign teacher!");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        }
    };

    // -------------------------- remove teacher to class

    const handleTeachRemove = (classId, teacherId) => {
        const confirmRemove = window.confirm(
            `Do you want to remove the teacher from this class?`
        );
        if (confirmRemove) {
            dispatch(removeTeacherFromClass(classId, teacherId));
        }
    };

    // -------------------------- remove student from class

    const handleStuRemove = async (studentId, classId) => {
        if (window.confirm("Remove this student from class?")) {
            const result = await dispatch(removeStudentFromClass(studentId, classId));

            if (result.success) {
                // alert(result.message);
                dispatch(fetchClasses()); // Refresh updated list
            } else {
                alert(`Error: ${result.message}`);
            }
        }
    };

    // --------------------------- Assign Student to Class

    const [showModalAssStuToCls, setShowModalAssStuToCls] = useState(false);

    // Form state
    const [formData1, setFormData1] = useState({
        studentId: "",
        classId: "",
    });

    // Fetch students and classes when modal opens
    useEffect(() => {
        if (showModalAssStuToCls) {
            dispatch(fetchAllStudents());
            // dispatch(fetchClasses());
        }
    }, [dispatch, showModalAssStuToCls]);

    // Input change
    const handleInputChange1 = (e) => {
        const { name, value } = e.target;
        setFormData1((prev) => ({ ...prev, [name]: value }));
    };

    const handleAssStuToClsSubmit = async (e) => {
        e.preventDefault();

        const res = await dispatch(assignStudentToClass(formData1.studentId, formData1.classId));


        if (res && res.success) {
            setPopupMessage(res.message);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);

            setShowModalAssStuToCls(false);
            setFormData1({ studentId: "", classId: "" });
            dispatch(fetchClasses());
            dispatch(fetchAllStudents());
        } else {
            setPopupMessage(res?.message || "Failed to assign student!");
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        }
    };

    // ---------------------------------------------------



    if (loading) {
        return (
            <div className="container py-5">
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading classes...</p>
                </div>
            </div>
        );
    }

    // if (error) {
    //     return (
    //         <div className="container py-5">
    //             <div className="alert alert-danger d-flex align-items-center" role="alert">
    //                 <div>
    //                     <h5 className="mb-1">Oops! Something went wrong</h5> <br />
    //                     <i className="fas fa-exclamation-triangle me-2"></i>
    //                     <strong>Error:</strong> {error}
    //                 </div>
    //             </div>
    //             <button className="btn btn-primary btn-lg shadow" onClick={() => dispatch(fetchClasses())}>
    //                 <i className="fas fa-redo me-2"></i>
    //                 Try Again
    //             </button>
    //         </div>
    //     );
    // }

    return (
        <div className="container py-4">
            {/* Page Header */}
            <div className="page-header mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h2 className="mb-1">
                            <i className="fas fa-book-open me-2 text-primary"></i>
                            All Classes
                        </h2>
                        <p className="text-muted mb-0">
                            Total Classes: <span className="badge bg-primary">{classes?.length || 0}</span>
                        </p>
                    </div>
                    <button className="btn btn-primary" onClick={handleOpenModal}>
                        <i className="fas fa-plus me-2"></i>
                        Add New Class
                    </button>
                </div>
            </div>

            {/* Classes List */}
            {classes && classes.length > 0 ? (
                <div className="row g-4">
                    {classes.map((cls) => (
                        <div className="col-12" key={cls._id}>
                            <div className="card class-card shadow-sm">
                                {/* Card Header */}
                                <div className="card-header bg-gradient-primary text-white">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="mb-0">
                                            <i className="fas fa-graduation-cap me-2"></i>
                                            {cls.className} - Section {cls.section}
                                        </h5>
                                        <div className="btn-group">
                                            <button className="btn btn-sm btn-light" title="Edit" onClick={() => handleOpenEditModal(cls)}>
                                                <i className="fas fa-edit"></i>
                                            </button>
                                            <button className="btn btn-sm btn-light ms-1" title="Delete" onClick={() => handleOpenDeleteModal(cls._id)}>
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Body */}
                                <div className="card-body">
                                    {/* Class Info */}
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <p className="mb-2">
                                                <strong><i className="fas fa-id-badge me-2 text-muted"></i>Class ID:</strong>
                                                <span className="text-muted ms-2">{cls._id}</span>
                                            </p>
                                        </div>
                                        <div className="col-md-6">
                                            <p className="mb-2">
                                                <strong><i className="fas fa-book me-2 text-muted"></i>Subjects:</strong>
                                                <span className="ms-2">
                                                    {cls.subjects && cls.subjects.length > 0 ? (
                                                        cls.subjects.map((subject, idx) => (
                                                            <span key={idx} className="badge bg-info text-dark me-1">
                                                                {subject}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-muted">N/A</span>
                                                    )}
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Teachers Section */}
                                    <div className="section-container mb-4">
                                        <h6 className="section-title">
                                            <i className="fas fa-chalkboard-teacher me-2"></i>
                                            Teachers
                                            {cls.teachers && cls.teachers.length > 0 && (
                                                <span className="badge bg-success ms-2">{cls.teachers.length}</span>
                                            )}
                                        </h6>
                                        {cls.teachers && cls.teachers.length > 0 ? (
                                            <div className="list-group list-group-flush">
                                                {cls.teachers.map((teacher) => (
                                                    <div key={teacher._id} className="list-group-item border-0 px-0 d-flex justify-content-between align-items-end px-2">
                                                        <div className="d-flex align-items-center">
                                                            <div className="avatar-circle bg-primary me-3">
                                                                <i className="fas fa-user"></i>
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-0">{teacher.userId?.username || "Unknown"}</h6>
                                                                <small className="text-muted">
                                                                    <i className="fas fa-envelope me-1"></i>
                                                                    {teacher.userId?.email || "N/A"}
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => handleTeachRemove(cls._id, teacher._id)}
                                                            className="btn btn-outline-warning btn-sm"
                                                        >
                                                            <i className="fas fa-chalkboard-teacher me-1"></i> Remove
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="alert alert-warning mb-0">
                                                <i className="fas fa-info-circle me-2"></i>
                                                No teachers assigned to this class
                                            </div>
                                        )}
                                    </div>

                                    {/* Students Section */}
                                    <div className="section-container">
                                        <h6 className="section-title">
                                            <i className="fas fa-user-graduate me-2"></i>
                                            Students
                                            {cls.students && cls.students.length > 0 && (
                                                <span className="badge bg-info ms-2">{cls.students.length}</span>
                                            )}
                                        </h6>
                                        {cls.students && cls.students.length > 0 ? (
                                            <div className="table-responsive">
                                                <table className="table table-hover">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th>Roll No.</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {cls.students.map((student, index) => (
                                                            <tr key={index}>
                                                                <td>
                                                                    <span className="badge bg-secondary">
                                                                        {student.roll || "N/A"}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="avatar-circle-sm bg-info me-2">
                                                                            {student.userId?.username?.charAt(0).toUpperCase() || "?"}
                                                                        </div>
                                                                        {student.userId?.username || "Unknown"}
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <small className="text-muted">
                                                                        {student.userId?.email || "N/A"}
                                                                    </small>
                                                                </td>
                                                                <td className="d-flex justify-content-end">
                                                                    <button
                                                                        onClick={() => handleStuRemove(cls._id, student._id)}
                                                                        className="btn btn-outline-info btn-sm"
                                                                    >
                                                                        <i className="fas fa-user-graduate me-2"></i>Remove
                                                                    </button>

                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <div className="alert alert-warning mb-0">
                                                <i className="fas fa-info-circle me-2"></i>
                                                No students enrolled in this class
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="card-footer bg-light">
                                    <div className="row text-muted small">
                                        <div className="col-md-6">
                                            <i className="fas fa-calendar-plus me-1"></i>
                                            <strong>Created:</strong> {new Date(cls.createdAt).toLocaleString()}
                                        </div>
                                        <div className="col-md-6 text-md-end">
                                            <i className="fas fa-calendar-check me-1"></i>
                                            <strong>Updated:</strong> {new Date(cls.updatedAt).toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="empty-state text-center py-5">
                    <i className="fas fa-inbox fa-4x text-muted mb-3"></i>
                    <h4 className="text-danger">{error}</h4>
                    <p className="text-muted mb-4">Start by creating your first class</p>
                    <button className="btn btn-primary" onClick={handleOpenModal}>
                        <i className="fas fa-plus me-2"></i>
                        Create New Class
                    </button>
                </div>
            )}

            {/* Add Class Modal */}
            {showModal && (
                <>
                    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        <i className="fas fa-plus-circle me-2 text-primary"></i>
                                        Add New Class
                                    </h5>
                                    <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="className" className="form-label">
                                            <i className="fas fa-book me-2"></i>
                                            Class Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="className"
                                            name="className"
                                            value={className}
                                            onChange={(e) => setClassName(e.target.value)}
                                            placeholder="Enter class name (e.g., 10th Grade)"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="section" className="form-label">
                                            <i className="fas fa-layer-group me-2"></i>
                                            Section <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="section"
                                            name="section"
                                            value={section}
                                            onChange={(e) => setSection(e.target.value)}
                                            placeholder="Enter section (e.g., A, B, C)"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                        <i className="fas fa-times me-2"></i>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                        <i className="fas fa-save me-2"></i>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Edit Class Modal */}
            {showEditModal && (
                <>
                    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        <i className="fas fa-edit me-2 text-warning"></i>
                                        Edit Class
                                    </h5>
                                    <button type="button" className="btn-close" onClick={handleCloseEditModal}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="editClassName" className="form-label">
                                            <i className="fas fa-book me-2"></i>
                                            Class Name <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editClassName"
                                            name="className"
                                            value={editData.className}
                                            onChange={(e) => setEditData({ ...editData, className: e.target.value })}
                                            placeholder="Enter class name (e.g., 10th Grade)"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editSection" className="form-label">
                                            <i className="fas fa-layer-group me-2"></i>
                                            Section <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="editSection"
                                            name="section"
                                            value={editData.section}
                                            onChange={(e) => setEditData({ ...editData, section: e.target.value })}
                                            placeholder="Enter section (e.g., A, B, C)"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseEditModal}>
                                        <i className="fas fa-times me-2"></i>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-warning" onClick={handleEditSubmit}>
                                        <i className="fas fa-save me-2"></i>
                                        Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <>
                    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-danger text-white">
                                    <h5 className="modal-title">
                                        <i className="fas fa-exclamation-triangle me-2"></i>
                                        Confirm Delete
                                    </h5>
                                    <button type="button" className="btn-close btn-close-white" onClick={handleCloseDeleteModal}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="text-center py-3">
                                        <i className="fas fa-trash-alt fa-3x text-danger mb-3"></i>
                                        <h5>Are you sure you want to delete this class?</h5>
                                        <p className="text-muted">
                                            This action cannot be undone. All data associated with this class will be permanently deleted.
                                        </p>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteModal}>
                                        <i className="fas fa-times me-2"></i>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>
                                        <i className="fas fa-trash me-2"></i>
                                        Yes, Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <button
                className="assign-btn btn btn-warning shadow d-flex align-items-center justify-content-center"
                style={{
                    bottom: "6.5rem"
                }}
                onClick={() => setShowModalAssTeachToCls(true)}
            >
                <i className="fas fa-user-plus"></i>
                <span className="assign-text ms-2">Assign Teacher</span>
            </button>

            {/* Assign Teacher To Class Modal */}
            {showModalAssTeachToCls && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Assign Teacher to Class</h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() => setShowModalAssTeachToCls(false)}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={handleAssTeachToClsSubmit}>
                                    {/* Teacher Dropdown */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Select Teacher</label>
                                        <select
                                            className="form-select"
                                            id="teacherId"
                                            name="teacherId"
                                            value={formData.teacherId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">-- Select a Teacher --</option>
                                            {teacherLoading ? (
                                                <option disabled>Loading teachers...</option>
                                            ) : (
                                                teachers &&
                                                teachers.map((teacher) => (
                                                    <option key={teacher._id} value={teacher._id}>
                                                        {teacher.userId.username} ({teacher.userId.email})
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                    </div>

                                    {/* Class Dropdown */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Select Class</label>
                                        <select
                                            className="form-select"
                                            id="classId"
                                            name="classId"
                                            value={formData.classId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">-- Select a Class --</option>
                                            {classLoading ? (
                                                <option disabled>Loading classes...</option>
                                            ) : (
                                                classes &&
                                                classes.map((cls) => (
                                                    <option key={cls._id} value={cls._id}>
                                                        {cls.className} - Section ({cls.section})
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                    </div>

                                    <div className="text-end">
                                        <button
                                            type="button"
                                            className="btn btn-secondary me-2"
                                            onClick={() => setShowModalAssTeachToCls(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Assign
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showPopup && (
                <div
                    className="alert alert-success position-fixed top-0 translate-middle-x mt-3 shadow"
                    style={{ zIndex: 2000, width: "400px", right: "-10%" }}
                >
                    {popupMessage}
                </div>
            )}

            {/* ------------ */}
            <button
                className="assign-btn btn btn-info shadow d-flex align-items-center justify-content-center"
                onClick={() => setShowModalAssStuToCls(true)}
            >
                <i className="fas fa-user-plus"></i>
                <span className="assign-text ms-2">Assign Student</span>
            </button>

            {showModalAssStuToCls && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title">Assign Student to Class</h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white"
                                    onClick={() => setShowModalAssStuToCls(false)}
                                ></button>
                            </div>

                            <div className="modal-body">
                                <form onSubmit={handleAssStuToClsSubmit}>
                                    {/* Student Dropdown */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Select Student</label>
                                        <select
                                            className="form-select"
                                            id="studentId"
                                            name="studentId"
                                            value={formData1.studentId}
                                            onChange={handleInputChange1}
                                            required
                                        >
                                            <option value="">-- Select a Student --</option>
                                            {studentLoading ? (
                                                <option disabled>Loading students...</option>
                                            ) : (
                                                students && students
                                                    .filter((student) => !student.classId)
                                                    .map((student) => (
                                                        <option key={student._id} value={student._id}>
                                                            {student.userId.username} ({student.userId.email})
                                                        </option>
                                                    ))
                                            )}
                                        </select>
                                    </div>

                                    {/* Class Dropdown */}
                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Select Class</label>
                                        <select
                                            className="form-select"
                                            id="classId"
                                            name="classId"
                                            value={formData1.classId}
                                            onChange={handleInputChange1}
                                            required
                                        >
                                            <option value="">-- Select a Class --</option>
                                            {classLoading ? (
                                                <option disabled>Loading classes...</option>
                                            ) : (
                                                classes &&
                                                classes.map((cls) => (
                                                    <option key={cls._id} value={cls._id}>
                                                        {cls.className} - Section ({cls.section})
                                                    </option>
                                                ))
                                            )}
                                        </select>
                                    </div>

                                    <div className="text-end">
                                        <button
                                            type="button"
                                            className="btn btn-secondary me-2"
                                            onClick={() => setShowModalAssStuToCls(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button type="submit" className="btn btn-primary">
                                            Assign
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            )}

        </div>
    );
};

export default ClassList;

