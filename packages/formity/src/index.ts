import type { Executions } from "@expry/system";
import type {
  OnNext,
  OnBack,
  OnJump,
  GetState,
  SetState,
} from "@formity/system";

import type { ListFlow } from "./types/flow";
import type { ConditionFlow } from "./types/flow";
import type { LoopFlow } from "./types/flow";
import type { SwitchFlow } from "./types/flow";
import type { JumpFlow } from "./types/flow";
import type { FormFlow } from "./types/flow";
import type { VariablesFlow } from "./types/flow";
import type { YieldFlow } from "./types/flow";
import type { ReturnFlow } from "./types/flow";

/**
 * Structure of the Formity operations to be used in the expry function.
 */
export type FormityOperations = {
  formity$condition: {
    params: {
      if: unknown;
      then: unknown[];
      else: unknown[];
    };
    return: ConditionFlow;
  };
  formity$loop: {
    params: {
      while: unknown;
      do: unknown[];
    };
    return: LoopFlow;
  };
  formity$switch: {
    params: {
      branches: {
        case: unknown;
        then: unknown[];
      }[];
      default: unknown[];
    };
    return: SwitchFlow;
  };
  formity$jump: {
    params: {
      id: unknown;
      at: unknown;
    };
    return: JumpFlow;
  };
  formity$form: {
    params: {
      fields: unknown;
      render: unknown;
    };
    return: FormFlow;
  };
  formity$variables: {
    params: unknown;
    return: VariablesFlow;
  };
  formity$yield: {
    params: {
      next: unknown;
      back: unknown;
    };
    return: YieldFlow;
  };
  formity$return: {
    params: unknown;
    return: ReturnFlow;
  };
};

/**
 * Formity operations to be used in the expry function.
 */
export const formityOperations: Executions<FormityOperations> = {
  /**
   * Returns the condition formity element.
   */
  formity$condition: (args, vars, expry): ConditionFlow => {
    const condition = (values: Record<string, unknown>) => {
      return expry(args.if, { ...vars, ...with$(values) }) as boolean;
    };
    const thenPath = args.then.map((i) => expry(i, vars)) as ListFlow;
    const elsePath = args.else.map((i) => expry(i, vars)) as ListFlow;
    return { condition: { if: condition, then: thenPath, else: elsePath } };
  },

  /**
   * Returns the loop formity element.
   */
  formity$loop: (args, vars, expry): LoopFlow => {
    const condition = (values: Record<string, unknown>) => {
      return expry(args.while, { ...vars, ...with$(values) }) as boolean;
    };
    const elements = args.do.map((i) => expry(i, vars)) as ListFlow;
    return { loop: { while: condition, do: elements } };
  },

  /**
   * Returns the switch formity element.
   */
  formity$switch: (args, vars, expry): SwitchFlow => {
    const branches = args.branches.map((branch) => ({
      case: (values: Record<string, unknown>) => {
        return expry(branch.case, { ...vars, ...with$(values) }) as boolean;
      },
      then: branch.then.map((i) => expry(i, vars)) as ListFlow,
    }));
    const fallback = args.default.map((i) => expry(i, vars)) as ListFlow;
    return { switch: { branches, default: fallback } };
  },

  /**
   * Returns thejump formity element.
   */
  formity$jump: (args, vars, expry): JumpFlow => {
    const id = expry(args.id, vars);
    const at = expry(args.at, vars) as FormFlow;
    return { jump: { id, at } };
  },

  /**
   * Returns the form formity element.
   */
  formity$form: (args, vars, expry): FormFlow => {
    const fields = (values: Record<string, unknown>) => {
      return expry(args.fields, {
        ...vars,
        ...with$(values),
      }) as Record<string, [unknown, PropertyKey[]]>;
    };
    const render = (object: {
      fields: Record<string, unknown>;
      values: Record<string, unknown>;
      params: Record<string, unknown>;
      onNext: OnNext<Record<string, unknown>>;
      onBack: OnBack<Record<string, unknown>>;
      onJump: OnJump<Record<string, unknown>>;
      getState: GetState<Record<string, unknown>>;
      setState: SetState;
    }) => expry(args.render, { ...vars, ...with$(object) });
    return { form: { fields, render } };
  },

  /**
   * Returns the variables formity element.
   */
  formity$variables: (args, vars, expry): VariablesFlow => {
    const variables = (values: Record<string, unknown>) => {
      return expry(args, { ...vars, ...with$(values) }) as Record<
        string,
        unknown
      >;
    };
    return { variables: variables };
  },

  /**
   * Returns the yield formity element.
   */
  formity$yield: (args, vars, expry): YieldFlow => {
    const next = (values: Record<string, unknown>) => {
      return expry(args.next, { ...vars, ...with$(values) }) as unknown[];
    };
    const back = (values: Record<string, unknown>) => {
      return expry(args.back, { ...vars, ...with$(values) }) as unknown[];
    };
    return { yield: { next, back } };
  },

  /**
   * Returns the return formity element.
   */
  formity$return: (args, vars, expry): ReturnFlow => {
    const values = (values: Record<string, unknown>) => {
      return expry(args, { ...vars, ...with$(values) });
    };
    return { return: values };
  },
};

function with$(values: object) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => {
      return [`$${key}`, value];
    }),
  );
}
