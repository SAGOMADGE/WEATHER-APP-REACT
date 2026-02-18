const StatusMessasage = ({ type, message, icon, t }) => {
  return (
    <div className={`status-container status-${type}`}>
      <div className="status-icon">{icon}</div>
      <p className="status-text">
        {message}
        {type === "error" && (
          <button
            onClick={() => window.location.reload()}
            className="retry-btn"
          >
            {t.errorr.retry}
          </button>
        )}
      </p>
    </div>
  );
};

export default StatusMessasage;
