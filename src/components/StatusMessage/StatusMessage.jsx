import "./StatusMessage.css";

const StatusMessage = ({ type, message, icon, t, onRetry }) => {
  return (
    <div className={`status-container status-${type}`}>
      {/* Заголовок добавляет веса интерфейсу */}

      {/* 1. Иконка должна быть всегда */}
      <div className="status-icon" role="img" aria-label={type}>
        {icon}
      </div>

      {/* 2. Контентная часть */}
      {type === "error" && (
        <div className="status-title">
          <h3 className="status-title">{t.ui.error || "Ошибка"} </h3>
        </div>
      )}

      <p className="status-text">{message}</p>

      {/*  3. Действие (только для ошибок ) */}
      {type === "error" && t.ui?.retry && (
        <button className="retry-btn" onClick={onRetry}>
          {t.ui.retry}
        </button>
      )}
    </div>
  );
};

export default StatusMessage;
