import { expryInstance, Operations } from "@expry/system";

type Prototypes = {
  add: {
    params: { a: unknown; b: unknown };
    return: unknown;
  };
};

const operations: Operations<Prototypes> = {
  add: (args, vars): unknown => {
    const a = expry(args.a, vars) as number;
    const b = expry(args.b, vars) as number;
    return a + b;
  },
};

const expry = expryInstance<[Prototypes]>(operations);

const value = expry("$a", { a: 1 });

console.log(value);
