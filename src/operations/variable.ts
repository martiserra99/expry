import { expry } from "..";

import { Expression, Evaluation, Variables, Operation } from "../types";

export type Variable = {
  $let: Operation<{ vars: Record<string, Expression>; in: Expression }, Evaluation>;
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
  $let(args: { vars: Record<string, Expression>; in: Expression }, vars: Variables): Evaluation {
    const variables = Object.fromEntries(
      Object.entries(args.vars).map(([key, value]) => {
        return [`$${key}`, expry(value, vars)];
      })
    );
    return expry(args.in, { ...vars, ...variables });
  },
};
