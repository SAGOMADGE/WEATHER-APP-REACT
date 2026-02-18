const interpretWmoCode = (code) => {
  if (code === 0) return "Clear";
  if (code >= 1 && code <= 3) return "Clouds";
  if (code >= 45 && code <= 48) return "Mist";
  if (code >= 51 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 99) return "Storm";
  return "Clear";
};

export default interpretWmoCode;
