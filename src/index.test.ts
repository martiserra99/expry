import { it, expect } from "vitest";

import { expry } from "./";

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

it("ignores $ when using #", () => {
  expect(expry({ "#$gte": ["#$age", 18] })).toEqual({ $gte: ["$age", 18] });
});
