import { Value } from "./types";

type Check = (value: Value) => boolean;

export function assert<T>(value: Value, check: Check[], message: string): asserts value is T {
  if (check.some(check => !check(value))) {
    throw new Error(message);
  }
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

export function isArray(check: Check[]): Check {
  return function(value: Value): boolean {
    if (!Array.isArray(value)) return false;
    return value.every(item => check.some(check => check(item)));
  };
}
