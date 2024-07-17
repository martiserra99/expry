import { expry } from '../index';

import { Expr, Vars, Operator } from '../types';

export type String = {
  $concat: Operator<Expr[], string>;
  $ltrim: Operator<Expr, string>;
  $regexMatch: Operator<[Expr, Expr], boolean>;
  $rtrim: Operator<Expr, string>;
  $split: Operator<[Expr, Expr], string[]>;
  $strLen: Operator<Expr, number>;
  $substr: Operator<[Expr, Expr, Expr], string>;
  $toLower: Operator<Expr, string>;
  $trim: Operator<Expr, string>;
  $toUpper: Operator<Expr, string>;
};

export const string: String = {
  /**
   * Concatenates strings together.
   *
   * @param args The strings (expressions evaluating to strings).
   * @param vars The variables.
   *
   * @returns The result of concatenating the strings.
   *
   * @example $concat(['hello', ' ', 'world']) // 'hello world'
   */
  $concat(args: Expr[], vars: Vars): string {
    return args
      .map(arg => {
        const string = expry(arg, vars) as string;
        return string;
      })
      .join('');
  },

  /**
   * Removes whitespace from the beginning of a string.
   *
   * @param args The string (expression evaluating to a string).
   * @param vars The variables.
   *
   * @returns The string with the whitespace removed from the beginning.
   *
   * @example $ltrim('  hello') // 'hello'
   */
  $ltrim(args: Expr, vars: Vars): string {
    const string = expry(args, vars) as string;
    return string.replace(/^\s+/, '');
  },

  /**
   * Performs a regular expression and returns true if there is a match. Otherwise, it returns false.
   *
   * @param args A string and a regular expression (expressions evaluating to strings).
   * @param vars The variables.
   *
   * @returns A boolean indicating if there is a match.
   *
   * @example $regexMatch(['hello', '/ell/']) // true
   * @example $regexMatch(['hello', '/bye/']) // false
   */
  $regexMatch(args: [Expr, Expr], vars: Vars): boolean {
    const string = expry(args[0], vars) as string;
    const regex = expry(args[1], vars) as string;
    return string.match(regex) !== null;
  },

  /**
   * Removes whitespace from the end of a string.
   *
   * @param args The string (expression evaluating to a string).
   * @param vars The variables.
   *
   * @returns The string with the whitespace removed from the end.
   *
   * @example $rtrim('hello  ') // 'hello'
   */
  $rtrim(args: Expr, vars: Vars): string {
    const string = expry(args, vars) as string;
    return string.replace(/\s+$/, '');
  },

  /**
   * Divides a string into an array of substrings based on a delimiter.
   *
   * @param args A string and a delimiter (expressions evaluating to strings).
   * @param vars The variables.
   *
   * @returns {string[]} The array of substrings.
   *
   * @example $split(['June-15-2013', '-']) // ['June', '15', '2013']
   * @example $split(['hello world', ' ']) // ['hello', 'world']
   */
  $split(args: [Expr, Expr], vars: Vars): string[] {
    const string = expry(args[0], vars) as string;
    const delimiter = expry(args[1], vars) as string;
    return string.split(delimiter);
  },

  /**
   * Returns the length of a string.
   *
   * @param args The string (expression evaluating to a string).
   * @param vars The variables.
   *
   * @returns The length of the string.
   *
   * @example $strLen('hello') // 5
   */
  $strLen(args: Expr, vars: Vars): number {
    const string = expry(args, vars) as string;
    return string.length;
  },

  /**
   * Returns a substring of a string.
   *
   * @param args The string, the starting index, and the number of characters (expressions evaluating to a string, a number, and a number).
   * @param vars The variables.
   *
   * @returns The substring of the string.
   *
   * @example $substr(['hello', 0, 2]) // 'he'
   */
  $substr(args: [Expr, Expr, Expr], vars: Vars): string {
    const string = expry(args[0], vars) as string;
    const start = expry(args[1], vars) as number;
    const length = expry(args[2], vars) as number;
    return string.substring(start, start + length);
  },

  /**
   * Returns the string converted to lowercase.
   *
   * @param args The string (expression evaluating to a string).
   * @param vars The variables.
   *
   * @returns The string converted to lowercase.
   *
   * @example $toLower('Marti Serra') // 'marti serra'
   */
  $toLower(args: Expr, vars: Vars): string {
    const string = expry(args, vars) as string;
    return string.toLowerCase();
  },

  /**
   * Removes whitespace from the beginning and end of a string.
   *
   * @param args The string (expression evaluating to a string).
   * @param vars The variables.
   *
   * @returns The string with the whitespace removed from the beginning and end.
   *
   * @example $trim('  hello  ') // 'hello'
   */
  $trim(args: Expr, vars: Vars): string {
    const string = expry(args, vars) as string;
    return string.trim();
  },

  /**
   * Returns the string converted to uppercase.
   *
   * @param args The string (expression evaluating to a string).
   * @param vars The variables.
   *
   * @returns The string converted to uppercase.
   *
   * @example $toUpper('Marti Serra') // 'MARTI SERRA'
   */
  $toUpper(args: Expr, vars: Vars): string {
    const string = expry(args, vars) as string;
    return string.toUpperCase();
  },
};
