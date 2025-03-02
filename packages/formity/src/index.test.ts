import { describe, it, expect } from "vitest";

import { expryInstance } from "@expry/system";

import {
  ModelCondSchema,
  ModelLoopSchema,
  ModelSwitchSchema,
  ModelFormSchema,
  ModelYieldSchema,
  ModelReturnSchema,
  ModelVariablesSchema,
  OnNext,
  OnBack,
  GetState,
  SetState,
} from "@formity/system";

import { formityOperations, FormityPrototypes } from "./index";

type BasicPrototypes = {
  add: {
    params: [unknown, unknown];
    return: number;
  };
};

type Prototypes = [FormityPrototypes, BasicPrototypes];

const expry = expryInstance<Prototypes>(formityOperations, {
  add: (args, vars, expry) => {
    const a = expry(args[0], vars) as number;
    const b = expry(args[1], vars) as number;
    return a + b;
  },
});

describe("schema$cond", () => {
  it("returns the condition schema element", () => {
    const schema = expry({
      $schema$cond: {
        if: "$$if",
        then: [{ $add: [1, 2] }],
        else: [{ $add: [3, 4] }],
      },
    }) as ModelCondSchema;
    expect(schema.cond.if({ if: true })).toEqual(true);
    expect(schema.cond.then).toEqual([3]);
    expect(schema.cond.else).toEqual([7]);
  });
});

describe("schema$loop", () => {
  const schema = expry({
    $schema$loop: {
      while: "$$while",
      do: [{ $add: [1, 2] }],
    },
  }) as ModelLoopSchema;
  expect(schema.loop.while({ while: true })).toEqual(true);
  expect(schema.loop.do).toEqual([3]);
});

describe("schema$switch", () => {
  const schema = expry({
    $schema$switch: {
      branches: [
        { case: "$$case1", then: [{ $add: [1, 2] }] },
        { case: "$$case2", then: [{ $add: [3, 4] }] },
      ],
      default: [{ $add: [5, 6] }],
    },
  }) as ModelSwitchSchema;
  expect(schema.switch.branches[0].case({ case1: true })).toEqual(true);
  expect(schema.switch.branches[0].then).toEqual([3]);
  expect(schema.switch.branches[1].case({ case2: true })).toEqual(true);
  expect(schema.switch.branches[1].then).toEqual([7]);
  expect(schema.switch.default).toEqual([11]);
});

describe("schema$form", () => {
  it("returns the form schema element", () => {
    const schema = expry({
      $schema$form: {
        values: {
          a: ["$$a", []],
          b: ["$$b", []],
        },
        render: {
          values: "$$values",
          inputs: "$$inputs",
          params: "$$params",
          onNext: "$$onNext",
          onBack: "$$onBack",
          getState: "$$getState",
          setState: "$$setState",
        },
      },
    }) as ModelFormSchema;
    const values = schema.form.values({ a: 1, b: 2 });
    const onNext: OnNext = () => {};
    const onBack: OnBack = () => {};
    const getState: GetState = () => ({
      points: [],
      inputs: { type: "list", list: [] },
    });
    const setState: SetState = () => {};
    const render = schema.form.render({
      values: { a: 1, b: 2 },
      inputs: { c: 3, d: 4 },
      params: { e: 5, f: 6 },
      onNext: onNext,
      onBack: onBack,
      getState: getState,
      setState: setState,
    });
    expect(values).toEqual({
      a: [1, []],
      b: [2, []],
    });
    expect(render).toEqual({
      values: { a: 1, b: 2 },
      inputs: { c: 3, d: 4 },
      params: { e: 5, f: 6 },
      onNext: onNext,
      onBack: onBack,
      getState: getState,
      setState: setState,
    });
  });
});

describe("schema$yield", () => {
  it("returns the yield schema element", () => {
    const schema = expry({
      $schema$yield: {
        next: { a: "$$a", b: "$$b" },
        back: { c: "$$c", d: "$$d" },
      },
    }) as ModelYieldSchema;
    expect(schema.yield.next({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
    expect(schema.yield.back({ c: 3, d: 4 })).toEqual({ c: 3, d: 4 });
  });
});

describe("schema$return", () => {
  it("returns the return schema element", () => {
    const schema = expry({
      $schema$return: {
        a: "$$a",
        b: "$$b",
      },
    }) as ModelReturnSchema;
    expect(schema.return({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
  });
});

describe("schema$variables", () => {
  it("returns the variables schema element", () => {
    const schema = expry({
      $schema$variables: {
        a: "$$a",
        b: "$$b",
      },
    }) as ModelVariablesSchema;
    expect(schema.variables({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
  });
});
