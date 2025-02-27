import { Operations } from "@expry/system";

export type ArithmeticPrototypes = {
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
  exp: {
    params: unknown;
    return: number;
  };
  floor: {
    params: unknown;
    return: number;
  };
  ln: {
    params: unknown;
    return: number;
  };
  log: {
    params: [unknown, unknown];
    return: number;
  };
  log10: {
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
  sqrt: {
    params: unknown;
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

export const arithmeticOperations: Operations<ArithmeticPrototypes> = {
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
   * @example $add([1, 2, 3, 4]) // 10
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
   */
  ceil(args, vars, expry) {
    const number = expry(args, vars) as number;
    return Math.ceil(number);
  },

  /**
   * Divides one number by another.
   *
   * @example $divide([10, 2]) // 5
   * @example $divide([10, 3]) // 3.3333333333333335
   */
  divide(args, vars, expry) {
    const number1 = expry(args[0], vars) as number;
    const number2 = expry(args[1], vars) as number;
    return number1 / number2;
  },

  /**
   * Raises Euler's number to the specified exponent.
   *
   * @example $exp(1) // 2.718281828459045
   * @example $exp(2) // 7.3890560989306495
   */
  exp(args, vars, expry) {
    const number = expry(args, vars) as number;
    return Math.exp(number);
  },

  /**
   * Returns the largest integer less than or equal to the specified number.
   *
   * @example $floor(5.5) // 5
   * @example $floor(5.1) // 5
   */
  floor(args, vars, expry) {
    const number = expry(args, vars) as number;
    return Math.floor(number);
  },

  /**
   * Returns the natural logarithm of a number.
   *
   * @example $ln(1) // 0
   * @example $ln(2.718281828459045) // 1
   */
  ln(args, vars, expry) {
    const number = expry(args, vars) as number;
    return Math.log(number);
  },

  /**
   * Returns the logarithm of a number in a specified base.
   *
   * @example $log([10, 10]) // 1
   * @example $log([100, 10]) // 2
   */
  log(args, vars, expry) {
    const number1 = expry(args[0], vars) as number;
    const number2 = expry(args[1], vars) as number;
    return Math.log(number1) / Math.log(number2);
  },

  /**
   * Returns the base 10 logarithm of a number.
   *
   * @example $log10(1) // 0
   * @example $log10(10) // 1
   */
  log10(args, vars, expry) {
    const number = expry(args, vars) as number;
    return Math.log10(number);
  },

  /**
   * Returns the remainder of dividing one number by another.
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
   */
  pow(args, vars, expry) {
    const number1 = expry(args[0], vars) as number;
    const number2 = expry(args[1], vars) as number;
    return Math.pow(number1, number2);
  },

  /**
   * Rounds a number to the nearest integer.
   *
   * @example $round([5.5, 0]) // 6
   * @example $round([5.5, 1]) // 5.5
   */
  round(args, vars, expry) {
    const number = expry(args[0], vars) as number;
    const places = expry(args[1], vars) as number;
    const factor = Math.pow(10, places);
    return Math.round(number * factor) / factor;
  },

  /**
   * Returns the square root of a number.
   *
   * @example $sqrt(4) // 2
   * @example $sqrt(9) // 3
   */
  sqrt(args, vars, expry) {
    const number = expry(args, vars) as number;
    return Math.sqrt(number);
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
   * @example $trunc(5.5) // 5
   * @example $trunc(5.5, 1) // 5.5
   */
  trunc(args, vars, expry) {
    const number = expry(args[0], vars) as number;
    const places = expry(args[1], vars) as number;
    const factor = Math.pow(10, places);
    return Math.trunc(number * factor) / factor;
  },
};
