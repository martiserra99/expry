import { Operations } from "@expry/system";

export type BooleanPrototypes = {
  and: {
    params: unknown[];
    return: boolean;
  };
  not: {
    params: unknown;
    return: boolean;
  };
  or: {
    params: unknown[];
    return: boolean;
  };
};

export const booleanOperations: Operations<BooleanPrototypes> = {
  /**
   * Evaluates one or more expressions and returns true if all of the expressions are true. Otherwise, it returns false.
   *
   * @example $and([true, true, true]) // true
   * @example $and([true, false, true]) // false
   */
  and(args, vars, expry) {
    return args.every((expr) => {
      const boolean = expry(expr, vars) as boolean;
      return boolean;
    });
  },

  /**
   * Evaluates a boolean and returns the opposite boolean value.
   *
   * @example $not(true) // false
   * @example $not(false) // true
   */
  not(args, vars, expry) {
    const boolean = expry(args, vars) as boolean;
    return !boolean;
  },

  /**
   * Evaluates one or more expressions and returns true if any of the expressions are true. Otherwise, it returns false.
   *
   * @example $or([true, false, true]) // true
   * @example $or([false, false, false]) // false
   */
  or(args, vars, expry) {
    return args.some((expr) => {
      const boolean = expry(expr, vars) as boolean;
      return boolean;
    });
  },
};
