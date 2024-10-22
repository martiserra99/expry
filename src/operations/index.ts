import { arithmetic, Arithmetic } from "./arithmetic";
import { array, Array } from "./array";
import { boolean, Boolean } from "./boolean";
import { comparison, Comparison } from "./comparison";
import { conditional, Conditional } from "./conditional";
import { object, Object } from "./object";
import { string, String } from "./string";
import { type, Type } from "./type";
import { variable, Variable } from "./variable";

type Operations = Arithmetic &
  Array &
  Boolean &
  Comparison &
  Conditional &
  Object &
  String &
  Type &
  Variable;

export const operations: Operations = {
  ...arithmetic,
  ...array,
  ...boolean,
  ...comparison,
  ...conditional,
  ...object,
  ...string,
  ...type,
  ...variable,
};
