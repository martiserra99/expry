import { expry } from "..";

import { Value, Variables, Operation } from "../types";

export type Type = {
  $isBoolean: Operation<Value, boolean>;
  $isNumber: Operation<Value, boolean>;
  $isString: Operation<Value, boolean>;
  $toBoolean: Operation<Value, boolean>;
  $toNumber: Operation<Value, number | null>;
  $toString: Operation<Value, string>;
};

export const type: Type = {
  /**
   * Returns true if the value is a boolean. Otherwise, it returns false.
   *
   * @param args The value (expression evaluating to any type).
   * @param vars The variables.
   *
   * @returns True if the value is a boolean. Otherwise, false.
   *
   * @example $isBoolean(false) // true
   * @example $isBoolean(5) // false
   * @example $isBoolean('hello') // false
   */
  $isBoolean(args: Value, vars: Variables): boolean {
    const value = expry(args, vars);
    return typeof value === "boolean";
  },

  /**
   * Returns true if the value is a number. Otherwise, it returns false.
   *
   * @param args The value (expression evaluating to any type).
   * @param vars The variables.
   *
   * @returns True if the value is a number. Otherwise, false.
   *
   * @example $isNumber(5) // true
   * @example $isNumber(true) // false
   * @example $isNumber('hello') // false
   */
  $isNumber(args: Value, vars: Variables): boolean {
    const value = expry(args, vars);
    return typeof value === "number";
  },

  /**
   * Returns true if the value is a string. Otherwise, it returns false.
   *
   * @param args The value (expression evaluating to any type).
   * @param vars The variables.
   *
   * @returns True if the value is a string. Otherwise, false.
   *
   * @example $isString('hello') // true
   * @example $isString(5) // false
   * @example $isString(true) // false
   */
  $isString(args: Value, vars: Variables): boolean {
    const value = expry(args, vars);
    return typeof value === "string";
  },

  /**
   * Converts a value to a boolean.
   *
   * @param args The value (expression evaluating to any type).
   * @param vars The variables.
   *
   * @returns The converted value.
   *
   * @example $toBoolean('hello') // true
   * @example $toBoolean('') // false
   * @example $toBoolean(5) // true
   * @example $toBoolean(0) // false
   */
  $toBoolean(args: Value, vars: Variables): boolean {
    const value = expry(args, vars);
    return Boolean(value);
  },

  /**
   * Converts a value to a number. If the value cannot be converted, it returns null.
   *
   * @param args The value (expression evaluating to any type).
   * @param vars The variables.
   *
   * @returns The converted value.
   *
   * @example $toNumber('5') // 5
   * @example $toNumber('hello') // null
   */
  $toNumber(args: Value, vars: Variables): number | null {
    const value = expry(args, vars);
    const number = Number(value);
    if (isNaN(number)) return null;
    return number;
  },

  /**
   * Converts a value to a string.
   *
   * @param args The value (expression evaluating to any type).
   * @param vars The variables.
   *
   * @returns The converted value.
   *
   * @example $toString(5) // '5'
   * @example $toString(true) // 'true'
   */
  $toString(args: Value, vars: Variables): string {
    const value = expry(args, vars);
    return String(value);
  },
};
