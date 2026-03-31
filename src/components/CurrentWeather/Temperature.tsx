const Temperature = ({ temp }) => {
  return (
    <div className="current-weather__temp-wrapper">
      <span className="current-weather__temp-value">{Math.round(temp)}</span>
      <span className="current-weather__temp-unit">°C</span>
    </div>
  );
};

export default Temperature;
