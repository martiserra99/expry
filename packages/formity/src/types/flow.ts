import type { OnNext, OnBack, OnJump, GetState, SetState } from "./controls";

export type Flow = ListFlow;

export type ItemFlow =
  | NestFlow
  | FormFlow
  | VariablesFlow
  | YieldFlow
  | ReturnFlow;

export type NestFlow =
  | ListFlow
  | ConditionFlow
  | LoopFlow
  | SwitchFlow
  | JumpFlow;

export type ListFlow = ItemFlow[];

export type ConditionFlow = {
  condition: {
    if: (values: Record<string, unknown>) => boolean;
    then: ListFlow;
    else: ListFlow;
  };
};

export type LoopFlow = {
  loop: {
    while: (values: Record<string, unknown>) => boolean;
    do: ListFlow;
  };
};

export type SwitchFlow = {
  switch: {
    branches: {
      case: (values: Record<string, unknown>) => boolean;
      then: ListFlow;
    }[];
    default: ListFlow;
  };
};

export type JumpFlow = {
  jump: {
    id: unknown;
    at: FormFlow;
  };
};

export type FormFlow = {
  form: {
    fields: (
      values: Record<string, unknown>,
    ) => Record<string, [unknown, PropertyKey[]]>;
    render: (args: {
      fields: Record<string, unknown>;
      values: Record<string, unknown>;
      params: Record<string, unknown>;
      onNext: OnNext<Record<string, unknown>>;
      onBack: OnBack<Record<string, unknown>>;
      onJump: OnJump<Record<string, unknown>>;
      getState: GetState<Record<string, unknown>>;
      setState: SetState;
    }) => unknown;
  };
};

export type VariablesFlow = {
  variables: (values: Record<string, unknown>) => Record<string, unknown>;
};

export type YieldFlow = {
  yield: {
    next: (values: Record<string, unknown>) => unknown[];
    back: (values: Record<string, unknown>) => unknown[];
  };
};

export type ReturnFlow = {
  return: (values: Record<string, unknown>) => unknown;
};
