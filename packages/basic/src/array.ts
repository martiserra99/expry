import { Operations } from "@expry/system";

export type ArrayPrototypes = {
  arrayElemAt: {
    params: [unknown, unknown];
    return: unknown;
  };
  arrayToObject: {
    params: unknown;
    return: Record<PropertyKey, unknown>;
  };
  concatArrays: {
    params: unknown[];
    return: unknown[];
  };
  every: {
    params: { input: unknown; as: unknown; cond: unknown };
    return: boolean;
  };
  filter: {
    params: { input: unknown; as: unknown; cond: unknown };
    return: unknown[];
  };
  find: {
    params: { input: unknown; as: unknown; cond: unknown };
    return: unknown;
  };
  findIndex: {
    params: { input: unknown; as: unknown; cond: unknown };
    return: number;
  };
  first: {
    params: unknown;
    return: unknown;
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
  last: {
    params: unknown;
    return: unknown;
  };
  lastN: {
    params: { input: unknown; n: unknown };
    return: unknown[];
  };
  length: {
    params: unknown;
    return: number;
  };
  map: {
    params: { input: unknown; as: unknown; in: unknown };
    return: unknown[];
  };
  max: {
    params: unknown;
    return: number | string | undefined;
  };
  maxN: {
    params: { input: unknown; n: unknown };
    return: number[] | string[];
  };
  min: {
    params: unknown;
    return: number | string | undefined;
  };
  minN: {
    params: { input: unknown; n: unknown };
    return: number[] | string[];
  };
  objectToArray: {
    params: unknown;
    return: [PropertyKey, unknown][];
  };
  pop: {
    params: unknown;
    return: unknown[];
  };
  push: {
    params: [unknown, unknown];
    return: unknown[];
  };
  reduce: {
    params: { input: unknown; initialValue: unknown; in: unknown };
    return: unknown;
  };
  reverseArray: {
    params: unknown;
    return: unknown[];
  };
  shift: {
    params: unknown;
    return: unknown[];
  };
  slice: {
    params: [unknown, unknown, unknown];
    return: unknown[];
  };
  some: {
    params: { input: unknown; as: unknown; cond: unknown };
    return: boolean;
  };
  sortArray: {
    params: { input: unknown; sortBy: unknown };
    return: unknown[];
  };
  splice: {
    params: {
      input: unknown;
      start: unknown;
      deleteCount: unknown;
      items: unknown;
    };
    return: unknown[];
  };
  unshift: {
    params: [unknown, unknown];
    return: unknown[];
  };
};

export const arrayOperations: Operations<ArrayPrototypes> = {
  /**
   * Returns the element at the specified index in an array.
   *
   * @example $arrayElemAt([1, 2, 3], 0) // 1
   * @example $arrayElemAt([1, 2, 3], 1) // 2
   * @example $arrayElemAt([1, 2, 3], 3) // undefined
   */
  arrayElemAt(args, vars, expry) {
    const array = expry(args[0], vars) as unknown[];
    const index = expry(args[1], vars) as number;
    return array[index];
  },

  /**
   * Converts an array of two-element arrays into an object.
   *
   * @example $arrayToObject([['a', 1], ['b', 2]]) // { a: 1, b: 2 }
   * @example $arrayToObject([['name', 'John'], ['age', 30]]) // { name: 'John', age: 30 }
   * @example $arrayToObject([['a', 1], ['b', 2], ['a', 3]]) // { a: 3, b: 2 }
   */
  arrayToObject(args, vars, expry) {
    const array = expry(args, vars) as [PropertyKey, unknown][];
    return array.reduce<Record<PropertyKey, unknown>>((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
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
   * Returns true if all elements in an array satisfy the specified condition.
   *
   * @example $every({ input: [1, 2, 3], as: 'num', cond: { $gt: ['$$num', 0] } }) // true
   * @example $every({ input: [1, 2, 3], as: 'num', cond: { $gt: ['$$num', 1] } }) // false
   */
  every(args, vars, expry) {
    const array = expry(args.input, vars) as unknown[];
    const as = expry(args.as, vars) as string;
    return array.every((value) => {
      return expry(args.cond, { ...vars, [`$${as}`]: value });
    });
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
   * Returns the first element in an array that satisfies the specified condition.
   *
   * @example $find({ input: [1, 2, 3], as: 'num', cond: { $gt: ['$$num', 1] } }) // 2
   * @example $find({ input: [1, 2, 3], as: 'num', cond: { $gt: ['$$num', 3] } }) // undefined
   */
  find(args, vars, expry) {
    const array = expry(args.input, vars) as unknown[];
    const as = expry(args.as, vars) as string;
    return array.find((value) => {
      return expry(args.cond, { ...vars, [`$${as}`]: value });
    });
  },

  /**
   * Returns the index of the first element in an array that satisfies the specified condition.
   *
   * @example $findIndex({ input: [1, 2, 3], as: 'num', cond: { $gt: ['$$num', 1] } }) // 1
   * @example $findIndex({ input: [1, 2, 3], as: 'num', cond: { $gt: ['$$num', 3] } }) // -1
   */
  findIndex(args, vars, expry) {
    const array = expry(args.input, vars) as unknown[];
    const as = expry(args.as, vars) as string;
    return array.findIndex((value) => {
      return expry(args.cond, { ...vars, [`$${as}`]: value });
    });
  },

  /**
   * Returns the first element of an array.
   *
   * @example $first([1, 2, 3]) // 1
   * @example $first(['a', 'b', 'c']) // 'a'
   * @example $first([]) // undefined
   */
  first(args, vars, expry) {
    const array = expry(args, vars) as unknown[];
    return array[0];
  },

  /**
   * Returns the first N elements of an array.
   *
   * @example $firstN({ n: 2, input: [1, 2, 3] }) // [1, 2]
   * @example $firstN({ n: 3, input: [1, 2] } }) // [1, 2]
   * @example $firstN({ n: -1, input: [1, 2] } }) // []
   */
  firstN(args, vars, expry) {
    const array = expry(args.input, vars) as unknown[];
    const n = expry(args.n, vars) as number;
    return n > 0 ? array.slice(0, n) : [];
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
   * Returns the index of the first occurrence of a specified value in an array.
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
   * Returns the last element of an array.
   *
   * @example $last([1, 2, 3]) // 3
   * @example $last(['a', 'b', 'c']) // 'c'
   * @example $last([]) // undefined
   */
  last(args, vars, expry) {
    const array = expry(args, vars) as unknown[];
    return array[array.length - 1];
  },

  /**
   * Returns the last N elements of an array.
   *
   * @example $lastN({ n: 2, input: [1, 2, 3] }) // [2, 3]
   * @example $lastN({ n: 3, input: [1, 2] } }) // [1, 2]
   * @example $lastN({ n: -1, input: [1, 2] } }) // []
   */
  lastN(args, vars, expry) {
    const array = expry(args.input, vars) as unknown[];
    const n = expry(args.n, vars) as number;
    return n > 0 ? array.slice(-n) : [];
  },

  /**
   * Returns the number of elements in an array.
   *
   * @example $length([1, 2, 3]) // 3
   * @example $length(['a', 'b', 'c', 'd']) // 4
   * @example $length([]) // 0
   */
  length(args, vars, expry) {
    const array = expry(args, vars) as unknown[];
    return array.length;
  },

  /**
   * Applies an expression to each element in an array.
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
   * Returns the largest value in an array.
   *
   * @example $max([3, 7, 2, 4]) // 7
   * @example $max(['a', 'c', 'b']) // 'c'
   * @example $max([]) // undefined
   */
  max(args, vars, expry) {
    const array = expry(args, vars) as number[] | string[];
    return array.reduce((acc, value) => (value > acc ? value : acc), array[0]);
  },

  /**
   * Returns the N largest values in an array.
   *
   * @example $maxN({ n: 2, input: [3, 7, 2, 4] } }) // [7, 4]
   * @example $maxN({ n: 3, input: [3, 7, 2, 4] } }) // [7, 4, 3]
   * @example $maxN({ n: 5, input: [3, 7, 2, 4] } }) // [7, 4, 3, 2]
   */
  maxN(args, vars, expry) {
    const array = expry(args.input, vars) as number[] | string[];
    const n = expry(args.n, vars) as number;
    return array.sort((a, b) => (b > a ? 1 : -1)).slice(0, n);
  },

  /**
   * Returns the smallest value in an array.
   *
   * @example $min([3, 7, 2, 4]) // 2
   * @example $min(['a', 'c', 'b']) // 'a'
   * @example $min([]) // undefined
   */
  min(args, vars, expry) {
    const array = expry(args, vars) as number[] | string[];
    return array.reduce((acc, value) => (value < acc ? value : acc), array[0]);
  },

  /**
   * Returns the N smallest values in an array.
   *
   * @example $minN({ n: 2, input: [3, 7, 2, 4] } }) // [2, 3]
   * @example $minN({ n: 3, input: [3, 7, 2, 4] } }) // [2, 3, 4]
   * @example $minN({ n: 5, input: [3, 7, 2, 4] } }) // [2, 3, 4, 7]
   */
  minN(args, vars, expry) {
    const array = expry(args.input, vars) as number[] | string[];
    const n = expry(args.n, vars) as number;
    return array.sort((a, b) => (a > b ? 1 : -1)).slice(0, n);
  },

  /**
   * Converts an object to an array of key-value pairs.
   *
   * @example $objectToArray({ a: 1, b: 2 }) // [['a', 1], ['b', 2]]
   * @example $objectToArray({ name: 'John', age: 30 }) // [['name', 'John'], ['age', 30]]
   */
  objectToArray(args, vars, expry) {
    const object = expry(args, vars) as Record<PropertyKey, unknown>;
    return Object.entries(object);
  },

  /**
   * Removes the last element from an array and returns the array.
   *
   * @example $pop([1, 2, 3]) // [1, 2]
   * @example $pop(['a', 'b', 'c']) // ['a', 'b']
   * @example $pop([]) // []
   */
  pop(args, vars, expry) {
    const array = expry(args, vars) as unknown[];
    array.pop();
    return array;
  },

  /**
   * Adds an element to the end of an array and returns the array.
   *
   * @example $push([[1, 2], 3]) // [1, 2, 3]
   * @example $push([['a', 'b'], 'c']) // ['a', 'b', 'c']
   * @example $push([[], 'a']) // ['a']
   */
  push(args, vars, expry) {
    const array = expry(args[0], vars) as unknown[];
    const value = expry(args[1], vars);
    array.push(value);
    return array;
  },

  /**
   * Applies an expression to each element in an array and combines them into a single value.
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
   * Removes the first element from an array and returns the array.
   *
   * @example $shift([1, 2, 3]) // [2, 3]
   * @example $shift(['a', 'b', 'c']) // ['b', 'c']
   * @example $shift([]) // []
   */
  shift(args, vars, expry) {
    const array = expry(args, vars) as unknown[];
    array.shift();
    return array;
  },

  /**
   * Returns a subset of an array.
   *
   * @example $slice([1, 2, 3], 1, 2) // [2]
   * @example $slice([1, 2, 3], 1, 3) // [2, 3]
   * @example $slice([1, 2, 3], 1, 0) // []
   * @example $slice([1, 2, 3], 0, -1) // [1, 2]
   */
  slice(args, vars, expry) {
    const array = expry(args[0], vars) as unknown[];
    const start = expry(args[1], vars) as number;
    const end = expry(args[2], vars) as number;
    return array.slice(start, end);
  },

  /**
   * Returns true if at least one element in an array satisfies the specified condition.
   *
   * @example $some({ input: [1, 2, 3], as: 'num', cond: { $gt: ['$$num', 2] } }) // true
   * @example $some({ input: [1, 2, 3], as: 'num', cond: { $gt: ['$$num', 3] } }) // false
   */
  some(args, vars, expry) {
    const array = expry(args.input, vars) as unknown[];
    const as = expry(args.as, vars) as string;
    return array.some((value) => {
      return expry(args.cond, { ...vars, [`$${as}`]: value });
    });
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

  /**
   * Removes elements from an array and inserts new elements in their place.
   *
   * @example $splice({ input: [1, 2, 3], start: 1, deleteCount: 1, items: [4, 5] }) // [1, 4, 5, 3]
   * @example $splice({ input: ['a', 'b', 'c'], start: 1, deleteCount: 2, items: ['x', 'y', 'z'] }) // ['a', 'x', 'y', 'z']
   */
  splice(args, vars, expry) {
    const array = expry(args.input, vars) as unknown[];
    const start = expry(args.start, vars) as number;
    const deleteCount = expry(args.deleteCount, vars) as number;
    const items = expry(args.items, vars) as unknown[];
    array.splice(start, deleteCount, ...items);
    return array;
  },

  /**
   * Adds an element to the beginning of an array and returns the array.
   *
   * @example $unshift([[1, 2], 3]) // [3, 1, 2]
   * @example $unshift([['a', 'b'], 'c']) // ['c', 'a', 'b']
   * @example $unshift([[], 'a']) // ['a']
   */
  unshift(args, vars, expry) {
    const array = expry(args[0], vars) as unknown[];
    const value = expry(args[1], vars);
    array.unshift(value);
    return array;
  },
};
