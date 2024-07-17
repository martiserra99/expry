import { expry } from '..';

import { Expr, Eval, Vars, Operator } from '../types';

export type Variable = {
  $let: Operator<{ vars: Record<string, Expr>; in: Expr }, Eval>;
};

export const variable: Variable = {
  /**
   * Binds variables for use in the specified expression, and returns the result of the expression.
   *
   * @param args The variables and the expression (expressions evaluating to any types).
   * @param vars The variables.
   *
   * @returns The result of the expression.
   *
   * @example $let({ vars: { age: 24 }, in: { isAdult: { $gte: ['$$age', 18] } } }) // { isAdult: true }
   */
  $let(args: { vars: Record<string, Expr>; in: Expr }, vars: Vars): Eval {
    const variables = Object.fromEntries(
      Object.entries(args.vars).map(([key, value]) => {
        return [`$${key}`, expry(value, vars)];
      })
    );
    return expry(args.in, { ...vars, ...variables });
  },
};
