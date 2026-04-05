export const checkIsNight = (
  currentTime: number,
  sunrise: number,
  sunset: number,
): boolean => {
  if (!currentTime || !sunrise || !sunset) return false;

  return currentTime < sunrise || currentTime > sunset;
};

export default checkIsNight;
