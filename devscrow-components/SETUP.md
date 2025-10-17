# Quick Setup Guide

## Installation Steps

### Step 1: Install the Package

Choose one of these methods:

**Method A: Local Package**
```bash
# Copy the devscrow-components folder to your project root
cp -r devscrow-components /path/to/your/project/

# Navigate to the components folder and build
cd devscrow-components
npm install
npm run build

# Go back to your project and install the local package
cd ..
npm install ./devscrow-components
```

**Method B: Direct Copy**
```bash
# Copy the src folder contents to your components directory
cp -r devscrow-components/src/* /path/to/your/project/components/
```

### Step 2: Install Dependencies

```bash
npm install @clerk/nextjs @radix-ui/react-slot class-variance-authority clsx framer-motion lucide-react next-themes tailwind-merge
```

### Step 3: Configure Tailwind CSS

Update your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // If using the npm package:
    './node_modules/devscrow-components/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
  },
  plugins: [],
}
```

### Step 4: Add CSS Variables

Add this to your `globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 84% 4.9%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
    --primary-foreground: 222.2 84% 4.9%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 224.3 76.3% 94.1%;
  }
}
```

### Step 5: Setup Providers

Update your root layout or _app.js:

```tsx
// app/layout.tsx (App Router)
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from 'next-themes'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
```

```tsx
// pages/_app.tsx (Pages Router)
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </ClerkProvider>
  )
}
```

### Step 6: Environment Variables

Add these to your `.env.local`:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Step 7: Use the Components

```tsx
import { Header, ShareWidget, Footer } from 'devscrow-components'
// Or if copying directly:
// import { Header } from './components/Header'

const config = {
  // ... your configuration
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header config={headerConfig} />
      <main className="flex-1">{children}</main>
      <Footer config={footerConfig} />
      <ShareWidget config={shareConfig} />
    </div>
  )
}
```

## Troubleshooting

### Common Issues

1. **Theme toggle not working**: Make sure ThemeProvider is properly configured
2. **Clerk authentication errors**: Verify your Clerk environment variables
3. **Styling issues**: Ensure Tailwind CSS variables are properly defined
4. **Build errors**: Check that all peer dependencies are installed

### Getting Help

- Check the examples folder for complete working implementations
- Review the README.md for detailed API documentation
- Ensure all dependencies are properly installed and configured