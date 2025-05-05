import {
    type Action,
    generateText,
    type HandlerCallback,
    type IAgentRuntime,
    type Memory,
    ModelClass,
    type State,
    composeContext,
    generateObject,
    elizaLogger,
} from "@elizaos/core";
import { getTools, getToolResponse } from "./services";
import { Tool, ToolParameters, ToolProperty } from "./types";
import { z } from "zod";

interface ParametersResult {
    success: boolean;
    data?: Record<string, unknown>;
    error?: {
        message: string;
        details: z.ZodError["errors"];
    };
}

/**
 * Get all the on chain actions for the given wallet client and plugins
 *
 * @param params
 * @returns
 */
export async function getActions(
    getSetting: (key: string) => string | undefined
): Promise<Action[]> {
    let allTools = await getTools(getSetting);

    // TODO: filtering out the tools according to the needs of the user
    // allTools = allTools.filter(
    //     (tool) => tool.function.name === "getOnlineSearchTool"
    // );

    return allTools.map((tool) => createAction(tool, getSetting));
}

function createAction(
    tool: Tool,
    getSetting: (key: string) => string | undefined
): Action {
    return {
        name: tool.function.name,
        similes: [],
        description: tool.function.description,
        validate: async () => true,
        handler: async (
            runtime: IAgentRuntime,
            message: Memory,
            state: State | undefined,
            options?: Record<string, unknown>,
            callback?: HandlerCallback
        ): Promise<boolean> => {
            try {
                let currentState =
                    state ?? (await runtime.composeState(message));
                currentState = await runtime.updateRecentMessageState(
                    currentState
                );

                const parameterContext = composeParameterContext(
                    tool,
                    currentState
                );
                const parametersResult: ParametersResult =
                    await generateParameters(runtime, parameterContext, tool);

                if (!parametersResult.success) {
                    callback?.({
                        text: `Invalid parameters for action ${tool.function.name}: ${parametersResult.error?.message}`,
                        content: { error: parametersResult.error?.details },
                    });
                    return false;
                }

                // instead of letting user know why there was an error, we can ask model to generate an appropriate response.
                let result: any;
                try {
                    // Convert parameters to JSON string before passing to getToolResponse
                    const stringifiedParams = JSON.stringify(
                        parametersResult.data
                    );
                    result = await getToolResponse(
                        getSetting,
                        tool.function.name,
                        stringifiedParams
                    );
                } catch (error) {
                    console.log("Error executing tool:", error);
                    elizaLogger.error(
                        "Error executing tool:",
                        JSON.stringify(error)
                    );
                    result = { error: error.message };
                }
                const responseContext = composeResponseContext(
                    tool,
                    result,
                    currentState
                );
                const response = await generateResponse(
                    runtime,
                    responseContext
                );

                // save response to the memory

                await runtime.messageManager.createMemory({
                    characterId: runtime.character.id,
                    userId: runtime.agentId,
                    agentId: runtime.agentId,
                    roomId: message.roomId,
                    content: { text: response },
                });

                callback?.({ text: response, content: result });
                return true;
            } catch (error) {
                const errorMessage =
                    error instanceof Error ? error.message : String(error);
                callback?.({
                    text: `Error executing action ${tool.function.name}: ${errorMessage}`,
                    content: { error: errorMessage },
                });
                return false;
            }
        },
        examples: [],
    };
}

function composeParameterContext(tool: Tool, state: State): string {
    const contextTemplate = `{{recentMessages}}
Given the recent messages, extract the following information for the action "${
        tool.function.name
    }":
${JSON.stringify(tool.function.parameters)}
`;
    return composeContext({ state, template: contextTemplate });
}

function convertToolPropertyToZodSchema(
    property: ToolProperty
): z.ZodType<any> {
    switch (property.type.toLowerCase()) {
        case "string":
            return z.string().describe(property.description);
        case "number":
            return z.number().describe(property.description);
        case "boolean":
            return z.boolean().describe(property.description);
        case "array":
            if (property.items?.type) {
                const itemSchema = convertToolPropertyToZodSchema({
                    type: property.items.type,
                    description: "",
                });
                return z.array(itemSchema).describe(property.description);
            }
            return z.array(z.any()).describe(property.description);
        default:
            return z.any().describe(property.description);
    }
}

function convertToolParametersToZodSchema(
    parameters: ToolParameters
): z.ZodObject<any> {
    const shape: Record<string, z.ZodType<any>> = {};

    for (const [key, property] of Object.entries(parameters.properties)) {
        shape[key] = convertToolPropertyToZodSchema(property);
    }

    const schema = z.object(shape);

    if (parameters.required && parameters.required.length > 0) {
        // Convert array of required fields to an object with true values
        const requiredFields = parameters.required.reduce((acc, field) => {
            acc[field] = true;
            return acc;
        }, {} as Record<string, true>);

        return schema.required(requiredFields);
    }

    return schema;
}

async function generateParameters(
    runtime: IAgentRuntime,
    context: string,
    tool: Tool
): Promise<ParametersResult> {
    const zodSchema = convertToolParametersToZodSchema(
        tool.function.parameters
    );

    const { object } = await generateObject({
        runtime,
        context,
        modelClass: ModelClass.LARGE,
        schema: zodSchema,
        schemaName: tool.function.name,
        schemaDescription: tool.function.description,
    });

    // Use safeParse to validate the generated object against our schema
    const result = zodSchema.safeParse(object);

    if (!result.success) {
        // If validation fails, return an object with error information
        return {
            success: false,
            error: {
                message: "Parameter validation failed",
                details: result.error.errors,
            },
        };
    }

    // If validation succeeds, return an object with the parsed data
    return {
        success: true,
        data: result.data,
    };
}

function composeResponseContext(
    tool: Tool,
    result: unknown,
    state: State
): string {
    const responseTemplate = `
  # Action Examples
{{actionExamples}}
(Action examples are for reference only. Do not use the information from them in your response.)
# Knowledge
{{knowledge}}
# Task: Generate dialog and actions for the character {{agentName}}.
About {{agentName}}:
{{bio}}
{{lore}}
{{providers}}
{{attachments}}
# Capabilities
Note that {{agentName}} is capable of reading/seeing/hearing various forms of media, including images, videos, audio, plaintext and PDFs. Recent attachments have been included above under the "Attachments" section.
The action "${tool.function.name}" was executed.
Here is the result:
${JSON.stringify(result)}
# Failure handling:
- If the action has failed, please let the user know that the action failed and try again later. NO API key failure or internal error messages SHOULD BE SHOWN TO THE USER.
- If the tool result is not relevant to the response, please let the user know about the information you have and let them know that you don't have more information.
- Look for keywords like "error", "failed", "not found", etc. to determine if the action has failed.
# Success handling:
- If the action was successful, generate an appropriate response based on the tool result.
- If the tool result is relevant to the response, please use the tool result to generate a response.
Respond to the message knowing that the action was successful and these were the previous messages:
{{recentMessages}}
`;
    return composeContext({ state, template: responseTemplate });
}

async function generateResponse(
    runtime: IAgentRuntime,
    context: string
): Promise<string> {
    return generateText({
        runtime,
        context,
        modelClass: ModelClass.LARGE,
    });
}
