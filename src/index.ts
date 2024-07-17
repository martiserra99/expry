import { Value, Operator } from './types';

import { operators } from './operators';

export { Value };

/**
 * It evaluates the expression with the given variables.
 *
 * @param expr The expression.
 * @param vars The variables to evaluate the expression with.
 *
 * @returns The result of the expression.
 */
export function expry(expr: Value, vars: Record<string, Value> = {}): Value {
  if (isArr(expr)) return evalArr(expr, vars);
  if (isObj(expr)) return evalObj(expr, vars);
  if (isStr(expr)) return evalStr(expr, vars);
  return expr;
}

function isArr(expr: Value): expr is Value[] {
  return Array.isArray(expr);
}

function evalArr(expr: Value[], vars: Record<string, Value>): Value {
  return expr.map(expression => expry(expression, vars));
}

function isObj(expr: Value): expr is Record<string, Value> {
  return typeof expr === 'object' && !Array.isArray(expr) && expr !== null;
}

function evalObj(
  expr: Record<string, Value>,
  vars: Record<string, Value>
): Value {
  if (isOperator(expr)) return evalOperator(expr, vars);
  return evalObjValue(expr, vars);
}

function isOperator(expr: Record<string, Value>): boolean {
  const keys = Object.keys(expr);
  if (keys.length === 1) return keys[0] in operators;
  return false;
}

function evalOperator(
  expr: Record<string, Value>,
  vars: Record<string, Value>
): Value {
  const key = Object.keys(expr)[0] as keyof typeof operators;
  const ope = operators[key] as Operator<Value, Value>;
  return ope(expr[key], vars);
}

function evalObjValue(
  expr: Record<string, Value>,
  vars: Record<string, Value>
): Value {
  return Object.fromEntries(
    Object.entries(expr).map(([key, expr]) => {
      return [evalStrValue(key), expry(expr, vars)];
    })
  );
}

function isStr(expr: Value): expr is string {
  return typeof expr === 'string';
}

function evalStr(expr: string, vars: Record<string, Value>): Value {
  if (isVariable(expr)) return evalVariable(expr, vars);
  return evalStrValue(expr);
}

function isVariable(expr: string): boolean {
  return expr.startsWith('$');
}

function evalVariable(expr: string, vars: Record<string, Value>): Value {
  const parts = expr.slice(1).split('.');
  return parts.reduce((acc: Value, key: string): Value => {
    if (isObj(acc) && key in acc) return acc[key];
    if (isArr(acc) && key in acc) return acc[Number(key)];
    return null;
  }, vars);
}

function evalStrValue(expr: string): Value {
  if (expr.startsWith('#')) return expr.slice(1);
  return expr;
}
