import { Expr, Eval, Vars, Operator } from './types';

import { operators } from './operators';

/**
 * It evaluates the expression with the given variables.
 *
 * @param expr The expression.
 * @param vars The variables to evaluate the expression with.
 *
 * @returns The result of the expression.
 */
export function expry(expr: Expr, vars: Vars = {}): Eval {
  if (isArr(expr)) return evalArr(expr, vars);
  if (isObj(expr)) return evalObj(expr, vars);
  if (isStr(expr)) return evalStr(expr, vars);
  return expr;
}

function isArr(expr: Expr): expr is Expr[] {
  return Array.isArray(expr);
}

function evalArr(expr: Expr[], vars: Vars): Eval {
  return expr.map(expression => expry(expression, vars));
}

function isObj(expr: Expr): expr is Record<string, Expr> {
  return typeof expr === 'object' && !Array.isArray(expr) && expr !== null;
}

function evalObj(expr: Record<string, Expr>, vars: Vars): Eval {
  if (isOperator(expr)) return evalOperator(expr, vars);
  return evalObjValue(expr, vars);
}

function isOperator(expr: Record<string, Expr>): boolean {
  const keys = Object.keys(expr);
  if (keys.length === 1) return keys[0] in operators;
  return false;
}

function evalOperator(expr: Record<string, Expr>, vars: Vars): Eval {
  const key = Object.keys(expr)[0] as keyof typeof operators;
  const operator = operators[key] as Operator<unknown, Eval>;
  return operator(expr[key], vars);
}

function evalObjValue(expr: Record<string, Expr>, vars: Vars): Eval {
  return Object.fromEntries(
    Object.entries(expr).map(([key, expr]) => {
      return [evalStrValue(key), expry(expr, vars)];
    })
  );
}

function isStr(expr: Expr): expr is string {
  return typeof expr === 'string';
}

function evalStr(expr: string, vars: Vars): Eval {
  if (isVariable(expr)) return evalVariable(expr, vars);
  return evalStrValue(expr);
}

function isVariable(expr: string): boolean {
  return expr.startsWith('$');
}

function evalVariable(expr: string, vars: Vars): Eval {
  const parts = expr.slice(1).split('.');
  return parts.reduce((acc: unknown, key: string): unknown => {
    if (isObj(acc) && key in acc) return acc[key];
    if (isArr(acc) && key in acc) return acc[Number(key)];
    return null;
  }, vars);
}

function evalStrValue(expr: string): Eval {
  if (expr.startsWith('#')) return expr.slice(1);
  return expr;
}
