import { expry, Value, Variables } from "expry";

const expr: Value = {
  fullName: {
    $concat: [{ $toLower: "$name" }, " ", { $toLower: "$surname" }],
  },
  isAdult: { $gte: ["$age", 18] },
};
const vars: Variables = {
  name: "Marti",
  surname: "Serra",
  age: 24,
};

console.log(expry(expr, vars));
