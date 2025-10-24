import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminViewTeacherProfile from "./AdminViewTeacherProfile";
import CreateTeacher from "./CreateTeacher";
import { fetchAllTeachers, deleteTeacher } from "../../Redux/Actions/teacherAction";

const Teachers = () => {
  const dispatch = useDispatch();
  const { teachers, loading, error } = useSelector((state) => state.teachers);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  useEffect(() => {
    dispatch(fetchAllTeachers());
  }, [dispatch]);

  // delete teacher
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      await dispatch(deleteTeacher(id));
      dispatch(fetchAllTeachers());
    }
  };

  // Create Teacher Modal Functions

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading teachers...</p>
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
              <i className="fas fa-chalkboard-teacher me-2 text-primary"></i>
              All Teachers
            </h2>
            <p className="text-muted mb-0">
              Total Teachers: <span className="badge bg-primary">{teachers?.length || 0}</span>
            </p>
          </div>
          <CreateTeacher />
        </div>
      </div>

      {/* Teachers Table */}
      {teachers && teachers.length > 0 ? (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover table-striped mb-0">
                <thead className="table-success">
                  <tr>
                    <th className="text-center" style={{ width: "80px" }}>Sr#</th>
                    <th>Teacher Name</th>
                    <th>class</th>
                    <th>Subject</th>
                    <th className="text-center" style={{ width: "200px" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((teacher, index) => (
                    <tr key={teacher._id}>
                      <td className="text-center align-middle">
                        <span className="badge bg-secondary">{index + 1}</span>
                      </td>
                      <td className="align-middle">
                        <div className="d-flex align-items-center">
                          <div className="me-3">
                            {teacher.userId?.profileImage ? (
                              <img
                                src={teacher.userId.profileImage}
                                alt={teacher.userId?.username}
                                className="rounded-circle"
                                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                              />
                            ) : (
                              <div
                                className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center"
                                style={{ width: "40px", height: "40px", fontSize: "1.2rem", fontWeight: "bold" }}
                              >
                                {teacher.userId?.username?.charAt(0).toUpperCase() || "T"}
                              </div>
                            )}
                          </div>
                          <div>
                            <h6 className="mb-0">{teacher.userId?.username || "Unknown Teacher"}</h6>
                            <small className="text-muted">
                              <i className="fas fa-envelope me-1"></i>
                              {teacher.userId?.email || "N/A"}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td className="align-middle">
                        {teacher.assignedClasses && teacher.assignedClasses.length > 0 ? (
                          teacher.assignedClasses.map((cls, idx) => (
                            <span key={idx} className="badge bg-success me-1">
                              <i className="fas fa-chalkboard me-1"></i>
                              {cls.className} - Section {cls.section}
                            </span>
                          ))
                        ) : (
                          <span className="badge bg-secondary">Not Assigned</span>
                        )}
                      </td>

                      <td className="align-middle">
                        <span className="badge bg-info text-dark">
                          <i className="fas fa-book me-1"></i>
                          {teacher.subject || "N/A"}
                        </span>
                      </td>
                      <td className="text-center align-middle">
                        <button
                          className="btn btn-sm btn-primary me-1"
                          onClick={() => setSelectedTeacher(teacher)}
                        >
                          <i className="fas fa-eye me-1"></i>

                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(teacher._id)}
                          disabled={loading}
                        >
                          {loading ? "Deleting..." : <i className="fas fa-trash-alt"></i>}
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
          <h4 className="text-muted">No Teachers Found</h4>
          <p className="text-muted mb-4">Start by creating your first teacher</p>
          <div>
            <CreateTeacher />
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {selectedTeacher && (
        <>
          <AdminViewTeacherProfile
            teacher={selectedTeacher}
            onClose={() => setSelectedTeacher(null)}
          />
        </>
      )}


    </div>
  );
};

export default Teachers;