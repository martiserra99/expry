import { it, expect } from "vitest";

import { createExpry, Executions } from "./index";

type Operations = {
  concat: {
    params: unknown[];
    return: string;
  };
  toLower: {
    params: unknown;
    return: string;
  };
  gte: {
    params: [unknown, unknown];
    return: boolean;
  };
};

const operations: Executions<Operations> = {
  concat(args, vars, expry) {
    return args
      .map((arg) => {
        const string = expry(arg, vars) as string;
        return string;
      })
      .join("");
  },
  toLower(args, vars, expry) {
    const string = expry(args, vars) as string;
    return string.toLowerCase();
  },
  gte(args, vars, expry): boolean {
    const a = expry(args[0], vars) as number | string;
    const b = expry(args[1], vars) as number | string;
    return a >= b;
  },
};

const expry = createExpry<[Operations]>(operations);

it("evaluates expression", () => {
  const expr = {
    fullName: {
      $concat: [{ $toLower: "$name" }, " ", { $toLower: "$surname" }],
    },
    isAdult: { $gte: ["$age", 18] },
  };
  const vars = {
    name: "Marti",
    surname: "Serra",
    age: 24,
  };
  expect(expry(expr, vars)).toEqual({
    fullName: "marti serra",
    isAdult: true,
  });
});

it("evaulates expression with object variable", () => {
  const expr = {
    fullName: {
      $concat: [{ $toLower: "$user.name" }, " ", { $toLower: "$user.surname" }],
    },
    isAdult: { $gte: ["$user.age", 18] },
  };
  const vars = {
    user: {
      name: "Marti",
      surname: "Serra",
      age: 24,
    },
  };
  expect(expry(expr, vars)).toEqual({
    fullName: "marti serra",
    isAdult: true,
  });
});

it("evaulates expression with array variable", () => {
  const expr = {
    fullName: {
      $concat: [{ $toLower: "$user.0" }, " ", { $toLower: "$user.1" }],
    },
    isAdult: { $gte: ["$user.2", 18] },
  };
  const vars = {
    user: ["Marti", "Serra", 24],
  };
  expect(expry(expr, vars)).toEqual({
    fullName: "marti serra",
    isAdult: true,
  });
});

it("ignores $ when using _", () => {
  expect(expry({ _$gte: ["_$age", 18] })).toEqual({ $gte: ["$age", 18] });
});
