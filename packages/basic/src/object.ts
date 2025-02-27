import { Operations } from "@expry/system";

export type ObjectPrototypes = {
  getField: {
    params: { field: unknown; input: unknown };
    return: unknown;
  };
  mergeObjects: {
    params: unknown[];
    return: unknown;
  };
  setField: {
    params: { field: unknown; input: unknown; value: unknown };
    return: unknown;
  };
};

export const objectOperations: Operations<ObjectPrototypes> = {
  /**
   * Gets the value of a field in an object. If the field does not exist, it returns null.
   *
   * @example $getField({ field: 'qty', input: { item: 'apple', qty: 25, price: 4.5 } }) // 25
   */
  getField(args, vars, expry) {
    const field = expry(args.field, vars) as string;
    const input = expry(args.input, vars) as Record<string, unknown>;
    if (field in input) return input[field];
    return null;
  },

  /**
   * Merges objects into a single object.
   *
   * @example $mergeObjects([{ item: 'apple', qty: 5, price: 2.5 }, { qty: 10, price: 1.2, sale: true }]) // { item: 'apple', qty: 10, price: 1.2, sale: true }
   */
  mergeObjects(args, vars, expry) {
    return args.reduce((acc: Record<string, unknown>, arg) => {
      const object = expry(arg, vars) as Record<string, unknown>;
      return { ...acc, ...object };
    }, {});
  },

  /**
   * Sets a field in an object to a specified value.
   *
   * @example $setField({ field: 'item', input: { qty: 25, price: 4.5 }, value: 'apple' }) // { item: 'apple', qty: 25, price: 4.5 }
   */
  setField(args, vars, expry) {
    const field = expry(args.field, vars) as string;
    const input = expry(args.input, vars) as Record<string, unknown>;
    const value = expry(args.value, vars);
    return { ...input, [field]: value };
  },
};
