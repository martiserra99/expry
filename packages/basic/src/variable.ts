import { Executions } from "@expry/system";

export type VariableOperations = {
  let: {
    params: { vars: Record<string, unknown>; in: unknown };
    return: unknown;
  };
};

export const variableOperations: Executions<VariableOperations> = {
  /**
   * Creates variables that are used during the evaluation of an expression, and returns the expression's outcome.
   *
   * @example $let({ vars: { age: 24 }, in: { isAdult: { $gte: ['$$age', 18] } } }) // { isAdult: true }
   */
  let(args, vars, expry) {
    const variables = Object.fromEntries(
      Object.entries(args.vars).map(([key, value]) => {
        return [`$${key}`, expry(value, vars)];
      })
    );
    return expry(args.in, { ...vars, ...variables });
  },
};
