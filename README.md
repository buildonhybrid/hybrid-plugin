# @buildonhybrid/hybrid-plugin

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
pnpm install @buildonhybrid/hybrid-plugin
```

## Configuration

### Environment Variables

```typescript
HYBRID_API_KEY=<Your Hybrid API key>
HYBRID_PLUGIN_URL=<Your Hybrid service URL>
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
