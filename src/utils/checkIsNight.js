/**
 * @param {number} currentTime - Текущий таймстамп (секунды)
 * @param {number} sunrise - Таймстамп восхода (секунды)
 * @param {number} sunset - Таймстамп заката (секунды)
 * @returns {boolean}
 */
export const checkIsNight = (currentTime, sunrise, sunset) => {
  if (!currentTime || !sunrise || !sunset) return false;

  return currentTime < sunrise || currentTime > sunset;
};

export default checkIsNight;
