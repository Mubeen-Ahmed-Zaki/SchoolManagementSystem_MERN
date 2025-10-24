import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, updateProfile } from "../../Redux/Actions/userAction";

const Profile = () => {
  const dispatch = useDispatch();
  const { userProfile, loading, error, success } = useSelector((state) => state.userList);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  const [showAlert, setShowAlert] = useState(null);

  useEffect(() => {
    if (userProfile) {
      setEditFormData({
        username: userProfile.username || "",
        email: userProfile.email || "",
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [userProfile]);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Success or Error alert
  useEffect(() => {
    if (success) {
      setShowAlert({
        type: "success",
        message: "Profile updated successfully",
      });
      setTimeout(() => setShowAlert(null), 3000);
    } else if (error) {
      setShowAlert({
        type: "danger",
        message: `Error: ${error}`,
      });
      setTimeout(() => setShowAlert(null), 3000);
    }
  }, [success, error]);

  const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditFormData({
      username: userProfile?.username || "",
      email: userProfile?.email || "",
      currentPassword: "",
      newPassword: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent password fields from being auto-filled by any existing values
    if (name === "currentPassword" || name === "newPassword") {
      setEditFormData((prev) => ({
        ...prev,
        [name]: value, // user typed password only
      }));
    } else {
      setEditFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateProfile(editFormData));
    await dispatch(fetchUserProfile()); // fetch fresh data after update
    handleCloseEditModal();
  };

  // Loading screen
  if (loading && !userProfile) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "3rem", height: "3rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-muted">Loading your profile...</p>
      </div>
    );
  }

  // Error
  if (error && !loading && !userProfile) {
    return (
      <div className="container py-5">
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
        >
          <i className="fas fa-exclamation-triangle me-3 fa-2x"></i>
          <div>
            <h5 className="alert-heading mb-1">Error!</h5>
            <p className="mb-0">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // No user data (only if not loading)
  if (!loading && !userProfile) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <i className="fas fa-user-slash fa-4x text-muted mb-3"></i>
          <h4 className="text-muted">No user data available</h4>
          <p className="text-muted">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      {/* Alert */}
      {showAlert && (
        <div
          className={`alert alert-${showAlert.type} alert-dismissible fade show`}
          role="alert"
          style={{ position: "absolute", width: "400px", top: "20px", right: "35%" }}

        >
          <i
            className={`fas ${showAlert.type === "success"
              ? "fa-check-circle"
              : "fa-exclamation-circle"
              } me-2`}
          ></i>
          {showAlert.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAlert(null)}
          ></button>
        </div>
      )}

      {/* Back Button */}
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => window.history.back()}
      >
        <i className="fas fa-arrow-left me-2"></i>Back
      </button>

      {/* Profile Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 mb-2">
          <i className="fas fa-user-circle me-3 text-primary"></i>
          My Profile
        </h1>
        <p className="text-muted">Manage your account information</p>
      </div>

      {/* Main Content */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="row g-4">
            {/* Profile Card */}
            <div className="col-lg-4">
              <div className="card shadow-lg border-0 h-100">
                <div className="card-body text-center p-4">
                  {/* Profile Avatar */}
                  <div className="mb-4">
                    {userProfile.profileImage ? (
                      <img
                        src={userProfile.profileImage}
                        alt={userProfile.username}
                        className="rounded-circle shadow-sm"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                          border: "5px solid #f8f9fa",
                        }}
                      />
                    ) : (
                      <div
                        className="rounded-circle text-white d-flex align-items-center justify-content-center mx-auto shadow-sm"
                        style={{
                          width: "150px",
                          height: "150px",
                          fontSize: "4rem",
                          fontWeight: "bold",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                      >
                        {userProfile.username?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                  {/* User Name */}
                  <h3 className="mb-2 fw-bold">{userProfile.username}</h3>
                  {/* Role Badge */}
                  <span
                    className={`badge rounded-pill px-3 py-2 mb-3 ${userProfile.role === "Admin"
                      ? "bg-danger"
                      : userProfile.role === "Teacher"
                        ? "bg-warning text-dark"
                        : "bg-info text-dark"
                      }`}
                    style={{ fontSize: "0.9rem" }}
                  >
                    <i className="fas fa-shield-alt me-2"></i>
                    {userProfile.role?.toUpperCase() || "USER"}
                  </span>
                  {/* Email */}
                  <div className="d-flex align-items-center justify-content-center text-muted mb-4">
                    <i className="fas fa-envelope me-2"></i>
                    <span>{userProfile.email}</span>
                  </div>
                  {/* Action Buttons */}
                  <div className="d-grid gap-2">
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={handleOpenEditModal}
                    >
                      <i className="fas fa-edit me-2"></i>
                      Edit Profile
                    </button>
                    <button className="btn btn-outline-secondary">
                      <i className="fas fa-cog me-2"></i>
                      Settings
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Cards */}
            <div className="col-lg-8">
              {/* Personal Information Card */}
              <div className="card shadow-lg border-0 mb-4">
                <div className="card-header bg-primary text-white py-3">
                  <h5 className="mb-0">
                    <i className="fas fa-info-circle me-2"></i>Personal
                    Information
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="text-muted small mb-1">
                        <i className="fas fa-user me-2"></i>Full Name
                      </label>
                      <p className="fw-bold fs-5 mb-0">
                        {userProfile.username || "N/A"}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <label className="text-muted small mb-1">
                        <i className="fas fa-envelope me-2"></i>Email Address
                      </label>
                      <p className="fw-bold fs-5 mb-0">
                        {userProfile.email || "N/A"}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item">
                        <label className="text-muted small mb-1">
                          <i className="fas fa-phone me-2"></i>
                          Phone Number
                        </label>
                        <p className="fw-bold fs-5 mb-0">
                          {userProfile.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item">
                        <label className="text-muted small mb-1">
                          <i className="fas fa-id-badge me-2"></i>
                          User Role
                        </label>
                        <p className="fw-bold fs-5 mb-0 text-capitalize">
                          {userProfile.role || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="info-item">
                        <label className="text-muted small mb-1">
                          <i className="fas fa-map-marker-alt me-2"></i>
                          Address
                        </label>
                        <p className="fw-bold fs-5 mb-0">
                          {userProfile.address || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Details Card */}
              <div className="card shadow-lg border-0 mb-0">
                <div className="card-header bg-success text-white py-3">
                  <h5 className="mb-0">
                    <i className="fas fa-user-shield me-2"></i>
                    Account Details
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="info-item">
                        <label className="text-muted small mb-1">
                          <i className="fas fa-fingerprint me-2"></i>
                          User ID
                        </label>
                        <p className="fw-bold mb-0" style={{ fontSize: "0.9rem" }}>
                          {userProfile._id || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item">
                        <label className="text-muted small mb-1">
                          <i className="fas fa-check-circle me-2"></i>
                          Account Status
                        </label>
                        <p className="mb-0">
                          <span className="badge bg-success px-3 py-2">
                            <i className="fas fa-check me-1"></i>
                            Active
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item">
                        <label className="text-muted small mb-1">
                          <i className="fas fa-calendar-plus me-2"></i>
                          Member Since
                        </label>
                        <p className="fw-bold mb-0">
                          {userProfile.createdAt
                            ? new Date(userProfile.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="info-item">
                        <label className="text-muted small mb-1">
                          <i className="fas fa-clock me-2"></i>
                          Last Updated
                        </label>
                        <p className="fw-bold mb-0">
                          {userProfile.updatedAt
                            ? new Date(userProfile.updatedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Card */}
              {/* <div className="card shadow-lg border-0">
                <div className="card-header bg-warning text-dark py-3">
                  <h5 className="mb-0">
                    <i className="fas fa-chart-bar me-2"></i>
                    Quick Statistics
                  </h5>
                </div>
                <div className="card-body p-4">
                  <div className="row text-center g-4">
                    <div className="col-md-4">
                      <div className="stat-box p-3 rounded bg-light">
                        <i className="fas fa-book fa-2x text-primary mb-2"></i>
                        <h3 className="mb-1 fw-bold">
                          {userProfile.totalCourses || 0}
                        </h3>
                        <p className="text-muted mb-0 small">Total Courses</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="stat-box p-3 rounded bg-light">
                        <i className="fas fa-tasks fa-2x text-warning mb-2"></i>
                        <h3 className="mb-1 fw-bold">
                          {userProfile.completedTasks || 0}
                        </h3>
                        <p className="text-muted mb-0 small">Completed Tasks</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="stat-box p-3 rounded bg-light">
                        <i className="fas fa-star fa-2x text-success mb-2"></i>
                        <h3 className="mb-1 fw-bold">
                          {userProfile.averageGrade || "N/A"}
                        </h3>
                        <p className="text-muted mb-0 small">Average Grade</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>


      {/* Edit Modal */}
      {showEditModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-user-edit me-2"></i>Edit Profile
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={handleCloseEditModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={editFormData.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={editFormData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="currentPassword" className="form-label">
                    <i className="fas fa-lock me-2"></i>
                    Current Password{" "}
                    <span className="text-muted small">(Optional)</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    name="currentPassword"
                    value={editFormData.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Enter current password"
                  />
                  <small className="text-muted">
                    <i className="fas fa-info-circle me-1"></i>
                    Leave blank if you don't want to change password
                  </small>
                </div>

                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    <i className="fas fa-lock me-2"></i>
                    New Password{" "}
                    <span className="text-muted small">(Optional)</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    name="newPassword"
                    value={editFormData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter new password"
                  />
                  <small className="text-muted">
                    <i className="fas fa-info-circle me-1"></i>
                    Leave blank if you don't want to change password
                  </small>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseEditModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEditSubmit}
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;