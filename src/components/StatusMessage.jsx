const StatusMessage = ({ type, message, icon, t }) => {
  return (
    <div className={`status-container status-${type}`}>
      <div className="status-icon">{icon}</div>
      <p className="status-text">{message}</p>
      {type === "error" && t.ui?.retry && (
        <button onClick={() => window.location.reload()} className="retry-btn">
          {t.ui.retry}
        </button>
      )}
    </div>
  );
};

export default StatusMessage;
