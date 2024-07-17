import { expry } from '..';

import { Expr, Eval, Vars, Operator } from '../types';

export type Conditional = {
  $cond: Operator<{ if: unknown; then: unknown; else: unknown }, unknown>;
  $ifNull: Operator<unknown[], unknown>;
  $switch: Operator<
    {
      branches: { case: unknown; then: unknown }[];
      default: unknown;
    },
    unknown
  >;
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
  $cond(
    args: { if: unknown; then: unknown; else: unknown },
    vars: Vars
  ): unknown {
    return expry(args.if, vars)
      ? expry(args.then, vars)
      : expry(args.else, vars);
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
  $ifNull(args: unknown[], vars: Vars): unknown {
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
  $switch(
    args: {
      branches: { case: unknown; then: unknown }[];
      default: unknown;
    },
    vars: Vars
  ): unknown {
    for (const branch of args.branches) {
      if (expry(branch.case, vars)) {
        return expry(branch.then, vars);
      }
    }
    return expry(args.default, vars);
  },
};
