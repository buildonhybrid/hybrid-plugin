# @buildonhybrid/hybrid-plugin

<div align="center">
  <img src="images/display-card.png" alt="Hybrid Plugin Banner" width="800"/>
</div>

A plugin that brings together the power of AI and cryptocurrency data, enabling intelligent analysis and insights within the ElizaOS ecosystem.

## Description

The Hybrid plugin bridges the gap between artificial intelligence and cryptocurrency markets, providing a sophisticated suite of tools that combine real-time market data with AI-powered analysis. This plugin enables your AI agent to not just fetch cryptocurrency data, but to understand, analyze, and provide intelligent insights about market trends, news, and blockchain activities.

For more information about Hybrid's capabilities and architecture, visit [Hybrid Documentation](https://docs.buildonhybrid.com/) or the [Hybrid Website](https://buildonhybrid.com/).

## Features

- **Coin-Specific News**: Get the latest news and updates for any specific cryptocurrency
- **Crypto Market News**: Access general news and developments in the cryptocurrency world
- **Social Media Analysis**: View social media summaries and sentiment for any coin
- **Real-Time Market Data**: Access live price, volume, and market cap information
- **Coin Metadata**: Get detailed information about any cryptocurrency
- **Transaction Analysis**: Read and summarize transaction hashes for portfolio tracking
- **Balance Tracking**: Check wallet balances across different cryptocurrencies
- **Web Search**: Perform online searches for cryptocurrency-related information
- **Market Trends**: Access data on trending coins and top gainers/losers
- **Historical Data**: View historical price and performance data for any coin

## Installation

```bash
# First, install @elizaos/core (required peer dependency)
pnpm add @elizaos/core

# Then install the hybrid plugin
pnpm add @buildonhybrid/hybrid-plugin
```

**Note:** This plugin requires `@elizaos/core` to be installed in your project. Make sure to install it before installing the hybrid plugin.

## Configuration

### Obtaining an API Key

To use the Hybrid plugin, you'll need to obtain an API key from the [Hybrid Developer Portal](https://developer-portal.buildonhybrid.com/). Follow these steps:

1. Visit the [Hybrid Developer Portal](https://developer-portal.buildonhybrid.com/)
2. Sign up or log in to your account
3. Click on the "Create API Key" button
4. Copy the generated key for use in your environment variables

### Environment Variables

```typescript
HYBRID_API_KEY=<Your Hybrid API key>
HYBRID_PLUGIN_URL="https://api.buildonhybrid.com"
```

## Usage

The plugin provides a comprehensive set of tools that can be accessed through the ElizaOS framework. Each tool is designed to provide specific cryptocurrency and blockchain data insights.

### Available Tools

1. **News Tools**

   - Coin-specific news retrieval
   - General crypto market news
   - Social media summaries

2. **Market Data Tools**

   - Real-time price and volume data
   - Trending coins
   - Top gainers and losers
   - Historical price data

3. **Blockchain Tools**

   - Transaction hash analysis
   - Wallet balance checking
   - Coin metadata retrieval

4. **Search and Analysis**
   - Online search capabilities
   - Market trend analysis
   - Portfolio tracking

## Common Issues & Troubleshooting

1. **API Connection Issues**

   - Verify API key is correctly configured
   - Check service URL availability
   - Ensure proper network connectivity

2. **Data Retrieval Issues**
   - Verify coin symbols are correct
   - Check API rate limits
   - Confirm data availability for requested timeframes

## Security Best Practices

1. **API Key Management**

   - Store API keys securely
   - Use environment variables
   - Never expose keys in code

2. **Data Handling**
   - Implement proper error handling
   - Validate input parameters
   - Monitor API usage

## Development Guide

### Setting Up Development Environment

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Build the plugin:

```bash
pnpm run build
```

## Future Enhancements

- Additional cryptocurrency data sources
- Enhanced market analysis tools
- Advanced portfolio tracking features
- Custom data visualization options
- Extended historical data capabilities
- Real-time alerts and notifications

## Contributing

Contributions are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information.

## Credits

This plugin integrates with and builds upon several key technologies:

- [Hybrid](https://buildonhybrid.com/): Where cryptocurrency meets artificial intelligence
- [Hybrid Documentation](https://docs.buildonhybrid.com/): Comprehensive guides and API references

## License

This plugin is part of the Eliza project. See the main project repository for license information.

## Using with ElizaOS

This plugin can be used with ElizaOS to enhance your AI agent's capabilities with cryptocurrency data and analysis. Here's how to integrate it:

### Installation in ElizaOS

1. **Add to Project Dependencies**
   Add the plugin to your agent's `package.json`:
   ```json
   {
     "dependencies": {
       "@buildonhybrid/hybrid-plugin": "workspace:*"
     }
   }
   ```

2. **Configure in Character**
   Import the plugin in your agent's `character.json`:
   ```json
   {
     "plugins": [
       "@buildonhybrid/hybrid-plugin"
     ]
   }
   ```

3. **Environment Setup**
   Make sure to set up the required environment variables in your ElizaOS configuration:
   ```typescript
   HYBRID_API_KEY=<Your Hybrid API key>
   HYBRID_PLUGIN_URL=<Your Hybrid service URL>
   ```

### Example Usage in ElizaOS

Once configured, your ElizaOS agent can use the plugin's capabilities through natural language commands. For example:

- "What's the latest news about Bitcoin?"
- "Show me the current market trends"
- "Analyze this transaction hash: 0x..."
- "What's the sentiment on social media for Ethereum?"

The plugin will automatically process these requests and provide relevant cryptocurrency data and insights.
