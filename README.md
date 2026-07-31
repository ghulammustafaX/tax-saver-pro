# TaxBandCheck - Property Tax Appeal Tools

Free council tax band checker and property tax appeal tools for UK and USA homeowners.

## Project Overview

TaxBandCheck is a free web application that helps homeowners:
- Check if their UK council tax band is correct
- Appeal incorrect council tax bands with free letter generators
- Estimate property tax overpayments in the USA (all 50 states)
- Generate state-specific property tax appeal letters

## Technologies Used

This project is built with:

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **React** - UI framework
- **shadcn-ui** - Accessible component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Helmet Async** - SEO management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or bun package manager

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd tax-saver-pro

# Install dependencies
npm install
# or
bun install

# Start the development server
npm run dev
# or
bun dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/        # Reusable React components
│   ├── ui/           # shadcn-ui components
│   ├── uk/           # UK-specific components
│   └── usa/          # USA-specific components
├── pages/            # Page components (routing)
├── lib/              # Utility functions and schemas
└── hooks/            # Custom React hooks

public/               # Static assets
```

## Features

### UK Tools
- Council Tax Band Checker
- 1991 Property Value Estimator
- Savings Calculator
- Appeal Letter Generator
- Discounts & Reductions Checker

### USA Tools
- State-by-State Appeal Guide (all 50 states)
- Overpayment Estimator
- Appeal Letter Generator

## Build & Deploy

```sh
# Create production build
npm run build

# Preview production build
npm run preview
```

### GitHub Pages (project site)

- The app is configured for project-site hosting under `/tax-saver-pro/` via `vite.config.ts` (`base: "/tax-saver-pro/"`).
- SPA deep links are supported on GitHub Pages through `public/404.html` redirect fallback.
- Deploy the built `dist/` directory (for example with `npm run deploy`).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

All rights reserved © TaxBandCheck

## Contact

For questions or support, contact: g.mustafa4006@gmail.com
