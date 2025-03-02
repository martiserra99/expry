import type { Operations } from "@expry/system";
import type { OnNext, OnBack, GetState, SetState } from "@formity/system";
import type {
  ModelListSchema,
  ModelCondSchema,
  ModelLoopSchema,
  ModelSwitchSchema,
  ModelFormSchema,
  ModelYieldSchema,
  ModelReturnSchema,
  ModelVariablesSchema,
} from "@formity/system";

export type FormityPrototypes = {
  schema$cond: {
    params: {
      if: unknown;
      then: unknown[];
      else: unknown[];
    };
    return: ModelCondSchema;
  };
  schema$loop: {
    params: {
      while: unknown;
      do: unknown[];
    };
    return: ModelLoopSchema;
  };
  schema$switch: {
    params: {
      branches: {
        case: unknown;
        then: unknown[];
      }[];
      default: unknown[];
    };
    return: ModelSwitchSchema;
  };
  schema$form: {
    params: {
      values: unknown;
      render: unknown;
    };
    return: ModelFormSchema;
  };
  schema$yield: {
    params: {
      next: unknown;
      back: unknown;
    };
    return: ModelYieldSchema;
  };
  schema$return: {
    params: unknown;
    return: ModelReturnSchema;
  };
  schema$variables: {
    params: unknown;
    return: ModelVariablesSchema;
  };
};

export const formityOperations: Operations<FormityPrototypes> = {
  /**
   * Returns the condition schema element.
   */
  schema$cond: (args, vars, expry): ModelCondSchema => {
    const condition = (inputs: object) => {
      return expry(args.if, { ...vars, ...with$(inputs) }) as boolean;
    };
    const thenPath = args.then.map((i) => expry(i, vars)) as ModelListSchema;
    const elsePath = args.else.map((i) => expry(i, vars)) as ModelListSchema;
    return { cond: { if: condition, then: thenPath, else: elsePath } };
  },

  /**
   * Returns the loop schema element.
   */
  schema$loop: (args, vars, expry): ModelLoopSchema => {
    const condition = (inputs: object) => {
      return expry(args.while, { ...vars, ...with$(inputs) }) as boolean;
    };
    const items = args.do.map((i) => expry(i, vars)) as ModelListSchema;
    return { loop: { while: condition, do: items } };
  },

  /**
   * Returns the switch schema element.
   */
  schema$switch: (args, vars, expry): ModelSwitchSchema => {
    const branches = args.branches.map((branch) => ({
      case: (inputs: object) => {
        return expry(branch.case, { ...vars, ...with$(inputs) }) as boolean;
      },
      then: branch.then.map((i) => expry(i, vars)) as ModelListSchema,
    }));
    const fallback = args.default.map((i) => expry(i, vars)) as ModelListSchema;
    return { switch: { branches, default: fallback } };
  },

  /**
   * Returns the form schema element.
   */
  schema$form: (args, vars, expry): ModelFormSchema => {
    const values = (inputs: object) => {
      return expry(args.values, {
        ...vars,
        ...with$(inputs),
      }) as Record<string, [unknown, PropertyKey[]]>;
    };
    const render = (object: {
      inputs: object;
      values: object;
      params: object;
      onNext: OnNext;
      onBack: OnBack;
      getState: GetState;
      setState: SetState;
    }) => expry(args.render, { ...vars, ...with$(object) });
    return { form: { values, render } };
  },

  /**
   * Returns the yield schema element.
   */
  schema$yield: (args, vars, expry): ModelYieldSchema => {
    const next = (inputs: object) => {
      return expry(args.next, { ...vars, ...with$(inputs) }) as unknown[];
    };
    const back = (inputs: object) => {
      return expry(args.back, { ...vars, ...with$(inputs) }) as unknown[];
    };
    return { yield: { next, back } };
  },

  /**
   * Returns the return schema element.
   */
  schema$return: (args, vars, expry): ModelReturnSchema => {
    const values = (inputs: object) => {
      return expry(args, { ...vars, ...with$(inputs) });
    };
    return { return: values };
  },

  /**
   * Returns the variables schema element.
   */
  schema$variables: (args, vars, expry): ModelVariablesSchema => {
    const values = (inputs: object) => {
      return expry(args, { ...vars, ...with$(inputs) }) as object;
    };
    return { variables: values };
  },
};

function with$(values: object) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => {
      return [`$${key}`, value];
    })
  );
}
