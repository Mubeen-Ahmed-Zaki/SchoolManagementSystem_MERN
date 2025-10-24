import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, updateUserRole } from "../../Redux/Actions/userAction";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading, error, success } = useSelector((state) => state.userList);

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const [popupMessage, setPopupMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleClosePopup = () => setShowPopup(false);


  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch, success]);

  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setSelectedRole(user.role || "student");
    setShowProfileModal(true);
  };

  const handleCloseModal = () => {
    setShowProfileModal(false);
    setSelectedUser(null);
    setSelectedRole("");
  };

  const handleUpdateRole = async () => {
    if (selectedUser && selectedRole) {
      try {
        const msg = await dispatch(updateUserRole(selectedUser._id, selectedRole));
        setPopupMessage(msg);
        setShowPopup(true);
        dispatch(fetchAllUsers());
        handleCloseModal();
      } catch (err) {
        setPopupMessage(err.message || "Failed to update role");
        setShowPopup(true);
      }
    }
  };



  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };


  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <i className="fas fa-exclamation-triangle me-2"></i>
          <div>
            <strong>Error:</strong> {error}
          </div>
        </div>
      </div>
    );
  }

  return (


    <div className="container py-4">
      {/* Page Header */}
      <div className="page-header mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h2 className="mb-1">
              <i className="fas fa-users me-2 text-primary"></i>
              All Users
            </h2>
            <p className="text-muted mb-0">
              Total Users: <span className="badge bg-primary">{users?.length || 0}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Notification</h5>
                <button type="button" className="btn-close" onClick={handleClosePopup}></button>
              </div>
              <div className="modal-body">
                <p>{popupMessage}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleClosePopup}>OK</button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Users Table */}
      {users && users.length > 0 ? (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead className="table-primary">
                  <tr>
                    <th className="text-center" style={{ width: "80px" }}>Sr#</th>
                    <th>Name</th>
                    <th className="text-center">Role</th>
                    <th className="text-center" style={{ width: "200px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id}>
                      <td className="text-center align-middle">
                        <span className="badge bg-secondary">{index + 1}</span>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div className="me-3">
                            {user.profileImage ? (
                              <img
                                src={user.profileImage}
                                alt={user.username}
                                className="rounded-circle"
                                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                              />
                            ) : (
                              <div
                                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                                style={{ width: "40px", height: "40px", fontSize: "1.2rem", fontWeight: "bold" }}
                              >
                                {user.username?.charAt(0).toUpperCase() || "U"}
                              </div>
                            )}
                          </div>
                          <div>
                            <h6 className="mb-0">{user.username || "Unknown User"}</h6>
                            <small className="text-muted">
                              <i className="fas fa-envelope me-1"></i>
                              {user.email || "N/A"}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <span
                          className={`badge ${user.role === "Admin"
                            ? "bg-danger"
                            : user.role === "Teacher"
                              ? "bg-warning text-dark"
                              : "bg-info text-dark"
                            }`}
                        >
                          {user.role?.toUpperCase() || "USER"}
                        </span>
                      </td>
                      <td className="text-center align-middle">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleViewProfile(user)}
                        >
                          <i className="fas fa-eye me-1"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-state text-center py-5">
          <i className="fas fa-user-slash fa-4x text-muted mb-3"></i>
          <h4 className="text-muted">No Users Found</h4>
          <p className="text-muted mb-4">There are no users in the system</p>
        </div>
      )}

      {/* View Profile Modal */}
      {showProfileModal && selectedUser && (
        <>
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">
                    <i className="fas fa-user-circle me-2"></i>
                    User Profile
                  </h5>
                  <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    {/* Left Side - Profile Picture */}
                    <div className="col-md-4 text-center border-end">
                      <div className="mb-3">
                        {selectedUser.profileImage ? (
                          <img
                            src={selectedUser.profileImage}
                            alt={selectedUser.username}
                            className="rounded-circle shadow"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                          />
                        ) : (
                          <div
                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto shadow"
                            style={{ width: "150px", height: "150px", fontSize: "4rem", fontWeight: "bold" }}
                          >
                            {selectedUser.username?.charAt(0).toUpperCase() || "U"}
                          </div>
                        )}
                      </div>
                      <h5 className="mb-2">{selectedUser.username || "Unknown User"}</h5>
                      <span className={`badge rounded-pill px-3 py-2 ${selectedUser.role === 'admin' ? 'bg-danger' :
                        selectedUser.role === 'teacher' ? 'bg-warning text-dark' :
                          'bg-info text-dark'
                        }`}>
                        <i className="fas fa-shield-alt me-1"></i>
                        {selectedUser.role?.toUpperCase() || "USER"}
                      </span>
                    </div>

                    {/* Right Side - User Details */}
                    <div className="col-md-8">
                      <h6 className="text-primary mb-3">
                        <i className="fas fa-info-circle me-2"></i>
                        Personal Information
                      </h6>

                      <div className="mb-3">
                        <label className="text-muted small mb-1">
                          <i className="fas fa-user me-2"></i>
                          Full Name
                        </label>
                        <p className="fw-bold mb-0">{selectedUser.username || "N/A"}</p>
                      </div>

                      <div className="mb-3">
                        <label className="text-muted small mb-1">
                          <i className="fas fa-envelope me-2"></i>
                          Email Address
                        </label>
                        <p className="fw-bold mb-0">{selectedUser.email || "N/A"}</p>
                      </div>

                      <div className="mb-3">
                        <label className="text-muted small mb-1">
                          <i className="fas fa-phone me-2"></i>
                          Phone Number
                        </label>
                        <p className="fw-bold mb-0">{selectedUser.phone || "Not provided"}</p>
                      </div>

                      <div className="mb-3">
                        <label className="text-muted small mb-1">
                          <i className="fas fa-shield-alt me-2"></i>
                          User Role <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-select"
                          value={selectedRole}
                          onChange={handleRoleChange}
                        >
                          <option value="Student">Student</option>
                          <option value="Teacher">Teacher</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </div>

                      <hr />

                      <div className="row">
                        <div className="col-6">
                          <label className="text-muted small mb-1">
                            <i className="fas fa-fingerprint me-2"></i>
                            User ID
                          </label>
                          <p className="small mb-0">{selectedUser._id || "N/A"}</p>
                        </div>
                        <div className="col-6">
                          <label className="text-muted small mb-1">
                            <i className="fas fa-calendar-alt me-2"></i>
                            Joined Date
                          </label>
                          <p className="small mb-0">
                            {selectedUser.createdAt
                              ? new Date(selectedUser.createdAt).toLocaleDateString('en-US', {
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
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                    <i className="fas fa-times me-2"></i>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleUpdateRole}>
                    <i className="fas fa-save me-2"></i>
                    Update Role
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
