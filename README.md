# Liquid Index 🍸

A modern cocktail discovery app that helps you explore, browse, and find your next favorite drink.

### ✨ Features

- **Cocktail of the Moment** - Get a random cocktail suggestion with every refresh
- **Browse by Letter** - Explore cocktails alphabetically from A to Z
- **Search Functionality** - Find specific cocktails by name
- **Ingredients Directory** - Browse all ingredients and discover drinks made with them
- **Favorites** - Save your preferred cocktails for quick access
- **Responsive Design** - Works seamlessly on desktop and mobile devices

### 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: Shadcn/UI components with Radix UI primitives
- **Data Source**: [TheCocktailDB API](https://www.thecocktaildb.com/)

### 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mryeminaung/cocktail-explorer.git
cd cocktail-explorer
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file and add API keys:
```env
COCKTAIL_API_URL=http://www.thecocktaildb.com/api/json/v1/1
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 🎯 Usage

- **Home Page**: Shows a random "Cocktail of the Moment" with a shuffle button to discover new drinks
- **Browse**: Navigate cocktails alphabetically using the letter grid
- **Search**: Find specific cocktails by name
- **Ingredients**: Browse all ingredients and see which cocktails use them
- **Favorites**: Access your saved cocktails (stored locally)
