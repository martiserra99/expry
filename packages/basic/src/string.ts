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
  substring: {
    params: [unknown, unknown, unknown];
    return: string;
  };
  toLower: {
    params: unknown;
    return: string;
  };
  toUpper: {
    params: unknown;
    return: string;
  };
  trim: {
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
    const array = args.map((arg) => expry(arg, vars)) as string[];
    return array.join("");
  },

  /**
   * Removes whitespace from the beginning of a string.
   *
   * @example $ltrim('  hello ') // 'hello '
   */
  ltrim(args, vars, expry) {
    const string = expry(args, vars) as string;
    return string.replace(/^\s+/, "");
  },

  /**
   * Removes whitespace from the end of a string.
   *
   * @example $rtrim(' hello  ') // ' hello'
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
   * @example $substring(['hello', 0, 2]) // 'he'
   * @example $substring(['hello', 1, 3]) // 'el'
   */
  substring(args, vars, expry) {
    const string = expry(args[0], vars) as string;
    const start = expry(args[1], vars) as number;
    const end = expry(args[2], vars) as number;
    return string.substring(start, end);
  },

  /**
   * Converts a string to lowercase.
   *
   * @example $toLower('Hello World') // 'hello world'
   */
  toLower(args, vars, expry) {
    const string = expry(args, vars) as string;
    return string.toLowerCase();
  },

  /**
   * Converts a string to uppercase.
   *
   * @example $toUpper('Hello World') // 'HELLO WORLD'
   */
  toUpper(args, vars, expry) {
    const string = expry(args, vars) as string;
    return string.toUpperCase();
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
};
