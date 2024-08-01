import { expry } from "..";

import { Value, Variables, Operation } from "../types";

import { assert, isBoolean } from "../assert";

export type Boolean = {
  $and: Operation<Value[], boolean>;
  $not: Operation<Value, boolean>;
  $or: Operation<Value[], boolean>;
};

export const boolean: Boolean = {
  /**
   * Evaluates one or more expressions and returns true if all of the expressions are true. Otherwise, it returns false.
   *
   * @param args An array of booleans (expressions evaluating to booleans).
   * @param vars The variables.
   *
   * @returns True if all of the expressions are true. Otherwise, false.
   *
   * @example $and([true, true, true]) // true
   * @example $and([true, false, true]) // false
   */
  $and(args: Value[], vars: Variables): boolean {
    return args.every(expr => {
      const boolean = expry(expr, vars);
      assert<boolean>(boolean, [isBoolean], "The $and operator requires booleans as arguments.");
      return boolean;
    });
  },

  /**
   * Evaluates a boolean and returns the opposite boolean value.
   *
   * @param args A boolean (expression evaluating to a boolean).
   * @param vars The variables.
   *
   * @returns The opposite boolean value.
   *
   * @example $not(true) // false
   * @example $not(false) // true
   */
  $not(args: Value, vars: Variables): boolean {
    const boolean = expry(args, vars);
    assert<boolean>(boolean, [isBoolean], "The $not operator requires a boolean as argument.");
    return !boolean;
  },

  /**
   * Evaluates one or more expressions and returns true if any of the expressions are true. Otherwise, it returns false.
   *
   * @param args An array of booleans (expressions evaluating to booleans).
   * @param vars The variables.
   *
   * @returns True if any of the expressions are true. Otherwise, false.
   *
   * @example $or([true, false, true]) // true
   * @example $or([false, false, false]) // false
   */
  $or(args: Value[], vars: Variables): boolean {
    return args.some(expr => {
      const boolean = expry(expr, vars) as boolean;
      assert<boolean>(boolean, [isBoolean], "The $or operator requires booleans as arguments.");
      return boolean;
    });
  },
};
