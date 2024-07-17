export type Expr = unknown;
export type Eval = unknown;
export type Vars = Record<string, unknown>;

/**
 * An operator that takes arguments and variables, and returns a result.
 *
 * @template T The type of the arguments.
 * @template U The type of the result.
 *
 * @param args The arguments.
 * @param vars The variables.
 *
 * @returns The result of the operator.
 */
export type Operator<T, U> = (args: T, vars: Record<string, unknown>) => U;
