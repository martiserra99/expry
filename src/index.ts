import { Expression, ExpressionResult, ExpressionVariables, ExpressionValue, Operation } from "./types";

import { operations } from "./operations";

export { Expression, ExpressionResult, ExpressionVariables, ExpressionValue };

/**
 * It evaluates the expression with the given variables.
 *
 * @param expr The expression.
 * @param vars The variables to evaluate the expression with.
 *
 * @returns The result of the expression.
 */
export function expry(expr: Expression, vars: ExpressionVariables = {}): ExpressionResult {
  if (isArr(expr)) return evalArr(expr, vars);
  if (isObj(expr)) return evalObj(expr, vars);
  if (isStr(expr)) return evalStr(expr, vars);
  return expr;
}

function isArr(expr: Expression): expr is Expression[] {
  return Array.isArray(expr);
}

function evalArr(expr: Expression[], vars: ExpressionVariables): ExpressionResult {
  return expr.map(expression => expry(expression, vars));
}

function isObj(expr: Expression): expr is Record<string, Expression> {
  return typeof expr === "object" && !Array.isArray(expr) && expr !== null;
}

function evalObj(expr: Record<string, Expression>, vars: ExpressionVariables): ExpressionResult {
  if (isOperator(expr)) return evalOperator(expr, vars);
  return evalObjValue(expr, vars);
}

function isOperator(expr: Record<string, Expression>): boolean {
  const keys = Object.keys(expr);
  if (keys.length === 1) return keys[0] in operations;
  return false;
}

function evalOperator(expr: Record<string, Expression>, vars: ExpressionVariables): ExpressionResult {
  const key = Object.keys(expr)[0] as keyof typeof operations;
  const operator = operations[key] as Operation<Expression, ExpressionResult>;
  return operator(expr[key], vars);
}

function evalObjValue(expr: Record<string, Expression>, vars: ExpressionVariables): ExpressionResult {
  return Object.fromEntries(
    Object.entries(expr).map(([key, expr]) => {
      return [evalStrValue(key), expry(expr, vars)];
    })
  );
}

function isStr(expr: Expression): expr is string {
  return typeof expr === "string";
}

function evalStr(expr: string, vars: ExpressionVariables): ExpressionResult {
  if (isVariable(expr)) return evalVariable(expr, vars);
  return evalStrValue(expr);
}

function isVariable(expr: string): boolean {
  return expr.startsWith("$");
}

function evalVariable(expr: string, vars: ExpressionVariables): ExpressionResult {
  const parts = expr.slice(1).split(".");
  return parts.reduce((acc: ExpressionValue, key: string): ExpressionValue => {
    if (isObj(acc) && key in acc) return acc[key];
    if (isArr(acc) && key in acc) return acc[Number(key)];
    return null;
  }, vars);
}

function evalStrValue(expr: string): ExpressionResult {
  if (expr.startsWith("#")) return expr.slice(1);
  return expr;
}
