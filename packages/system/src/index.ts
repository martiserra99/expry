export type Expry = (expr: unknown, vars?: Record<string, unknown>) => unknown;

export type Merge<T extends Operations[]> = T extends [
  infer First,
  ...infer Other
]
  ? First extends Operations
    ? Other extends Operations[]
      ? First & Merge<Other>
      : never
    : never
  : unknown;

export type Operations = {
  [key: string]: {
    params: unknown;
    return: unknown;
  };
};

export type Executions<T extends Operations> = {
  [K in keyof T]: (
    args: T[K]["params"],
    vars: Record<string, unknown>,
    expry: Expry
  ) => T[K]["return"];
};

type Projection<T extends Operations[]> = T extends [
  infer First,
  ...infer Other
]
  ? First extends Operations
    ? Other extends Operations[]
      ? [Executions<First>, ...Projection<Other>]
      : never
    : never
  : [];

export function createExpry<T extends Operations[]>(...array: Projection<T>) {
  const operations = array.reduce((acc, obj) => ({ ...acc, ...obj }), {});

  function expry(expr: unknown, vars: Record<string, unknown> = {}) {
    if (isArray(expr)) return evaluateArray(expr, vars);
    if (isObject(expr)) return evaluateObject(expr, vars);
    if (isString(expr)) return evaluateString(expr, vars);
    return expr;
  }

  function isArray(expr: unknown): expr is unknown[] {
    return Array.isArray(expr);
  }

  function evaluateArray(
    expr: unknown[],
    vars: Record<string, unknown>
  ): unknown {
    return expr.map((expr) => expry(expr, vars));
  }

  function isObject(expr: unknown): expr is Record<string, unknown> {
    return typeof expr === "object" && !Array.isArray(expr) && expr !== null;
  }

  function evaluateObject(
    expr: Record<string, unknown>,
    vars: Record<string, unknown>
  ): unknown {
    if (isOperator(expr)) return evalulateOperator(expr, vars);
    return evaluateObjectValue(expr, vars);
  }

  function isOperator(expr: Record<string, unknown>): boolean {
    const keys = Object.keys(expr);
    return (
      keys.length === 1 &&
      keys[0].startsWith("$") &&
      keys[0].slice(1) in operations
    );
  }

  function evalulateOperator(
    expr: Record<string, unknown>,
    vars: Record<string, unknown>
  ): unknown {
    const args = expr[Object.keys(expr)[0]];
    return operations[Object.keys(expr)[0].slice(1) as keyof typeof operations](
      args,
      vars,
      expry
    );
  }

  function evaluateObjectValue(
    expr: Record<string, unknown>,
    vars: Record<string, unknown>
  ): unknown {
    return Object.fromEntries(
      Object.entries(expr).map(([key, expr]) => {
        return [evaluateStringValue(key), expry(expr, vars)];
      })
    );
  }

  function isString(expr: unknown): expr is string {
    return typeof expr === "string";
  }

  function evaluateString(
    expr: string,
    vars: Record<string, unknown>
  ): unknown {
    if (isVariable(expr)) return evalulateVariable(expr, vars);
    return evaluateStringValue(expr);
  }

  function isVariable(expr: string): boolean {
    return expr.startsWith("$");
  }

  function evalulateVariable(
    expr: string,
    vars: Record<string, unknown>
  ): unknown {
    const parts = expr.slice(1).split(".");
    return parts.reduce((acc: unknown, key: string): unknown => {
      if (isObject(acc) && key in acc) return acc[key];
      if (isArray(acc) && key in acc) return acc[Number(key)];
      return undefined;
    }, vars);
  }

  function evaluateStringValue(expr: string): unknown {
    if (expr.startsWith("_")) return expr.slice(1);
    return expr;
  }

  return expry;
}
