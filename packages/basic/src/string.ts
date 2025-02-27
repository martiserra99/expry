import { Operations } from "@expry/system";

export type StringPrototypes = {
  concat: {
    params: unknown[];
    return: string;
  };
  ltrim: {
    params: unknown;
    return: string;
  };
  regexMatch: {
    params: [unknown, unknown];
    return: boolean;
  };
  rtrim: {
    params: unknown;
    return: string;
  };
  split: {
    params: [unknown, unknown];
    return: string[];
  };
  strLen: {
    params: unknown;
    return: number;
  };
  substr: {
    params: [unknown, unknown, unknown];
    return: string;
  };
  toLower: {
    params: unknown;
    return: string;
  };
  trim: {
    params: unknown;
    return: string;
  };
  toUpper: {
    params: unknown;
    return: string;
  };
};

export const stringOperations: Operations<StringPrototypes> = {
  /**
   * Concatenates strings together.
   *
   * @example $concat(['hello', ' ', 'world']) // 'hello world'
   */
  concat(args, vars, expry) {
    return args
      .map((arg) => {
        const string = expry(arg, vars) as string;
        return string;
      })
      .join("");
  },

  /**
   * Removes whitespace from the beginning of a string.
   *
   * @example $ltrim('  hello') // 'hello'
   */
  ltrim(args, vars, expry) {
    const string = expry(args, vars) as string;
    return string.replace(/^\s+/, "");
  },

  /**
   * Performs a regular expression and returns true if there is a match. Otherwise, it returns false.
   *
   * @example $regexMatch(['hello', '/ell/']) // true
   * @example $regexMatch(['hello', '/bye/']) // false
   */
  regexMatch(args, vars, expry) {
    const string = expry(args[0], vars) as string;
    const regex = expry(args[1], vars) as string;
    return string.match(regex) !== null;
  },

  /**
   * Removes whitespace from the end of a string.
   *
   * @example $rtrim('hello  ') // 'hello'
   */
  rtrim(args, vars, expry) {
    const string = expry(args, vars) as string;
    return string.replace(/\s+$/, "");
  },

  /**
   * Divides a string into an array of substrings based on a delimiter.
   *
   * @example $split(['June-15-2013', '-']) // ['June', '15', '2013']
   * @example $split(['hello world', ' ']) // ['hello', 'world']
   */
  split(args, vars, expry) {
    const string = expry(args[0], vars) as string;
    const delimiter = expry(args[1], vars) as string;
    return string.split(delimiter);
  },

  /**
   * Returns the length of a string.
   *
   * @example $strLen('hello') // 5
   */
  strLen(args, vars, expry) {
    const string = expry(args, vars) as string;
    return string.length;
  },

  /**
   * Returns a substring of a string.
   *
   * @example $substr(['hello', 0, 2]) // 'he'
   */
  substr(args, vars, expry) {
    const string = expry(args[0], vars) as string;
    const start = expry(args[1], vars) as number;
    const length = expry(args[2], vars) as number;
    return string.substring(start, start + length);
  },

  /**
   * Returns the string converted to lowercase.
   *
   * @example $toLower('Marti Serra') // 'marti serra'
   */
  toLower(args, vars, expry) {
    const string = expry(args, vars) as string;
    return string.toLowerCase();
  },

  /**
   * Removes whitespace from the beginning and end of a string.
   *
   * @example $trim('  hello  ') // 'hello'
   */
  trim(args, vars, expry) {
    const string = expry(args, vars) as string;
    return string.trim();
  },

  /**
   * Returns the string converted to uppercase.
   *
   * @example $toUpper('Marti Serra') // 'MARTI SERRA'
   */
  toUpper(args, vars, expry) {
    const string = expry(args, vars) as string;
    return string.toUpperCase();
  },
};
