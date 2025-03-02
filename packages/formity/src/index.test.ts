import { describe, it, expect } from "vitest";

import { expryInstance } from "@expry/system";

import {
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

const expry = expryInstance<[FormityPrototypes]>(formityOperations);

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
    const next = schema.yield.next({ a: 1, b: 2 });
    const back = schema.yield.back({ c: 3, d: 4 });
    expect(next).toEqual({ a: 1, b: 2 });
    expect(back).toEqual({ c: 3, d: 4 });
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
    const result = schema.return({ a: 1, b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
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
    const result = schema.variables({ a: 1, b: 2 });
    expect(result).toEqual({ a: 1, b: 2 });
  });
});
