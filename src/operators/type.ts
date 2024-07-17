import { expry } from '..';

import { Value, Operator } from '../types';

export type Type = {
  $convert: Operator<{ input: Value; to: Value }, boolean | number | string>;
  $isBoolean: Operator<Value, boolean>;
  $isNumber: Operator<Value, boolean>;
  $isString: Operator<Value, boolean>;
  $toBoolean: Operator<Value, boolean>;
  $toNumber: Operator<Value, number | null>;
  $toString: Operator<Value, string>;
};

export const type: Type = {
  /**
   * Converts a value to a specified type.
   *
   * @param args The value and the type (expressions evaluating to any type and a string that has to be 'bool', 'number', or 'string').
   * @param vars The variables.
   *
   * @returns The converted value.
   *
   * @example $convert({ input: '5', to: 'number' }) // 5
   * @example $convert({ input: 5, to: 'string' }) // '5'
   * @example $convert({ input: 5, to: 'bool' }) // true
   */
  $convert(
    args: { input: Value; to: Value },
    vars: Record<string, Value>
  ): boolean | number | string {
    const input = expry(args.input, vars);
    const to = expry(args.to, vars) as 'bool' | 'number' | 'string';
    if (to === 'bool') return Boolean(input);
    if (to === 'number') return Number(input);
    if (to === 'string') return String(input);
    throw new Error(`Invalid type: ${to}`);
  },

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
  $isBoolean(args: Value, vars: Record<string, Value>): boolean {
    const value = expry(args, vars);
    return typeof value === 'boolean';
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
  $isNumber(args: Value, vars: Record<string, Value>): boolean {
    const value = expry(args, vars);
    return typeof value === 'number';
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
  $isString(args: Value, vars: Record<string, Value>): boolean {
    const value = expry(args, vars);
    return typeof value === 'string';
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
  $toBoolean(args: Value, vars: Record<string, Value>): boolean {
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
  $toNumber(args: Value, vars: Record<string, Value>): number | null {
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
  $toString(args: Value, vars: Record<string, Value>): string {
    const value = expry(args, vars);
    return String(value);
  },
};
