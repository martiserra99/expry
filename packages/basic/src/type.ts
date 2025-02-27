import { Operations } from "@expry/system";

export type TypePrototypes = {
  isBoolean: {
    params: unknown;
    return: boolean;
  };
  isNumber: {
    params: unknown;
    return: boolean;
  };
  isString: {
    params: unknown;
    return: boolean;
  };
  toBoolean: {
    params: unknown;
    return: boolean;
  };
  toNumber: {
    params: unknown;
    return: number;
  };
  toString: {
    params: unknown;
    return: string;
  };
};

export const typeOperations: Operations<TypePrototypes> = {
  /**
   * Returns true if the value is a boolean. Otherwise, it returns false.
   *
   * @example $isBoolean(false) // true
   * @example $isBoolean(5) // false
   * @example $isBoolean('hello') // false
   */
  isBoolean(args, vars, expry): boolean {
    const value = expry(args, vars);
    return typeof value === "boolean";
  },

  /**
   * Returns true if the value is a number. Otherwise, it returns false.
   *
   * @example $isNumber(5) // true
   * @example $isNumber(true) // false
   * @example $isNumber('hello') // false
   */
  isNumber(args, vars, expry): boolean {
    const value = expry(args, vars);
    return typeof value === "number";
  },

  /**
   * Returns true if the value is a string. Otherwise, it returns false.
   *
   * @example $isString('hello') // true
   * @example $isString(5) // false
   * @example $isString(true) // false
   */
  isString(args, vars, expry): boolean {
    const value = expry(args, vars);
    return typeof value === "string";
  },

  /**
   * Converts a value to a boolean.
   *
   * @example $toBoolean('hello') // true
   * @example $toBoolean('') // false
   * @example $toBoolean(5) // true
   * @example $toBoolean(0) // false
   */
  toBoolean(args, vars, expry): boolean {
    const value = expry(args, vars);
    return Boolean(value);
  },

  /**
   * Converts a value to a number. If the value cannot be converted, it returns null.
   *
   * @example $toNumber('5') // 5
   * @example $toNumber('hello') // NaN
   */
  toNumber(args, vars, expry): number {
    const value = expry(args, vars);
    return Number(value);
  },

  /**
   * Converts a value to a string.
   *
   * @example $toString(5) // '5'
   * @example $toString(true) // 'true'
   */
  toString(args, vars, expry): string {
    const value = expry(args, vars);
    return String(value);
  },
};
