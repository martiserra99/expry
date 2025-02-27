import { Operations } from "@expry/system";

export type ComparisonPrototypes = {
  cmp: {
    params: [unknown, unknown];
    return: number;
  };
  eq: {
    params: [unknown, unknown];
    return: boolean;
  };
  gt: {
    params: [unknown, unknown];
    return: boolean;
  };
  gte: {
    params: [unknown, unknown];
    return: boolean;
  };
  lt: {
    params: [unknown, unknown];
    return: boolean;
  };
  lte: {
    params: [unknown, unknown];
    return: boolean;
  };
  ne: {
    params: [unknown, unknown];
    return: boolean;
  };
};

export const comparisonOperations: Operations<ComparisonPrototypes> = {
  /**
   * Compares two values and returns -1 if the first is less than the second, 1 if the first is greater than the second, and 0 if the two values are equal.
   *
   * @example $cmp([3, 5]) // -1
   * @example $cmp([5, 3]) // 1
   * @example $cmp([3, 3]) // 0
   */
  cmp(args, vars, expry) {
    const a = expry(args[0], vars) as number | string;
    const b = expry(args[1], vars) as number | string;
    return a < b ? -1 : a > b ? 1 : 0;
  },

  /**
   * Compares two values and returns true if they are equal. Otherwise, it returns false.
   *
   * @example $eq([3, 3]) // true
   * @example $eq(['hello', 'bye']) // false
   */
  eq(args, vars, expry): boolean {
    const a = expry(args[0], vars);
    const b = expry(args[1], vars);
    return a === b;
  },

  /**
   * Compares two values and returns true if the first is greater than the second. Otherwise, it returns false.
   *
   * @example $gt([5, 3]) // true
   * @example $gt([3, 5]) // false
   * @example $gt([3, 3]) // false
   */
  gt(args, vars, expry): boolean {
    const a = expry(args[0], vars) as number | string;
    const b = expry(args[1], vars) as number | string;
    return a > b;
  },

  /**
   * Compares two values and returns true if the first is greater than or equal to the second. Otherwise, it returns false.
   *
   * @example $gte([5, 3]) // true
   * @example $gte([3, 5]) // false
   * @example $gte([3, 3]) // true
   */
  gte(args, vars, expry): boolean {
    const a = expry(args[0], vars) as number | string;
    const b = expry(args[1], vars) as number | string;
    return a >= b;
  },

  /**
   * Compares two values and returns true if the first is less than the second. Otherwise, it returns false.
   *
   * @example $lt([3, 5]) // true
   * @example $lt([5, 3]) // false
   * @example $lt([3, 3]) // false
   */
  lt(args, vars, expry): boolean {
    const a = expry(args[0], vars) as number | string;
    const b = expry(args[1], vars) as number | string;
    return a < b;
  },

  /**
   * Compares two values and returns true if the first is less than or equal to the second. Otherwise, it returns false.
   *
   * @example $lte([3, 5]) // true
   * @example $lte([5, 3]) // false
   * @example $lte([3, 3]) // true
   */
  lte(args, vars, expry): boolean {
    const a = expry(args[0], vars) as number | string;
    const b = expry(args[1], vars) as number | string;
    return a <= b;
  },

  /**
   * Compares two values and returns true if they are not equal. Otherwise, it returns false.
   *
   * @example $ne([3, 3]) // false
   * @example $ne(['hello', 'bye']) // true
   */
  ne(args, vars, expry): boolean {
    const a = expry(args[0], vars);
    const b = expry(args[1], vars);
    return a !== b;
  },
};
