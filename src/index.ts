import type { Plugin } from "@elizaos/core";
import { getActions } from "./action";
async function createHybridPlugin(
    getSetting: (key: string) => string | undefined
): Promise<Plugin> {
    const actions = await getActions(getSetting);
    return {
        name: "[HYBRID] Real-Time data and news",
        description: "Helps you search the web, get real-time data, and news, sentiment analysis, and more",
        providers: [],
        evaluators: [],
        services: [],
        actions: actions,
    };
}

export default createHybridPlugin;
