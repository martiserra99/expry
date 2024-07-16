import { Expry, Operator } from './types';

import { operators } from './operators';

export { Expry };

/**
 * It evaluates the expression with the given variables.
 *
 * @param expr The expression.
 * @param vars The variables to evaluate the expression with.
 *
 * @returns The result of the expression.
 */
export function expry(expr: Expry, vars: Record<string, Expry> = {}): Expry {
  if (isArr(expr)) return evalArr(expr, vars);
  if (isObj(expr)) return evalObj(expr, vars);
  if (isStr(expr)) return evalStr(expr, vars);
  return expr;
}

function isArr(expr: Expry): expr is Expry[] {
  return Array.isArray(expr);
}

function evalArr(expr: Expry[], vars: Record<string, Expry>): Expry {
  return expr.map(expression => expry(expression, vars));
}

function isObj(expr: Expry): expr is Record<string, Expry> {
  return typeof expr === 'object' && !Array.isArray(expr) && expr !== null;
}

function evalObj(
  expr: Record<string, Expry>,
  vars: Record<string, Expry>
): Expry {
  if (isOperator(expr)) return evalOperator(expr, vars);
  return evalObjValue(expr, vars);
}

function isOperator(expr: Record<string, Expry>): boolean {
  const keys = Object.keys(expr);
  if (keys.length === 1) return keys[0] in operators;
  return false;
}

function evalOperator(
  expr: Record<string, Expry>,
  vars: Record<string, Expry>
): Expry {
  const key = Object.keys(expr)[0] as keyof typeof operators;
  const ope = operators[key] as Operator<Expry, Expry>;
  return ope(expr[key], vars);
}

function evalObjValue(
  expr: Record<string, Expry>,
  vars: Record<string, Expry>
): Expry {
  return Object.fromEntries(
    Object.entries(expr).map(([key, expr]) => {
      return [evalStrValue(key), expry(expr, vars)];
    })
  );
}

function isStr(expr: Expry): expr is string {
  return typeof expr === 'string';
}

function evalStr(expr: string, vars: Record<string, Expry>): Expry {
  if (isVariable(expr)) return evalVariable(expr, vars);
  return evalStrValue(expr);
}

function isVariable(expr: string): boolean {
  return expr.startsWith('$');
}

function evalVariable(expr: string, vars: Record<string, Expry>): Expry {
  const parts = expr.slice(1).split('.');
  return parts.reduce((acc: Expry, key: string): Expry => {
    if (isObj(acc) && key in acc) return acc[key];
    if (isArr(acc) && key in acc) return acc[Number(key)];
    return null;
  }, vars);
}

function evalStrValue(expr: string): Expry {
  if (expr.startsWith('#')) return expr.slice(1);
  return expr;
}
