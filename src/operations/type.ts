import { expry } from "..";

import { Expression, ExpressionVariables, Operation } from "../types";

export type Type = {
  $isBoolean: Operation<Expression, boolean>;
  $isNumber: Operation<Expression, boolean>;
  $isString: Operation<Expression, boolean>;
  $toBoolean: Operation<Expression, boolean>;
  $toNumber: Operation<Expression, number | null>;
  $toString: Operation<Expression, string>;
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
  $isBoolean(args: Expression, vars: ExpressionVariables): boolean {
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
  $isNumber(args: Expression, vars: ExpressionVariables): boolean {
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
  $isString(args: Expression, vars: ExpressionVariables): boolean {
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
  $toBoolean(args: Expression, vars: ExpressionVariables): boolean {
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
  $toNumber(args: Expression, vars: ExpressionVariables): number | null {
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
  $toString(args: Expression, vars: ExpressionVariables): string {
    const value = expry(args, vars);
    return String(value);
  },
};
