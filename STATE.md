# WylerChain Project State

## Current Context
- **Workspace**: `e:\WylerChain`
- **Active Task**: Resuming development and integrating Stitch.
- **Last Updated**: 2026-09-07

## Completed Tasks
- [x] Initial UI/UX design for Landing Page.
- [x] Next.js 14 application setup in `launch-app`.
- [x] Dashboard shell and tab architecture implemented.
- [x] Mock authentication flow created.
- [x] Module UI components (Wallet, Staking, etc.) built with high-fidelity styles.
- [x] Fixed syntax and logical errors in `index.html` (CSS braces, Tailwind directives, button logic).
- [x] Social login options (Google / Telegram / X) added to the `/app` dashboard "Connect Wallet" button via additive overlay (`app/wyler-social-login.js`); mirrored `app/index.html` backed up to `app/index.html.pre-social.bak`.
- [x] OKX Wallet option added with user-provided logo (`logos/okx-icon.png`): real connect via `window.okxwallet` (EIP-1193) with demo-mode fallback; OKX row also injected into the native wallet modal. Overlay script bumped to `?v=2`.
- [x] Phantom Wallet option added with user-provided logo (`logos/phantom-icon.png`): real connect via `window.phantom` (EIP-1193) with demo-mode fallback; native "Phantom" row's generic icon rebranded with the logo, and a Phantom row injected when not detected. Overlay script bumped to `?v=3`; modal made scrollable.
- [x] MetaMask option added with user-provided logo (`logos/metamask-icon.png`): real connect via `window.ethereum.isMetaMask` (EIP-1193) with demo-mode fallback; native "MetaMask" row's generic icon rebranded with the logo, and a MetaMask row injected when not detected. Overlay script bumped to `?v=4`.
- [x] Coinbase Wallet option added with user-provided logo (`logos/coinbase-icon.png`): real connect via `window.coinbaseWalletExtension` / `isCoinbaseWallet` (EIP-1193) with demo-mode fallback; native "Coinbase Wallet" row's generic icon rebranded, and a Coinbase row injected when not detected. Overlay script bumped to `?v=5`.
- [x] Wallet rows without a custom logo hidden from the native wallet modal (`hideUnbrandedNativeRows`): only Wyler L3 Vault + the four branded wallets (OKX / Phantom / MetaMask / Coinbase) remain visible in the login/wallet section. Overlay script bumped to `?v=6`.
- [x] All updates merged and pushed to GitHub (merge commit `e550986`; remote branding history preserved, local site versions won shared files).
- [x] Fixed Vercel build failure: added `viem`, `wagmi`, `@tanstack/react-query` to `launch-app` (required by merged faucet route + Web3Provider) and fixed missing `Users` lucide import in `CreatorsTab.tsx`; verified with local `next build` (commit `519f439`).
- [x] Restored the premium obsidian disconnected-wallet UI (Access Restricted → Connect Your Wallet to Unlock Balance, Connect Secure Wallet CTA, Disconnected badge, premium Send/Receive actions) that was lost when commit `91e2371` overwrote `WalletModule.tsx`; restored from `a602a58` and wrapped the root layout with `Web3Provider` so wagmi hooks prerender cleanly; verified with local `next build`.

## Pending Tasks
- [ ] Connect `StitchMCP` to the application.
- [ ] Replace mocked authentication with real Stitch/Social Login.
- [ ] Map real-time data from Stitch to `WalletTab`.
- [ ] Implement actual staking/minting logic via Stitch.

## Active Blockers
- Identification of `StitchMCP` tool set and integration method.
