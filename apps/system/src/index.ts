import { createExpry, Operations } from "@expry/system";

type Operations = {
  map: {
    params: { input: unknown; as: unknown; in: unknown };
    return: unknown[];
  };
  add: {
    params: unknown[];
    return: unknown;
  };
};

const operations: Operations<Operations> = {
  map(args, vars, expry) {
    const array = expry(args.input, vars) as unknown[];
    const as = expry(args.as, vars) as string;
    return array.map((value) => {
      return expry(args.in, { ...vars, [`$${as}`]: value });
    });
  },
  add: (args, vars, expry) => {
    const array = args.map((num) => expry(num, vars)) as number[];
    return array.reduce((acc, val) => acc + val, 0);
  },
};

const expry = createExpry<[Operations]>(operations);

const expression: unknown = {
  $map: {
    input: [1, 2, 3],
    as: "num",
    in: { $add: ["$$num", 1] },
  },
};

const result = expry(expression);

console.log(result);
