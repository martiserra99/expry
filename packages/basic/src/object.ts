import { Executions } from "@expry/system";

export type ObjectOperations = {
  getValue: {
    params: { input: unknown; key: unknown };
    return: unknown;
  };
  mergeObjects: {
    params: unknown[];
    return: Record<PropertyKey, unknown>;
  };
  objectToArray: {
    params: unknown;
    return: [PropertyKey, unknown][];
  };
  setValue: {
    params: { input: unknown; key: unknown; value: unknown };
    return: Record<PropertyKey, unknown>;
  };
};

export const objectOperations: Executions<ObjectOperations> = {
  /**
   * Gets the value of a property in an object.
   *
   * @example $getValue({ input: { item: 'apple', qty: 25, price: 4.5 }, key: 'qty' }) // 25
   * @example $getValue({ input: { item: 'apple', price: 4.5 }, key: 'qty' }) // undefined
   */
  getValue(args, vars, expry) {
    const input = expry(args.input, vars) as Record<PropertyKey, unknown>;
    const key = expry(args.key, vars) as PropertyKey;
    return input[key];
  },

  /**
   * Merges objects into a single object.
   *
   * @example $mergeObjects([{ item: 'apple' }, { qty: 25, price: 4.5 }]) // { item: 'apple', qty: 25, price: 4.5 }
   * @example $mergeObjects([{ item: 'apple', qty: 10 }, { qty: 25 }, { price: 4.5 }]) // { item: 'apple', qty: 25, price: 4.5 }
   */
  mergeObjects(args, vars, expry) {
    return args.reduce((acc: Record<PropertyKey, unknown>, arg) => {
      const object = expry(arg, vars) as Record<PropertyKey, unknown>;
      return { ...acc, ...object };
    }, {});
  },

  /**
   * Converts an object to an array of key-value pairs.
   *
   * @example $objectToArray({ item: 'apple', qty: 25, price: 4.5 }) // [['item', 'apple'], ['qty', 25], ['price', 4.5]]
   * @example $objectToArray({ item: 'apple', price: 4.5 }) // [['item', 'apple'], ['price', 4.5]]
   */
  objectToArray(args, vars, expry) {
    const input = expry(args, vars) as Record<PropertyKey, unknown>;
    return Object.entries(input);
  },

  /**
   * Sets the value of a property in an object.
   *
   * @example $setValue({ input: { item: 'apple', qty: 25, price: 4.5 }, key: 'qty', value: 30 }) // { item: 'apple', qty: 30, price: 4.5 }
   * @example $setValue({ input: { item: 'apple', price: 4.5 }, key: 'qty', value: 30 }) // { item: 'apple', qty: 30, price: 4.5 }
   */
  setValue(args, vars, expry) {
    const input = expry(args.input, vars) as Record<PropertyKey, unknown>;
    const key = expry(args.key, vars) as PropertyKey;
    const value = expry(args.value, vars);
    input[key] = value;
    return input;
  },
};
