import { Operations } from "@expry/system";

export type ConditionalPrototypes = {
  cond: {
    params: { if: unknown; then: unknown; else: unknown };
    return: unknown;
  };
  ifNull: {
    params: unknown[];
    return: unknown;
  };
  switch: {
    params: { branches: { case: unknown; then: unknown }[]; default: unknown };
    return: unknown;
  };
};

export const conditionalOperations: Operations<ConditionalPrototypes> = {
  /**
   * Evaluates a boolean expression and based on the result, returns one of the two specified return expressions.
   *
   * @example $cond({ if: true, then: 'yes', else: 'no' }) // 'yes'
   * @example $cond({ if: false, then: 'yes', else: 'no' }) // 'no'
   */
  cond(args, vars, expry) {
    const condition = expry(args.if, vars) as boolean;
    return condition ? expry(args.then, vars) : expry(args.else, vars);
  },

  /**
   * Returns the first non-null expression, or null if all expressions are null.
   *
   * @example $ifNull([null, 'hello', 'bye']) // 'hello'
   * @example $ifNull([null, null, 'bye']) // 'bye'
   * @example $ifNull([null, null, null]) // null
   */
  ifNull(args, vars, expry) {
    for (const arg of args) {
      const value = expry(arg, vars);
      if (value !== null) return value;
    }
    return expry(args[args.length - 1], vars);
  },

  /**
   * Evaluates a series of case expressions and returns the value of the first expression that evaluates to true, or the default value if there is no expression that evaluates to true.
   *
   * @example $switch({ branches: [{ case: false, then: 1 }, { case: true, then: 2 }], default: 3 } }) // 2
   * @example $switch({ branches: [{ case: false, then: 1 }, { case: false, then: 2 }], default: 3 } }) // 3
   */
  switch(args, vars, expry) {
    for (const branch of args.branches) {
      const condition = expry(branch.case, vars) as boolean;
      if (condition) return expry(branch.then, vars);
    }
    return expry(args.default, vars);
  },
};
