# Project Architecture

## SPA Structure
The application follows a modular Single Page Application (SPA) architecture using **Next.js App Router**.

### Core Layout
- `layout.tsx`: Root layout with design system tokens and global styles.
- `page.tsx`: Entry point that handles module switching based on state.

### Module Switching
A central state controller (using React Context or simple state) manages the current active "view":
- `LANDING`
- `LOGIN`
- `DASHBOARD` (sub-tabs: WALLET, STAKING, CREATORS, NFTS, EXPLORE)

### Component Hierarchy
- `components/ui/`: Atomic components (Buttons, Cards, Inputs) based on the "Obsidian Void" design system.
- `components/modules/`: High-level feature modules (WalletModule, StakingModule, etc.).
- `components/layout/`: Shared layout components (Navbar, Sidebar, Footer).

### State Management
- `AuthContext`: Manages login status and user profile.
- `AppScrollContext`: Handles navigation and SPA view states.
- `DataContext`: Stores balances, creators, NFTs, and transaction history.

### Design Tokens
Utilizing the "WylerChain Premium Launch UI" design system:
- Colors: Deep Obsidian (#0e0e0e), Glowing Flux Blue (#a2a6ff).
- Typography: Space Grotesk (Headlines), Inter (Body).
- Effects: Glassmorphism, tonal layering, no-hard-borders.
