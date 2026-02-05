# TechCronch - Future Tech Market Command Center

TechCronch is a next-generation market intelligence dashboard featuring real-time data simulation, AI-driven content analysis, and enterprise-grade security demonstrations.

## Features

- **Real-Time Market Data**: Live updates for Crypto, Forex, and Stocks via `MarketSDK`.
- **AI Validator**: Integrated service validation system with real-time diagnostics.
- **GhostNet Security**: Simulated enterprise VPN/Traffic obfuscation interface.
- **Advanced Filtering**: Filter events by category, impact, and country.
- **Interactive Charts**: Powered by Chart.js with dynamic timeframes.
- **Sentiment Analysis**: Automated sentiment tagging for news articles.
- **Accessibility**: WCAG 2.1 AA compliant design.

## Project Structure

- `index.html`: Main application entry point (SPA architecture).
- `_sdk/`: Mock SDKs simulating backend services.
  - `market_sdk.js`: Real-time market data generator.
  - `data_sdk.js`: Data provider for articles, events, and user interactions.
  - `guardian_sdk.js`: Security and sanitization layer.
  - `ai_validator.js`: AI service diagnostics engine.

## Quick Start

1. **Install Dependencies** (only for local dev server):
   ```bash
   npm install
   ```

2. **Run Local Server**:
   ```bash
   npx http-server -p 8080
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser.

## Deployment

To create a production-ready build:

1. Run the deployment script:
   ```powershell
   .\deploy.ps1
   ```
   This will create a `dist/` folder containing all necessary files.

2. Upload the contents of the `dist/` folder to any static hosting provider (Netlify, Vercel, GitHub Pages, AWS S3).

See [DEPLOY.md](DEPLOY.md) for detailed instructions.
