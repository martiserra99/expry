import { expry } from "../index";

import { Value, Variables, Operation } from "../types";

import { assert, isString, isObject } from "../assert";

export type Object = {
  $getField: Operation<{ field: Value; input: Value }, Value>;
  $mergeObjects: Operation<Value[], Record<string, Value>>;
  $setField: Operation<{ field: Value; input: Value; value: Value }, Record<string, Value>>;
};

export const object: Object = {
  /**
   * Gets the value of a field in an object. If the field does not exist, it returns null.
   *
   * @param args The field and the object (expressions evaluating to a string and an object).
   * @param vars The variables.
   *
   * @returns The value of the field.
   *
   * @example $getField({ field: 'qty', input: { item: 'apple', qty: 25, price: 4.5 } }) // 25
   */
  $getField(args: { field: Value; input: Value }, vars: Variables): Value {
    const field = expry(args.field, vars);
    assert<string>(field, [isString], "The $getField operator requires a string as the field argument.");
    const input = expry(args.input, vars);
    assert<Record<string, Value>>(
      input,
      [isObject],
      "The $getField operator requires an object as the input argument."
    );
    if (field in input) return input[field];
    return null;
  },

  /**
   * Merges objects into a single object.
   *
   * @param args The objects (expressions evaluating to objects).
   * @param vars The variables.
   *
   * @returns The merged object.
   *
   * @example $mergeObjects([{ item: 'apple', qty: 5, price: 2.5 }, { qty: 10, price: 1.2, sale: true }]) // { item: 'apple', qty: 10, price: 1.2, sale: true }
   */
  $mergeObjects(args: Value[], vars: Variables): Record<string, Value> {
    return args.reduce((acc: Record<string, Value>, arg) => {
      const object = expry(arg, vars);
      assert<Record<string, Value>>(object, [isObject], "The $mergeObjects operator requires objects as arguments.");
      return { ...acc, ...object };
    }, {});
  },

  /**
   * Sets a field in an object to a specified value.
   *
   * @param args The field, the object, and the value (expressions evaluating to a string, an object, and any type).
   * @param vars The variables.
   *
   * @returns The object with the field set to the value.
   *
   * @example $setField({ field: 'item', input: { qty: 25, price: 4.5 }, value: 'apple' }) // { item: 'apple', qty: 25, price: 4.5 }
   */
  $setField(args: { field: Value; input: Value; value: Value }, vars: Variables): Record<string, Value> {
    const field = expry(args.field, vars);
    assert<string>(field, [isString], "The $setField operator requires a string as the field argument.");
    const input = expry(args.input, vars);
    assert<Record<string, Value>>(
      input,
      [isObject],
      "The $setField operator requires an object as the input argument."
    );
    const value = expry(args.value, vars);
    return { ...input, [field]: value };
  },
};
