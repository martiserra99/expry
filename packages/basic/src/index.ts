import { Merge, Executions } from "@expry/system";

import { arithmeticOperations, ArithmeticOperations } from "./arithmetic";
import { arrayOperations, ArrayOperations } from "./array";
import { booleanOperations, BooleanOperations } from "./boolean";
import { comparisonOperations, ComparisonOperations } from "./comparison";
import { conditionalOperations, ConditionalOperations } from "./conditional";
import { objectOperations, ObjectOperations } from "./object";
import { stringOperations, StringOperations } from "./string";
import { typeOperations, TypeOperations } from "./type";
import { variableOperations, VariableOperations } from "./variable";

export type BasicOperations = Merge<
  [
    ArithmeticOperations,
    ArrayOperations,
    BooleanOperations,
    ComparisonOperations,
    ConditionalOperations,
    ObjectOperations,
    StringOperations,
    TypeOperations,
    VariableOperations
  ]
>;

export const basicOperations: Executions<BasicOperations> = {
  ...arithmeticOperations,
  ...arrayOperations,
  ...booleanOperations,
  ...comparisonOperations,
  ...conditionalOperations,
  ...objectOperations,
  ...stringOperations,
  ...typeOperations,
  ...variableOperations,
};
