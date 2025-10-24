import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStudent, fetchAllStudents } from "../../Redux/Actions/studentAction";

const CreateStudent = ({ show, onClose, users, students, classes, showToast }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.students);

    const [createFormData, setCreateFormData] = useState({
        userId: "",
        classId: "",
        guardian: {
            name: "",
            contact: "",
            relation: ""
        }
    });

    const [validationErrors, setValidationErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith("guardian.")) {
            const field = name.split(".")[1];
            setCreateFormData((prev) => ({
                ...prev,
                guardian: {
                    ...prev.guardian,
                    [field]: value,
                },
            }));
        } else {
            setCreateFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }

        if (validationErrors[name]) {
            setValidationErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!createFormData.userId) errors.userId = "Please select a user";
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const result = await dispatch(createStudent(createFormData));

        if (result && result.status === "success") {
            showToast(result.message || "Student added successfully!", "success");
            onClose();
            dispatch(fetchAllStudents());
        } else {
            showToast(result?.message || "Failed to add student", "danger");
        }
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-info text-white">
                        <h5 className="modal-title">
                            <i className="fas fa-plus-circle me-2"></i>
                            Create New Student
                        </h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>

                    <form onSubmit={handleCreateSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="userId" className="form-label">
                                    <i className="fas fa-user me-2"></i>
                                    Select User <span className="text-danger">*</span>
                                </label>
                                <select
                                    className={`form-select ${validationErrors.userId ? "is-invalid" : ""}`}
                                    id="userId"
                                    name="userId"
                                    value={createFormData.userId}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">-- Select a User --</option>
                                    {users
                                        ?.filter((user) => user.role === "Student")
                                        ?.filter(
                                            (user) =>
                                                !students.some((stu) => stu.userId?._id === user._id)
                                        )
                                        ?.map((user) => (
                                            <option key={user._id} value={user._id}>
                                                {user.username} ({user.email})
                                            </option>
                                        ))}
                                </select>
                                {validationErrors.userId && (
                                    <div className="invalid-feedback">{validationErrors.userId}</div>
                                )}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="classId" className="form-label">
                                    <i className="fas fa-school me-2"></i>
                                    Select Class (Optional)
                                </label>
                                <select
                                    className="form-select"
                                    id="classId"
                                    name="classId"
                                    value={createFormData.classId}
                                    onChange={handleInputChange}
                                >
                                    <option value="">-- No Class (Assign Later) --</option>
                                    {classes &&
                                        classes.map((cls) => (
                                            <option key={cls._id} value={cls._id}>
                                                {cls.className} - Section {cls.section}
                                            </option>
                                        ))}
                                </select>
                            </div>

                            {/* Guardian Info */}
                            <div className="mb-3">
                                <label className="form-label">
                                    <i className="fas fa-user-shield me-2"></i>
                                    Guardian Information (Optional)
                                </label>

                                <div className="card bg-light p-3">
                                    <div className="mb-2">
                                        <label htmlFor="guardian.name" className="form-label small">
                                            Guardian Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="guardian.name"
                                            name="guardian.name"
                                            value={createFormData.guardian.name}
                                            onChange={handleInputChange}
                                            placeholder="Enter guardian name"
                                        />
                                    </div>

                                    <div className="mb-2">
                                        <label htmlFor="guardian.contact" className="form-label small">
                                            Contact Number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            id="guardian.contact"
                                            name="guardian.contact"
                                            value={createFormData.guardian.contact}
                                            onChange={handleInputChange}
                                            placeholder="Enter contact number"
                                        />
                                    </div>

                                    <div className="mb-0">
                                        <label htmlFor="guardian.relation" className="form-label small">
                                            Relation
                                        </label>
                                        <select
                                            className="form-select form-select-sm"
                                            id="guardian.relation"
                                            name="guardian.relation"
                                            value={createFormData.guardian.relation}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">-- Select Relation --</option>
                                            <option value="Father">Father</option>
                                            <option value="Mother">Mother</option>
                                            <option value="Uncle">Uncle</option>
                                            <option value="Aunt">Aunt</option>
                                            <option value="Grandfather">Grandfather</option>
                                            <option value="Grandmother">Grandmother</option>
                                            <option value="Brother">Brother</option>
                                            <option value="Sister">Sister</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="alert alert-info">
                                <i className="fas fa-info-circle me-2"></i>
                                Roll number will be auto-generated
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>
                                <i className="fas fa-times me-2"></i> Cancel
                            </button>
                            <button type="submit" className="btn btn-info text-white" disabled={loading}>
                                {loading ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                            aria-hidden="true"
                                        ></span>
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-save me-2"></i> Create Student
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateStudent;
