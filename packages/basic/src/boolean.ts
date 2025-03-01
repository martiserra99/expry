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
   * Returns true if all expressions are true.
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
   * Returns the opposite boolean value.
   *
   * @example $not(true) // false
   * @example $not(false) // true
   */
  not(args, vars, expry) {
    const boolean = expry(args, vars) as boolean;
    return !boolean;
  },

  /**
   * Returns true if any of the expressions are true.
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
