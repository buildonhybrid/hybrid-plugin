export interface Tool {
  type: "function";
  function: ToolFunction;
}

export interface ToolFunction {
  name: string;
  description: string;
  parameters: ToolParameters;
}

export interface ToolParameters {
  type: "object";
  properties: {
      [key: string]: ToolProperty;
  };
  required: string[];
}

export interface ToolProperty {
  type: string;
  description: string;
  items?: {
      type: string;
  };
}