import { expry } from "..";

import { Expression, Variables, Operation } from "../types";

export type Comparison = {
  $cmp: Operation<[Expression, Expression], number>;
  $eq: Operation<[Expression, Expression], boolean>;
  $gt: Operation<[Expression, Expression], boolean>;
  $gte: Operation<[Expression, Expression], boolean>;
  $lt: Operation<[Expression, Expression], boolean>;
  $lte: Operation<[Expression, Expression], boolean>;
  $ne: Operation<[Expression, Expression], boolean>;
};

export const comparison: Comparison = {
  /**
   * Compares two values and returns -1 if the first is less than the second, 1 if the first is greater than the second, and 0 if the two values are equal.
   *
   * @param args An array of two values (expressions evaluating to strings or numbers).
   * @param vars The variables.
   *
   * @returns The result of comparing the two values.
   *
   * @example $cmp([3, 5]) // -1
   * @example $cmp([5, 3]) // 1
   * @example $cmp([3, 3]) // 0
   */
  $cmp(args: [Expression, Expression], vars: Variables): number {
    const a = expry(args[0], vars) as number | string;
    const b = expry(args[1], vars) as number | string;
    return a < b ? -1 : a > b ? 1 : 0;
  },

  /**
   * Compares two values and returns true if they are equal. Otherwise, it returns false.
   *
   * @param args An array of two values (expressions evaluating to any types).
   * @param vars The variables.
   *
   * @returns True if the two values are equal. Otherwise, false.
   *
   * @example $eq([3, 3]) // true
   * @example $eq(['hello', 'bye']) // false
   */
  $eq(args: [Expression, Expression], vars: Variables): boolean {
    const a = expry(args[0], vars);
    const b = expry(args[1], vars);
    return a === b;
  },

  /**
   * Compares two values and returns true if the first is greater than the second. Otherwise, it returns false.
   *
   * @param args An array of two values (expressions evaluating to strings or numbers).
   * @param vars The variables.
   *
   * @returns True if the first value is greater than the second. Otherwise, false.
   *
   * @example $gt([5, 3]) // true
   * @example $gt([3, 5]) // false
   * @example $gt([3, 3]) // false
   */
  $gt(args: [Expression, Expression], vars: Variables): boolean {
    const a = expry(args[0], vars) as number | string;
    const b = expry(args[1], vars) as number | string;
    return a > b;
  },

  /**
   * Compares two values and returns true if the first is greater than or equal to the second. Otherwise, it returns false.
   *
   * @param args An array of two values (expressions evaluating to strings or numbers).
   * @param vars The variables.
   *
   * @returns True if the first value is greater than or equal to the second. Otherwise, false.
   *
   * @example $gte([5, 3]) // true
   * @example $gte([3, 5]) // false
   * @example $gte([3, 3]) // true
   */
  $gte(args: [Expression, Expression], vars: Variables): boolean {
    const a = expry(args[0], vars) as number | string;
    const b = expry(args[1], vars) as number | string;
    return a >= b;
  },

  /**
   * Compares two values and returns true if the first is less than the second. Otherwise, it returns false.
   *
   * @param args An array of two values (expressions evaluating to strings or numbers).
   * @param vars The variables.
   *
   * @returns True if the first value is less than the second. Otherwise, false.
   *
   * @example $lt([3, 5]) // true
   * @example $lt([5, 3]) // false
   * @example $lt([3, 3]) // false
   */
  $lt(args: [Expression, Expression], vars: Variables): boolean {
    const a = expry(args[0], vars) as number | string;
    const b = expry(args[1], vars) as number | string;
    return a < b;
  },

  /**
   * Compares two values and returns true if the first is less than or equal to the second. Otherwise, it returns false.
   *
   * @param args An array of two values (expressions evaluating to strings or numbers).
   * @param vars The variables.
   *
   * @returns True if the first value is less than or equal to the second. Otherwise, false.
   *
   * @example $lte([3, 5]) // true
   * @example $lte([5, 3]) // false
   * @example $lte([3, 3]) // true
   */
  $lte(args: [Expression, Expression], vars: Variables): boolean {
    const a = expry(args[0], vars) as number | string;
    const b = expry(args[1], vars) as number | string;
    return a <= b;
  },

  /**
   * Compares two values and returns true if they are not equal. Otherwise, it returns false.
   *
   * @param args An array of two values (expressions evaluating to any types).
   * @param vars The variables.
   *
   * @returns True if the two values are not equal. Otherwise, false.
   *
   * @example $ne([3, 3]) // false
   * @example $ne(['hello', 'bye']) // true
   */
  $ne(args: [Expression, Expression], vars: Variables): boolean {
    const a = expry(args[0], vars);
    const b = expry(args[1], vars);
    return a !== b;
  },
};
