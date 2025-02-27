import { Operations } from "@expry/system";

export type ArrayPrototypes = {
  arrayElemAt: {
    params: [unknown, unknown];
    return: unknown;
  };
  concatArrays: {
    params: unknown[];
    return: unknown[];
  };
  filter: {
    params: { input: unknown; cond: unknown; as: unknown };
    return: unknown[];
  };
  firstN: {
    params: { input: unknown; n: unknown };
    return: unknown[];
  };
  in: {
    params: [unknown, unknown];
    return: boolean;
  };
  indexOfArray: {
    params: [unknown, unknown];
    return: number;
  };
  lastN: {
    params: { input: unknown; n: unknown };
    return: unknown[];
  };
  map: {
    params: { input: unknown; as: unknown; in: unknown };
    return: unknown[];
  };
  maxN: {
    params: { input: unknown; n: unknown };
    return: number[] | string[];
  };
  minN: {
    params: { input: unknown; n: unknown };
    return: number[] | string[];
  };
  reduce: {
    params: { input: unknown; initialValue: unknown; in: unknown };
    return: unknown;
  };
  reverseArray: {
    params: unknown;
    return: unknown[];
  };
  size: {
    params: unknown;
    return: number;
  };
  slice: {
    params: [unknown, unknown, unknown];
    return: unknown[];
  };
  sortArray: {
    params: { input: unknown; sortBy: unknown };
    return: unknown[];
  };
};

export const arrayOperations: Operations<ArrayPrototypes> = {
  /**
   * Returns the element at the specified index in an array.
   *
   * @example $arrayElemAt([1, 2, 3], 0) // 1
   * @example $arrayElemAt([1, 2, 3], 1) // 2
   * @example $arrayElemAt([1, 2, 3], 3) // null
   */
  arrayElemAt(args, vars, expry) {
    const array = expry(args[0], vars) as unknown[];
    const index = expry(args[1], vars) as number;
    if (index < 0 || index >= array.length) return null;
    return array[index];
  },

  /**
   * Returns the concatenation of arrays.
   *
   * @example $concatArrays([[1, 2], [3, 4]]) // [1, 2, 3, 4]
   * @example $concatArrays([['hello', ' '], ['world']]) // ['hello', ' ', 'world']
   * @example $concatArrays([['hello', ' '], [['world']]]) // ['hello', ' ', ['world']]
   */
  concatArrays(args, vars, expry) {
    return args.reduce((acc: unknown[], expr: unknown) => {
      const array = expry(expr, vars) as unknown[];
      return acc.concat(array);
    }, []);
  },

  /**
   * Returns a subset of an array based on the specified condition.
   *
   * @example $filter({ input: [1, 2, 3, 4], as: 'num', cond: { $gt: ['$$num', 2] } }) // [3, 4]
   */
  filter(args, vars, expry) {
    const array = expry(args.input, vars) as unknown[];
    const as = expry(args.as, vars) as string;
    return array.filter((value) => {
      return expry(args.cond, { ...vars, [`$${as}`]: value });
    });
  },

  /**
   * Returns a specified number of elements from the beginning of an array.
   *
   * @example $firstN({ n: 2, input: [1, 2, 3] }) // [1, 2]
   * @example $firstN({ n: 3, input: [1, 2] } }) // [1, 2]
   * @example $firstN({ n: 2, input: [1] } }) // [1]
   */
  firstN(args, vars, expry) {
    const array = expry(args.input, vars) as unknown[];
    const n = expry(args.n, vars) as number;
    return array.slice(0, n);
  },

  /**
   * Returns a boolean indicating whether a value is in an array.
   *
   * @example $in({ $in: [2, [1, 2, 3]] }) // true
   * @example $in({ $in: [4, [1, 2, 3]] }) // false
   * @example $in({ $in: ['world', ['hello', 'world']] }) // true
   */
  in(args, vars, expry) {
    const value = expry(args[0], vars);
    const array = expry(args[1], vars) as unknown[];
    return array.includes(value);
  },

  /**
   * Returns the index of the first occurrence of a value in an array. If the value is not in the array, it returns -1.
   *
   * @example $indexOfArray([['a', 'abc'], 'a']) // 0
   * @example $indexOfArray([[1, 2], 5]) // -1
   */
  indexOfArray(args, vars, expry) {
    const array = expry(args[0], vars) as unknown[];
    const value = expry(args[1], vars);
    return array.indexOf(value);
  },

  /**
   * Returns a specified number of elements from the end of an array.
   *
   * @example $lastN({ n: 2, input: [1, 2, 3] }) // [2, 3]
   * @example $lastN({ n: 3, input: [1, 2] } }) // [1, 2]
   * @example $lastN({ n: 2, input: [1] } }) // [1]
   */
  lastN(args, vars, expry) {
    const array = expry(args.input, vars) as unknown[];
    const n = expry(args.n, vars) as number;
    return n > 0 ? array.slice(-n) : [];
  },

  /**
   * Applies a specified expression to each element of an array and returns the result.
   *
   * @example $map({ input: [1, 2, 3], as: 'num', in: { $add: ['$$num', 1] } }) // [2, 3, 4]
   * @example $map({ input: ['a', 'b'], as: 'str', in: { $toUpper: '$$str' } }) // ['A', 'B']
   */
  map(args, vars, expry) {
    const array = expry(args.input, vars) as unknown[];
    const as = expry(args.as, vars) as string;
    return array.map((value) => {
      return expry(args.in, { ...vars, [`$${as}`]: value });
    });
  },

  /**
   * Returns the largest values in an array.
   *
   * @example $maxN({ n: 2, input: [3, 7, 2, 4] } }) // [7, 4]
   * @example $maxN({ n: 3, input: [3, 7, 2, 4] } }) // [7, 4, 3]
   * @example $maxN({ n: 5, input: [3, 7, 2, 4] } }) // [7, 4, 3, 2]
   */
  maxN(args, vars, expry) {
    const array = expry(args.input, vars) as number[] | string[];
    const n = expry(args.n, vars) as number;
    return array
      .sort((a: string | number, b: string | number) => (b > a ? 1 : -1))
      .slice(0, n);
  },

  /**
   * Returns the smallest values in an array.
   *
   * @example $minN({ n: 2, input: [3, 7, 2, 4] } }) // [2, 3]
   * @example $minN({ n: 3, input: [3, 7, 2, 4] } }) // [2, 3, 4]
   * @example $minN({ n: 5, input: [3, 7, 2, 4] } }) // [2, 3, 4, 7]
   */
  minN(args, vars, expry) {
    const array = expry(args.input, vars) as number[] | string[];
    const n = expry(args.n, vars) as number;
    return array
      .sort((a: string | number, b: string | number) => (a > b ? 1 : -1))
      .slice(0, n);
  },

  /**
   * Accumulates the elements of an array using an expression and returns the result.
   *
   * @example $reduce({ input: ['a', 'b', 'c'], initialValue: '', in: { $concat: ['$$value', '$$this'] } }) // 'abc'
   * @example $reduce({ input: [1, 2, 3], initialValue: 0, in: { $add: ['$$value', '$$this'] } } }) // 6
   */
  reduce(args, vars, expry) {
    const array = expry(args.input, vars) as unknown[];
    const initialValue = expry(args.initialValue, vars);
    return array.reduce((acc, value) => {
      return expry(args.in, { ...vars, $value: acc, $this: value });
    }, initialValue);
  },

  /**
   * Reverses the elements of an array.
   *
   * @example $reverseArray([4, 2, 3]) // [3, 2, 4]
   * @example $reverseArray(['a', 'c', 'b']) // ['b', 'c', 'a']
   */
  reverseArray(args, vars, expry) {
    const array = expry(args, vars) as unknown[];
    return array.reverse();
  },

  /**
   * Returns the number of elements in an array.
   *
   * @example $size([1, 2, 3]) // 3
   * @example $size(['a', 'b', 'c', 'd']) // 4
   * @example $size([]) // 0
   */
  size(args, vars, expry) {
    const array = expry(args, vars) as unknown[];
    return array.length;
  },

  /**
   * Returns a subset of an array.
   *
   * @example $slice([[1, 2, 3], 1, 1]) // [2]
   * @example $slice([[1, 2, 3], 1, 2]) // [2, 3]
   * @example $slice([[1, 2, 3], 1, 3]) // [2, 3]
   * @example $slice([[1, 2, 3], 3, 2]) // []
   */
  slice(args, vars, expry): unknown[] {
    const array = expry(args[0], vars) as unknown[];
    const position = expry(args[1], vars) as number;
    const n = expry(args[2], vars) as number;
    return array.slice(position, position + n);
  },

  /**
   * Sorts the elements of an array.
   *
   * @example $sortArray({ input: [3, 4, 2], sortBy: { $cmp: ['$$first', '$$second'] } }) // [2, 3, 4]
   * @example $sortArray({ input: [3, 4, 2], sortBy: { $cmp: ['$$second', '$$first'] } }) // [4, 3, 2]
   */
  sortArray(args, vars, expry): unknown[] {
    const array = expry(args.input, vars) as unknown[];
    return array.sort((a, b) => {
      const variables = { ...vars, $first: a, $second: b };
      const number = expry(args.sortBy, variables) as number;
      return number;
    });
  },
};
