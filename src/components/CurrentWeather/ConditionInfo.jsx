const conditionInfo = ({ condition, feelsLike }) => {
  return (
    <div>
      <div>{condition}</div>
      <div>Feels like {Math.round(feelsLike)}°C</div>
    </div>
  );
};

export default conditionInfo;
