export type Expry =
  | { [key: string]: Expry }
  | Expry[]
  | boolean
  | string
  | number
  | null;

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
export type Operator<T extends Expry, U extends Expry> = (
  args: T,
  vars: Record<string, Expry>
) => U;
