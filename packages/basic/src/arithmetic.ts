import { Executions } from "@expry/system";

export type ArithmeticOperations = {
  abs: {
    params: unknown;
    return: number;
  };
  add: {
    params: unknown[];
    return: number;
  };
  ceil: {
    params: unknown;
    return: number;
  };
  divide: {
    params: [unknown, unknown];
    return: number;
  };
  floor: {
    params: unknown;
    return: number;
  };
  mod: {
    params: [unknown, unknown];
    return: number;
  };
  multiply: {
    params: unknown[];
    return: number;
  };
  pow: {
    params: [unknown, unknown];
    return: number;
  };
  round: {
    params: [unknown, unknown];
    return: number;
  };
  subtract: {
    params: [unknown, unknown];
    return: number;
  };
  trunc: {
    params: [unknown, unknown];
    return: number;
  };
};

export const arithmeticOperations: Executions<ArithmeticOperations> = {
  /**
   * Returns the absolute value of a number.
   *
   * @example $abs(-5) // 5
   * @example $abs(5) // 5
   */
  abs(args, vars, expry) {
    const num = expry(args, vars) as number;
    return Math.abs(num);
  },

  /**
   * Adds numbers together.
   *
   * @example $add([1, 2, 3]) // 6
   * @example $add([-1, 2, -3, 4]) // 2
   */
  add(args, vars, expry) {
    return args.reduce((acc: number, expr) => {
      const number = expry(expr, vars) as number;
      return acc + number;
    }, 0);
  },

  /**
   * Returns the smallest integer greater than or equal to the specified number.
   *
   * @example $ceil(5.5) // 6
   * @example $ceil(5.1) // 6
   * @example $ceil(-2.8) // -2
   */
  ceil(args, vars, expry) {
    const number = expry(args, vars) as number;
    return Math.ceil(number);
  },

  /**
   * Divides one number by another.
   *
   * @example $divide([10, 2]) // 5
   * @example $divide([5, 2]) // 2.5
   */
  divide(args, vars, expry) {
    const number1 = expry(args[0], vars) as number;
    const number2 = expry(args[1], vars) as number;
    return number1 / number2;
  },

  /**
   * Returns the largest integer less than or equal to the specified number.
   *
   * @example $floor(5.5) // 5
   * @example $floor(5.1) // 5
   * @example $floor(-2.8) // -3
   */
  floor(args, vars, expry) {
    const number = expry(args, vars) as number;
    return Math.floor(number);
  },

  /**
   * Divides one number by another and returns the remainder.
   *
   * @example $mod([10, 3]) // 1
   * @example $mod([10, 2]) // 0
   */
  mod(args, vars, expry) {
    const number1 = expry(args[0], vars) as number;
    const number2 = expry(args[1], vars) as number;
    return number1 % number2;
  },

  /**
   * Multiplies numbers together.
   *
   * @example $multiply([1, 2, 3]) // 6
   * @example $multiply([-1, 2, -3, 4]) // 24
   */
  multiply(args, vars, expry) {
    return args.reduce((acc: number, expr) => {
      const number = expry(expr, vars) as number;
      return acc * number;
    }, 1);
  },

  /**
   * Raises a number to the specified exponent.
   *
   * @example $pow([2, 3]) // 8
   * @example $pow([3, 2]) // 9
   * @example $pow([9, 0.5]) // 3
   */
  pow(args, vars, expry) {
    const number1 = expry(args[0], vars) as number;
    const number2 = expry(args[1], vars) as number;
    return Math.pow(number1, number2);
  },

  /**
   * Rounds a number to a specified decimal place.
   *
   * @example $round([5.4, 0]) // 5
   * @example $round([5.55, 1]) // 5.6
   * @example $round([5.55, 3]) // 5.55
   */
  round(args, vars, expry) {
    const number = expry(args[0], vars) as number;
    const places = expry(args[1], vars) as number;
    const factor = Math.pow(10, places);
    return Math.round(number * factor) / factor;
  },

  /**
   * Subtracts one number from another.
   *
   * @example $subtract([5, 3]) // 2
   * @example $subtract([3, 5]) // -2
   */
  subtract(args, vars, expry) {
    const number1 = expry(args[0], vars) as number;
    const number2 = expry(args[1], vars) as number;
    return number1 - number2;
  },

  /**
   * Truncates a number to the specified number of decimal places.
   *
   * @example $trunc(5.55, 0) // 5
   * @example $trunc(5.55, 1) // 5.5
   * @example $trunc(5.55, 3) // 5.55
   */
  trunc(args, vars, expry) {
    const number = expry(args[0], vars) as number;
    const places = expry(args[1], vars) as number;
    const factor = Math.pow(10, places);
    return Math.trunc(number * factor) / factor;
  },
};
