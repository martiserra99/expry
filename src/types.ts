export type Expr = unknown;
export type Eval = unknown;

export type Vars = Record<string, Data>;
export type Data = unknown;

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
export type Operator<T extends Expr, U extends Eval> = (
  args: T,
  vars: Vars
) => U;
