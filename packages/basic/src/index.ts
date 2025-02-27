import { Merge, Operations } from "@expry/system";

import { arithmeticOperations, ArithmeticPrototypes } from "./arithmetic";
import { arrayOperations, ArrayPrototypes } from "./array";
import { booleanOperations, BooleanPrototypes } from "./boolean";
import { comparisonOperations, ComparisonPrototypes } from "./comparison";
import { conditionalOperations, ConditionalPrototypes } from "./conditional";
import { objectOperations, ObjectPrototypes } from "./object";
import { stringOperations, StringPrototypes } from "./string";
import { typeOperations, TypePrototypes } from "./type";
import { variableOperations, VariablePrototypes } from "./variable";

export type BasicPrototypes = Merge<
  [
    ArithmeticPrototypes,
    ArrayPrototypes,
    BooleanPrototypes,
    ComparisonPrototypes,
    ConditionalPrototypes,
    ObjectPrototypes,
    StringPrototypes,
    TypePrototypes,
    VariablePrototypes
  ]
>;

export const basicOperations: Operations<BasicPrototypes> = {
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
