import { isNumber } from "./isNumber";

export const isNumberArray = (value: unknown): value is number[] =>
  Array.isArray(value) && value.every(isNumber);
