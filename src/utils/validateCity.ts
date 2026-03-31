function validateCity(value: unknown): boolean {
  if (typeof value !== "string") return false;

  const regex = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/;
  return regex.test(value);
}
export default validateCity;
