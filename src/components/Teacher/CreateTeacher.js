import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  createTeacher } from "../../Redux/Actions/teacherAction";
// import { fetchAllUsers } from "../../Redux/Actions/userAction";

const CreateTeacher = () => {
    const dispatch = useDispatch();
    // const { teachers, loading, error } = useSelector((state) => state.teachers);
    const { users } = useSelector((state) => state.userList);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const [createFormData, setCreateFormData] = useState({
        subject: "",
        userId: ""
    });

    const handleOpenCreateModal = () => {
        setShowCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
        setCreateFormData({ subject: "", userId: "" });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCreateFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        dispatch(createTeacher(createFormData));
        handleCloseCreateModal();
    };
    return (
        <>

            <button className="btn btn-success" onClick={handleOpenCreateModal}>
                <i className="fas fa-plus me-2"></i>
                Create Teacher
            </button>

            {/* Create Teacher Modal */}
            {showCreateModal && (
                <>
                    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-success text-white">
                                    <h5 className="modal-title">
                                        <i className="fas fa-plus-circle me-2"></i>
                                        Create New Teacher
                                    </h5>
                                    <button type="button" className="btn-close btn-close-white" onClick={handleCloseCreateModal}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label htmlFor="subject" className="form-label d-flex align-items-center">
                                            <i className="fas fa-book me-2"></i>
                                            Subject <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="subject"
                                            name="subject"
                                            value={createFormData.subject}
                                            onChange={handleInputChange}
                                            placeholder="Enter subject (e.g., Mathematics, English)"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="userId" className="form-label d-flex align-items-center">
                                            <i className="fas fa-user me-2"></i>
                                            Select User <span className="text-danger">*</span>
                                        </label>
                                        <select
                                            className="form-select"
                                            id="userId"
                                            name="userId"
                                            value={createFormData.userId}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">-- Select a User --</option>
                                            {users && users
                                                .filter((user) => user.role === "Teacher")
                                                .map((user) => (
                                                    <option key={user._id} value={user._id}>
                                                        {user.username} ({user.email})
                                                    </option>
                                                ))}
                                        </select>
                                        <small className="text-muted">
                                            <i className="fas fa-info-circle me-1"></i>
                                            Select a user to assign as teacher
                                        </small>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseCreateModal}>
                                        <i className="fas fa-times me-2"></i>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-success" onClick={handleCreateSubmit}>
                                        <i className="fas fa-save me-2"></i>
                                        Create Teacher
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

        </>
    )
}

export default CreateTeacher
