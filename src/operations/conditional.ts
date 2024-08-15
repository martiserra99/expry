import { expry } from "..";

import { Value, Variables, Operation } from "../types";

export type Conditional = {
  $cond: Operation<{ if: Value; then: Value; else: Value }, Value>;
  $ifNull: Operation<Value[], Value>;
  $switch: Operation<{ branches: { case: Value; then: Value }[]; default: Value }, Value>;
};

export const conditional: Conditional = {
  /**
   * Evaluates a boolean expression to return one of the two specified return expressions.
   *
   * @param args The condition, the value if true, and the value if false (expressions evaluating to a boolean, any type, and any type).
   * @param vars The variables.
   *
   * @returns The 'then' value if the condition is true. Otherwise, the 'else' value.
   *
   * @example $cond({ if: true, then: 'yes', else: 'no' }) // 'yes'
   * @example $cond({ if: false, then: 'yes', else: 'no' }) // 'no'
   */
  $cond(args: { if: Value; then: Value; else: Value }, vars: Variables): Value {
    const condition = expry(args.if, vars) as boolean;
    return condition ? expry(args.then, vars) : expry(args.else, vars);
  },

  /**
   * Evaluates expressions for null values and returns the first non-null expression's value. Otherwise, it returns the last expression's value.
   *
   * @param args The expressions (expressions evaluating to any types).
   * @param vars The variables.
   *
   * @returns The first non-null expression's value. Otherwise, the last expression's value.
   *
   * @example $ifNull([null, 'hello', 'bye']) // 'hello'
   * @example $ifNull([null, null, 'bye']) // 'bye'
   * @example $ifNull([null, null, null]) // null
   */
  $ifNull(args: Value[], vars: Variables): Value {
    for (const arg of args) {
      const value = expry(arg, vars);
      if (value !== null) return value;
    }
    return expry(args[args.length - 1], vars);
  },

  /**
   * Evaluates a series of case expressions. When it finds an expression which evaluates to true, it returns the value of the corresponding expression. If no expression is true, it returns the value of the default expression.
   *
   * @param args The branches and the default value (expressions evaluating to booleans and any types).
   * @param vars The variables.
   *
   * @returns The value of the first true expression. Otherwise, the default value.
   *
   * @example $switch({ branches: [{ case: false, then: 1 }, { case: true, then: 2 }], default: 3 } }) // 2
   * @example $switch({ branches: [{ case: false, then: 1 }, { case: false, then: 2 }], default: 3 } }) // 3
   */
  $switch(args: { branches: { case: Value; then: Value }[]; default: Value }, vars: Variables): Value {
    for (const branch of args.branches) {
      const condition = expry(branch.case, vars) as boolean;
      if (condition) return expry(branch.then, vars);
    }
    return expry(args.default, vars);
  },
};
