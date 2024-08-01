import { Value } from "./types";

type Check = (value: Value) => boolean;

export function assert<T>(value: Value, check: Check[], message: string): asserts value is T {
  if (check.some(check => check(value))) return;
  throw new Error(message);
}

export function isNumber(value: Value): boolean {
  return typeof value === "number";
}

export function isString(value: Value): boolean {
  return typeof value === "string";
}

export function isBoolean(value: Value): boolean {
  return typeof value === "boolean";
}

export function isArray(value: Value): boolean {
  return Array.isArray(value);
}

export function isObject(value: Value): boolean {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function isArrayOfType(check: Check[]): Check {
  return (value: Value) => Array.isArray(value) && value.every(item => check.some(check => check(item)));
}
