# WylerChain
WylerChain is a Layer 3 blockchain on Arbitrum that enables zero gas fees, social login onboarding, and EVM‑compatible dApp deployment. It removes high transaction costs and wallet complexity so users can interact with Web3 like Web2, while developers get a scalable, secure, gas‑abstracted environment to build on.

## 🌐 Access the Site

- **Main website:** http://localhost:8080
- **Dashboard app:** http://localhost:8080/app

## 🚀 Run Locally

```bash
# 1. Start the dashboard app (Next.js) on port 3000
cd launch-app
npm run start

# 2. Start the unified server (landing page + /app proxy) on port 8080
cd ..
# Windows (PowerShell)
$env:PORT='8080'; node unified-server.js
# Linux / macOS
PORT=8080 node unified-server.js
```

