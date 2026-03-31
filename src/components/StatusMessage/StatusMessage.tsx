import "./StatusMessage.css";

const StatusMessage = ({ type, message, icon, t, onRetry }) => {
  return (
    <div className={`status-container status-${type}`}>
      <div className="status-icon" role="img" aria-label={type}>
        {icon}
      </div>

      {type === "error" && (
        <div className="status-title">
          <h3 className="status-title">{t.ui.error || "Ошибка"} </h3>
        </div>
      )}

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
