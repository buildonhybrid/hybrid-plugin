import { Tool } from "./types";

/**
 * Fetch tools schema
 */
export async function getTools(
  getSetting: (key: string) => string | undefined
): Promise<Tool[]> {
  try {
    const apiKey = getSetting("HYBRID_API_KEY");
    const serviceUrl = getSetting("HYBRID_PLUGIN_URL");

    const header = new Headers();

    header.append("accept", "application/json");
    header.append("Content-Type", "application/json");
    header.append("x-api-key", apiKey);
    const options = { headers: header };

    const response = await fetch(
      `${serviceUrl}/api/hybrid-plugin/tools`,
      options
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch tools schema: ${response.statusText}`);
    }

    const toolsSchema = await response.json();
    return toolsSchema;
  } catch (error) {
    console.error("Error in getTools function:", error);
    throw new Error(`Failed to fetch tools schema: ${error.message}`);
  }
}

/**
 * Returns the response from the tool
 * @param toolName The tool that needs to be called
 * @param args Arguments for the tool
 */
export async function getToolResponse(
  getSetting: (key: string) => string | undefined,
  toolName: string,
  args: any
): Promise<string> {
  try {
    const apiKey = getSetting("HYBRID_API_KEY");
    const serviceUrl = getSetting("HYBRID_PLUGIN_URL");

    const header = new Headers();

    header.append("accept", "application/json");
    header.append("Content-Type", "application/json");
    header.append("x-api-key", apiKey);
    console.log("Request body:", JSON.stringify({ args: JSON.parse(args) }));
    const options = {
      method: "POST",
      headers: header,
      // NOTE: this is intentional as args are in string and needs to be parsed
      body: JSON.stringify({ args: JSON.parse(args) }),
    };

    const response = await fetch(
      `${serviceUrl}/api/hybrid-plugin/${toolName}`,
      options
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch tools schema: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const jsonResponse = await response.json();
      return JSON.stringify(jsonResponse);
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error("Error in getToolResponse function:", error);
    return "No response from the tool";
  }
}
