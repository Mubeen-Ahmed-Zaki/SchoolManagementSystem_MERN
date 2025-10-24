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
      <td>
        <button onClick={() => handleStuRemove(cls._id, student._id)} className="btn btn-outline-danger btn-sm" >
          <i className="fas fa-trash-alt me-1"></i> Remove
        </button>
      </td>
    </tr>
  ))}