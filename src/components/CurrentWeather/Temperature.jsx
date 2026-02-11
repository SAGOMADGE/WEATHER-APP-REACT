const Temperature = ({ temp }) => {
  return (
    <div>
      <span>{Math.round(temp)}</span>
      <span>°C</span>
    </div>
  );
};

export default Temperature;
