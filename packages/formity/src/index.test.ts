import { describe, it, expect } from "vitest";

import { createExpry } from "@expry/system";

import type {
  OnNext,
  OnBack,
  OnJump,
  GetState,
  SetState,
} from "@formity/system";

import type { ConditionFlow } from "./types/flow";
import type { LoopFlow } from "./types/flow";
import type { SwitchFlow } from "./types/flow";
import type { JumpFlow } from "./types/flow";
import type { FormFlow } from "./types/flow";
import type { VariablesFlow } from "./types/flow";
import type { YieldFlow } from "./types/flow";
import type { ReturnFlow } from "./types/flow";

import { formityOperations, FormityOperations } from "./index";

type BasicOperations = {
  add: {
    params: [unknown, unknown];
    return: number;
  };
};

type Operations = [FormityOperations, BasicOperations];

const expry = createExpry<Operations>(formityOperations, {
  add: (args, vars, expry) => {
    const a = expry(args[0], vars) as number;
    const b = expry(args[1], vars) as number;
    return a + b;
  },
});

describe("formity$condition", () => {
  it("returns the condition formity element", () => {
    const formity = expry({
      $formity$condition: {
        if: "$$if",
        then: [{ $add: [1, 2] }],
        else: [{ $add: [3, 4] }],
      },
    }) as ConditionFlow;
    expect(formity.condition.if({ if: true })).toEqual(true);
    expect(formity.condition.then).toEqual([3]);
    expect(formity.condition.else).toEqual([7]);
  });
});

describe("formity$loop", () => {
  const formity = expry({
    $formity$loop: {
      while: "$$while",
      do: [{ $add: [1, 2] }],
    },
  }) as LoopFlow;
  expect(formity.loop.while({ while: true })).toEqual(true);
  expect(formity.loop.do).toEqual([3]);
});

describe("formity$switch", () => {
  const formity = expry({
    $formity$switch: {
      branches: [
        { case: "$$case1", then: [{ $add: [1, 2] }] },
        { case: "$$case2", then: [{ $add: [3, 4] }] },
      ],
      default: [{ $add: [5, 6] }],
    },
  }) as SwitchFlow;
  expect(formity.switch.branches[0].case({ case1: true })).toEqual(true);
  expect(formity.switch.branches[0].then).toEqual([3]);
  expect(formity.switch.branches[1].case({ case2: true })).toEqual(true);
  expect(formity.switch.branches[1].then).toEqual([7]);
  expect(formity.switch.default).toEqual([11]);
});

describe("formity$jump", () => {
  it("returns the jump formity element", () => {
    const formity = expry({
      $formity$jump: {
        id: "my-id",
        at: {
          $formity$form: {
            fields: {
              a: ["$$a", []],
              b: ["$$b", []],
            },
            render: {
              fields: "$$fields",
              values: "$$values",
              params: "$$params",
              onNext: "$$onNext",
              onBack: "$$onBack",
              onJump: "$$onJump",
              getState: "$$getState",
              setState: "$$setState",
            },
          },
        },
      },
    }) as JumpFlow;
    const fields = formity.jump.at.form.fields({ a: 1, b: 2 });
    expect(formity.jump.id).toEqual("my-id");
    expect(fields).toEqual({ a: [1, []], b: [2, []] });
  });
});

describe("formity$form", () => {
  it("returns the form formity element", () => {
    const formity = expry({
      $formity$form: {
        fields: {
          a: ["$$a", []],
          b: ["$$b", []],
        },
        render: {
          fields: "$$fields",
          values: "$$values",
          params: "$$params",
          onNext: "$$onNext",
          onBack: "$$onBack",
          onJump: "$$onJump",
          getState: "$$getState",
          setState: "$$setState",
        },
      },
    }) as FormFlow;
    const fields = formity.form.fields({ a: 1, b: 2 });
    const onNext: OnNext<Record<string, unknown>> = () => {};
    const onBack: OnBack<Record<string, unknown>> = () => {};
    const onJump: OnJump<Record<string, unknown>> = () => {};
    const getState: GetState<Record<string, unknown>> = () => ({
      points: [],
      memory: { type: "list", list: [] },
    });
    const setState: SetState = () => {};
    const render = formity.form.render({
      fields: { a: 1, b: 2 },
      values: { c: 3, d: 4 },
      params: { e: 5, f: 6 },
      onNext: onNext,
      onBack: onBack,
      onJump: onJump,
      getState: getState,
      setState: setState,
    });
    expect(fields).toEqual({
      a: [1, []],
      b: [2, []],
    });
    expect(render).toEqual({
      fields: { a: 1, b: 2 },
      values: { c: 3, d: 4 },
      params: { e: 5, f: 6 },
      onNext: onNext,
      onBack: onBack,
      onJump: onJump,
      getState: getState,
      setState: setState,
    });
  });
});

describe("formity$variables", () => {
  it("returns the variables formity element", () => {
    const formity = expry({
      $formity$variables: {
        a: "$$a",
        b: "$$b",
      },
    }) as VariablesFlow;
    expect(formity.variables({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
  });
});

describe("formity$yield", () => {
  it("returns the yield formity element", () => {
    const formity = expry({
      $formity$yield: {
        next: { a: "$$a", b: "$$b" },
        back: { c: "$$c", d: "$$d" },
      },
    }) as YieldFlow;
    expect(formity.yield.next({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
    expect(formity.yield.back({ c: 3, d: 4 })).toEqual({ c: 3, d: 4 });
  });
});

describe("formity$return", () => {
  it("returns the return formity element", () => {
    const formity = expry({
      $formity$return: {
        a: "$$a",
        b: "$$b",
      },
    }) as ReturnFlow;
    expect(formity.return({ a: 1, b: 2 })).toEqual({ a: 1, b: 2 });
  });
});
