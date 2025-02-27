import { expryInstance, Operations } from "@expry/system";
import { basicOperations, BasicPrototypes } from "@expry/basic";

type Prototypes = {
  sum: {
    params: { a: unknown; b: unknown };
    return: unknown;
  };
};

const operations: Operations<Prototypes> = {
  sum: (args, vars): unknown => {
    const a = expry(args.a, vars) as number;
    const b = expry(args.b, vars) as number;
    return a + b;
  },
};

const expry = expryInstance<[BasicPrototypes, Prototypes]>(
  basicOperations,
  operations
);

const value = expry({ $add: [1, 2] });

console.log(value);
