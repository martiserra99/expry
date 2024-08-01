import { Value } from "./types";

type Check = (value: Value) => boolean;

export function assert<T>(value: Value, check: Check[], message: string): asserts value is T {
  if (check.some(check => !check(value))) {
    throw new Error(message);
  }
}

export const isNumber: Check = (value: Value) => typeof value === "number";
export const isString: Check = (value: Value) => typeof value === "string";
export const isBoolean: Check = (value: Value) => typeof value === "boolean";
