export type Expression = unknown;
export type Evaluation = unknown;

export type Variables = Record<string, Value>;
export type Value = unknown;

/**
 * An operation that takes arguments and variables, and returns a result.
 *
 * @template T The type of the arguments.
 * @template U The type of the result.
 *
 * @param args The arguments.
 * @param vars The variables.
 *
 * @returns The result of the operation.
 */
export type Operation<T extends Expression, U extends Evaluation> = (args: T, vars: Variables) => U;
