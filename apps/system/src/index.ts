import { expryInstance, Operations } from "@expry/system";

type Prototypes = {
  map: {
    params: { input: unknown; as: unknown; in: unknown };
    return: unknown[];
  };
  add: {
    params: unknown[];
    return: unknown;
  };
};

const operations: Operations<Prototypes> = {
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

const expry = expryInstance<[Prototypes]>(operations);

const expression: unknown = {
  $map: {
    input: [1, 2, 3],
    as: "num",
    in: { $add: ["$$num", 1] },
  },
};

const result = expry(expression);

console.log(result);
