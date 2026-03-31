function validateCity(value) {
  const regex = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;
  return regex.test(value);
}
export default validateCity;
