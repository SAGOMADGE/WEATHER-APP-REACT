// Проверка валидности города
function validateCity(value) {
  // ^ и $ означают "начало и конец строки"
  // [a-zA-Zа-яА-ЯёЁ\- ]+ — разрешены буквы, дефис и пробел, один и более символов
  const regex = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;
  return regex.test(value);
}

export default validateCity;
