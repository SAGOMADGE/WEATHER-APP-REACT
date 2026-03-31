export const checkIsNight = (currentTime, sunrise, sunset) => {
  if (!currentTime || !sunrise || !sunset) return false;

  return currentTime < sunrise || currentTime > sunset;
};

export default checkIsNight;
