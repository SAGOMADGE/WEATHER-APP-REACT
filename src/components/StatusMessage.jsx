const StatusMessage = ({ type, message, icon, t, onRetry }) => {
  return (
    <div className={`status-container status-${type}`}>
      <div className="status-icon">{icon}</div>
      <p className="status-text">{message}</p>
      {type === "error" && t.ui?.retry && (
        <button className="retry-btn" onClick={onRetry}>
          {t.ui.retry}
        </button>
      )}
    </div>
  );
};

export default StatusMessage;
