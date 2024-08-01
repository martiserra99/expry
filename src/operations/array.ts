import { expry } from "..";

import { Value, Variables, Operation } from "../types";

import { assert, isNumber, isString, isArray } from "../assert";

export type Array = {
  $arrayElemAt: Operation<[Value, Value], Value>;
  $concatArrays: Operation<Value[], Value[]>;
  $filter: Operation<{ input: Value; cond: Value; as: Value }, Value[]>;
  $firstN: Operation<{ input: Value; n: Value }, Value[]>;
  $in: Operation<[Value, Value], boolean>;
  $indexOfArray: Operation<[Value, Value], number>;
  $lastN: Operation<{ input: Value; n: Value }, Value[]>;
  $map: Operation<{ input: Value; as: Value; in: Value }, Value[]>;
  $maxN: Operation<{ input: Value; n: Value }, number[] | string[]>;
  $minN: Operation<{ input: Value; n: Value }, number[] | string[]>;
  $reduce: Operation<{ input: Value; initialValue: Value; in: Value }, Value>;
  $reverseArray: Operation<Value, Value[]>;
  $size: Operation<Value, number>;
  $slice: Operation<[Value, Value, Value], Value[]>;
  $sortArray: Operation<{ input: Value; sortBy: Value }, Value[]>;
};

export const array: Array = {
  /**
   * Returns the element at the specified index in an array.
   *
   * @param args The array and the index (expressions evaluating to an array and a number).
   * @param vars The variables.
   *
   * @returns The element at the specified index in the array.
   *
   * @example $arrayElemAt([1, 2, 3], 0) // 1
   * @example $arrayElemAt([1, 2, 3], 1) // 2
   * @example $arrayElemAt([1, 2, 3], 3) // null
   */
  $arrayElemAt(args: [Value, Value], vars: Variables): Value {
    const array = expry(args[0], vars);
    assert<Value[]>(array, [isArray([])], "The $arrayElemAt operator requires an array as the first argument.");
    const index = expry(args[1], vars);
    assert<number>(index, [isNumber], "The $arrayElemAt operator requires a number as the second argument.");
    if (index < 0 || index >= array.length) return null;
    return array[index];
  },

  /**
   * Returns the concatenation of arrays.
   *
   * @param args The arrays (expressions evaluating to arrays).
   * @param vars The variables.
   *
   * @returns The concatenation of the arrays.
   *
   * @example $concatArrays([[1, 2], [3, 4]]) // [1, 2, 3, 4]
   * @example $concatArrays([['hello', ' '], ['world']]) // ['hello', ' ', 'world']
   * @example $concatArrays([['hello', ' '], [['world']]]) // ['hello', ' ', ['world']]
   */
  $concatArrays(args: Value[], vars: Variables): Value[] {
    return args.reduce((acc: Value[], expr: Value) => {
      const array = expry(expr, vars);
      assert<Value[]>(array, [isArray([])], "The $concatArrays operator requires arrays as arguments.");
      return acc.concat(array);
    }, []);
  },

  /**
   * Returns a subset of an array based on the specified condition.
   *
   * @param args The array, the condition, and the variable name (expressions evaluating to an array, a boolean, and a string).
   * @param vars The variables.
   *
   * @returns The subset of the array.
   *
   * @example $filter({ input: [1, 2, 3, 4], as: 'num', cond: { $gt: ['$$num', 2] } }) // [3, 4]
   */
  $filter(args: { input: Value; cond: Value; as: Value }, vars: Variables): Value[] {
    const array = expry(args.input, vars) as Value[];
    assert<Value[]>(array, [isArray([])], "The $filter operator requires an array as the input argument.");
    const as = expry(args.as, vars) as string;
    assert<string>(as, [isString], "The $filter operator requires a string as the as argument.");
    return array.filter(value => {
      return expry(args.cond, { ...vars, [`$${as}`]: value });
    });
  },

  /**
   * Returns a specified number of elements from the beginning of an array.
   *
   * @param args The array and the number of elements (expressions evaluating to an array and a number).
   * @param vars The variables.
   *
   * @returns The specified number of elements from the beginning of the array.
   *
   * @example $firstN({ n: 2, input: [1, 2, 3] }) // [1, 2]
   * @example $firstN({ n: 3, input: [1, 2] } }) // [1, 2]
   * @example $firstN({ n: 2, input: [1] } }) // [1]
   */
  $firstN(args: { input: Value; n: Value }, vars: Variables): Value[] {
    const array = expry(args.input, vars);
    assert<Value[]>(array, [isArray([])], "The $firstN operator requires an array as the input argument.");
    const n = expry(args.n, vars);
    assert<number>(n, [isNumber], "The $firstN operator requires a number as the n argument.");
    return array.slice(0, n);
  },

  /**
   * Returns a boolean indicating whether a value is in an array.
   *
   * @param args The value and the array (expressions evaluating to any type and an array).
   * @param vars The variables.
   *
   * @returns A boolean indicating whether the value is in the array.
   *
   * @example $in({ $in: [2, [1, 2, 3]] }) // true
   * @example $in({ $in: [4, [1, 2, 3]] }) // false
   * @example $in({ $in: ['world', ['hello', 'world']] }) // true
   */
  $in(args: [Value, Value], vars: Variables): boolean {
    const value = expry(args[0], vars);
    const array = expry(args[1], vars);
    assert<Value[]>(array, [isArray([])], "The $in operator requires an array as the second argument.");
    return array.includes(value);
  },

  /**
   * Returns the index of the first occurrence of a value in an array. If the value is not in the array, it returns -1.
   *
   * @param args The value and the array (expressions evaluating to any type and an array).
   * @param vars The variables.
   *
   * @returns The index of the first occurrence of the value in the array.
   *
   * @example $indexOfArray([['a', 'abc'], 'a']) // 0
   * @example $indexOfArray([[1, 2], 5]) // -1
   */
  $indexOfArray(args: [Value, Value], vars: Variables): number {
    const array = expry(args[0], vars);
    assert<Value[]>(array, [isArray([])], "The $indexOfArray operator requires an array as the first argument.");
    const value = expry(args[1], vars);
    return array.indexOf(value);
  },

  /**
   * Returns a specified number of elements from the end of an array.
   *
   * @param args The array and the number of elements (expressions evaluating to an array and a number).
   * @param vars The variables.
   *
   * @returns The specified number of elements from the end of the array.
   *
   * @example $lastN({ n: 2, input: [1, 2, 3] }) // [2, 3]
   * @example $lastN({ n: 3, input: [1, 2] } }) // [1, 2]
   * @example $lastN({ n: 2, input: [1] } }) // [1]
   */
  $lastN(args: { input: Value; n: Value }, vars: Variables): Value[] {
    const array = expry(args.input, vars);
    assert<Value[]>(array, [isArray([])], "The $lastN operator requires an array as the input argument.");
    const n = expry(args.n, vars);
    assert<number>(n, [isNumber], "The $lastN operator requires a number as the n argument.");
    return array.slice(-n);
  },

  /**
   * Applies a specified expression to each element of an array and returns the result.
   *
   * @param args The array, the variable name, and the expression (expressions evaluating to an array, a string, and any type).
   * @param vars The variables.
   *
   * @returns The result of applying the expression to each element of the array.
   *
   * @example $map({ input: [1, 2, 3], as: 'num', in: { $add: ['$$num', 1] } }) // [2, 3, 4]
   * @example $map({ input: ['a', 'b'], as: 'str', in: { $toUpper: '$$str' } }) // ['A', 'B']
   */
  $map(args: { input: Value; as: Value; in: Value }, vars: Variables): Value[] {
    const array = expry(args.input, vars);
    assert<Value[]>(array, [isArray([])], "The $map operator requires an array as the input argument.");
    const as = expry(args.as, vars);
    assert<string>(as, [isString], "The $map operator requires a string as the as argument.");
    return array.map(value => {
      return expry(args.in, { ...vars, [`$${as}`]: value });
    });
  },

  /**
   * Returns the largest values in an array.
   *
   * @param args The array and the number of values (expressions evaluating to an array and a number).
   * @param vars The variables.
   *
   * @returns The largest values in the array.
   *
   * @example $maxN({ n: 2, input: [3, 7, 2, 4] } }) // [7, 4]
   * @example $maxN({ n: 3, input: [3, 7, 2, 4] } }) // [7, 4, 3]
   * @example $maxN({ n: 5, input: [3, 7, 2, 4] } }) // [7, 4, 3, 2]
   */
  $maxN(args: { input: Value; n: Value }, vars: Variables): number[] | string[] {
    const array = expry(args.input, vars);
    assert<number[] | string[]>(
      array,
      [isArray([isNumber]), isArray([isString])],
      "The $maxN operator requires an array of numbers or an array of strings as the input argument."
    );
    const n = expry(args.n, vars);
    assert<number>(n, [isNumber], "The $maxN operator requires a number as the n argument.");
    return array.sort((a: string | number, b: string | number) => (b > a ? 1 : -1)).slice(0, n);
  },

  /**
   * Returns the smallest values in an array.
   *
   * @param args The array and the number of values (expressions evaluating to an array and a number).
   * @param vars The variables.
   *
   * @returns The smallest values in the array.
   *
   * @example $minN({ n: 2, input: [3, 7, 2, 4] } }) // [2, 3]
   * @example $minN({ n: 3, input: [3, 7, 2, 4] } }) // [2, 3, 4]
   * @example $minN({ n: 5, input: [3, 7, 2, 4] } }) // [2, 3, 4, 7]
   */
  $minN(args: { input: Value; n: Value }, vars: Variables): number[] | string[] {
    const array = expry(args.input, vars);
    assert<number[] | string[]>(
      array,
      [isArray([isNumber]), isArray([isString])],
      "The $minN operator requires an array of numbers or an array of strings as the input argument."
    );
    const n = expry(args.n, vars);
    assert<number>(n, [isNumber], "The $minN operator requires a number as the n argument.");
    return array.sort((a: string | number, b: string | number) => (a > b ? 1 : -1)).slice(0, n);
  },

  /**
   * Accumulates the elements of an array using an expression and returns the result.
   *
   * @param args The array, the initial value, and the expression (expressions evaluating to an array, any type, and any type).
   * @param vars The variables.
   *
   * @returns The result of accumulating the elements of the array.
   *
   * @example $reduce({ input: ['a', 'b', 'c'], initialValue: '', in: { $concat: ['$$value', '$$this'] } }) // 'abc'
   * @example $reduce({ input: [1, 2, 3], initialValue: 0, in: { $add: ['$$value', '$$this'] } } }) // 6
   */
  $reduce(args: { input: Value; initialValue: Value; in: Value }, vars: Variables): Value {
    const array = expry(args.input, vars);
    assert<Value[]>(array, [isArray([])], "The $reduce operator requires an array as the input argument.");
    const initialValue = expry(args.initialValue, vars);
    return array.reduce((acc, value) => {
      return expry(args.in, { ...vars, $value: acc, $this: value });
    }, initialValue);
  },

  /**
   * Reverses the elements of an array.
   *
   * @param args The array (expression evaluating to an array).
   * @param vars The variables.
   *
   * @returns The reversed array.
   *
   * @example $reverseArray([4, 2, 3]) // [3, 2, 4]
   * @example $reverseArray(['a', 'c', 'b']) // ['b', 'c', 'a']
   */
  $reverseArray(args: Value, vars: Variables): Value[] {
    const array = expry(args, vars);
    assert<Value[]>(array, [isArray([])], "The $reverseArray operator requires an array as argument.");
    return array.reverse();
  },

  /**
   * Returns the number of elements in an array.
   *
   * @param args The array (expression evaluating to an array).
   * @param vars The variables.
   *
   * @returns The number of elements in the array.
   *
   * @example $size([1, 2, 3]) // 3
   * @example $size(['a', 'b', 'c', 'd']) // 4
   * @example $size([]) // 0
   */
  $size(args: Value, vars: Variables): number {
    const array = expry(args, vars);
    assert<Value[]>(array, [isArray([])], "The $size operator requires an array as argument.");
    return array.length;
  },

  /**
   * Returns a subset of an array.
   *
   * @param args The array, the starting index, and the number of elements (expressions evaluating to an array, a number, and a number).
   * @param vars The variables.
   *
   * @returns The subset of the array.
   *
   * @example $slice([[1, 2, 3], 1, 1]) // [2]
   * @example $slice([[1, 2, 3], 1, 2]) // [2, 3]
   * @example $slice([[1, 2, 3], 1, 3]) // [2, 3]
   * @example $slice([[1, 2, 3], 3, 2]) // []
   */
  $slice(args: [Value, Value, Value], vars: Variables): Value[] {
    const array = expry(args[0], vars);
    assert<Value[]>(array, [isArray([])], "The $slice operator requires an array as the first argument.");
    const position = expry(args[1], vars);
    assert<number>(position, [isNumber], "The $slice operator requires a number as the second argument.");
    const n = expry(args[2], vars);
    assert<number>(n, [isNumber], "The $slice operator requires a number as the third argument.");
    return array.slice(position, position + n);
  },

  /**
   * Sorts the elements of an array.
   *
   * @param args The array and the expression to sort by (expressions evaluating to an array and a number).
   * @param vars The variables.
   *
   * @returns The sorted array.
   *
   * @example $sortArray({ input: [3, 4, 2], sortBy: { $cmp: ['$$first', '$$second'] } }) // [2, 3, 4]
   * @example $sortArray({ input: [3, 4, 2], sortBy: { $cmp: ['$$second', '$$first'] } }) // [4, 3, 2]
   */
  $sortArray(args: { input: Value; sortBy: Value }, vars: Variables): Value[] {
    const array = expry(args.input, vars) as Value[];
    assert<Value[]>(array, [isArray([])], "The $sortArray operator requires an array as the input argument.");
    return array.sort((a, b) => {
      const variables = { ...vars, $first: a, $second: b };
      const number = expry(args.sortBy, variables);
      assert<number>(number, [isNumber], "The $sortArray operator requires a number as the sortBy argument.");
      return number;
    });
  },
};
