import { createExpry, Executions } from "@expry/system";
import { basicOperations, BasicOperations } from "@expry/basic";

type Operations = {
  sum: {
    params: { a: unknown; b: unknown };
    return: unknown;
  };
};

const operations: Executions<Operations> = {
  sum: (args, vars): unknown => {
    const a = expry(args.a, vars) as number;
    const b = expry(args.b, vars) as number;
    return a + b;
  },
};

const expry = createExpry<[BasicOperations, Operations]>(
  basicOperations,
  operations
);

const value = expry({ $length: "hello" });

console.log(value);
