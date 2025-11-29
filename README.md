# Shopcart Project

This project consists of a full-stack application that implements a shopping cart with a React frontend (Vite + TypeScript) and an Express backend.
## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 20.19 or higher
- **pnpm**: Version 9 or higher

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/andiarist/shopcart.git
   cd shopcart
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Start development server**

   ```bash
   pnpm run start
   ```

4. **Open your browser**

   Navigate to `http://localhost:5173` to see your application running.

### Verify Setup

```bash
# Run tests
pnpm test

# Check code quality
pnpm run lint

# Build for production
pnpm run build

```

## 📁 Project Structure

```

shopcart/
├── server/             # Backend
│ ├── index.ts          # express server
│ ├── products.json     # data
├── public/             # Static assets
│ └── favicon.svg       # Favicon
├── src/ # Frontend
│ ├── assets/           # Static assets and translations
│ ├── pages/            #
│ ├── public/           #
│ ├── test/             #
│ ├── App.tsx           #
│ ├── main.tsx          #
│ └── routes.tsx        #
├── package.json        #
├── vite.config.ts      #
└── Configuration files...

```

## 🧪 Running Tests

```bash
# Run all tests in watch mode
pnpm test
```

## 🚀 Deployment

### Build for Production

```bash
pnpm run build
```
