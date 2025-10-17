# DevScrow Components

A reusable React component library extracted from DevScrow, featuring a responsive header, share widget, and footer components with Tailwind CSS and shadcn/ui styling.

## Installation

### Option 1: Local Installation

1. Copy the `devscrow-components` folder to your project
2. Install dependencies:

```bash
cd devscrow-components
npm install
npm run build
```

3. In your main project, install the local package:

```bash
npm install ./devscrow-components
```

### Option 2: Direct Copy

Copy the components directly to your project and install required dependencies:

```bash
npm install @clerk/nextjs @radix-ui/react-slot class-variance-authority clsx framer-motion lucide-react next-themes tailwind-merge
```

## Dependencies

The components require the following peer dependencies in your project:

- React 18+
- Next.js 14+
- Tailwind CSS 3+
- Clerk (for authentication features)

## Components

### Header

A responsive navigation header with authentication integration, theme toggle, and mobile menu.

```tsx
import { Header, HeaderConfig } from 'devscrow-components'
import { Shield } from 'lucide-react'

const headerConfig: HeaderConfig = {
  brand: {
    name: "YourApp",
    href: "/",
    icon: Shield // Optional custom icon
  },
  navigation: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ],
  auth: {
    loginHref: "/login",
    signupHref: "/signup",
    dashboardHref: "/dashboard"
  },
  showThemeToggle: true // Optional, defaults to true
}

function App() {
  return (
    <div>
      <Header config={headerConfig} />
      {/* Your content */}
    </div>
  )
}
```

### ShareWidget

An animated share widget that appears at the bottom of the screen with responsive design.

```tsx
import { ShareWidget, ShareWidgetConfig } from 'devscrow-components'

const shareConfig: ShareWidgetConfig = {
  title: "Share YourApp with friends!",
  subtitle: "Send on WhatsApp",
  shareText: "Check out YourApp - an amazing platform for [your description]!",
  shareUrl: "https://yourapp.com", // Optional custom URL
  description: "Your app description", // Optional
  buttonText: "Share Now" // Optional, defaults to "Share Now"
}

function App() {
  return (
    <div>
      {/* Your content */}
      <ShareWidget config={shareConfig} />
    </div>
  )
}
```

### Footer

A comprehensive footer with multiple sections, social links, and responsive layout.

```tsx
import { Footer, FooterConfig } from 'devscrow-components'
import { Github, Twitter, Linkedin } from 'lucide-react'

const footerConfig: FooterConfig = {
  brand: {
    name: "YourApp",
    href: "/",
    description: "Your app description and value proposition goes here.",
    // icon: CustomIcon // Optional
  },
  sections: [
    {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Documentation", href: "/docs" },
        { name: "API", href: "/api" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Blog", href: "/blog" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Community", href: "/community", external: true },
        { name: "Status", href: "https://status.yourapp.com", external: true }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" }
      ]
    }
  ],
  socialLinks: [
    { name: "Github", href: "https://github.com/yourorg", icon: Github },
    { name: "Twitter", href: "https://twitter.com/yourhandle", icon: Twitter },
    { name: "LinkedIn", href: "https://linkedin.com/company/yourcompany", icon: Linkedin }
  ],
  copyright: "© 2024 YourApp. All rights reserved." // Optional
}

function App() {
  return (
    <div>
      {/* Your content */}
      <Footer config={footerConfig} />
    </div>
  )
}
```

## Setup Requirements

### 1. Tailwind CSS Configuration

Add the component paths to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/devscrow-components/dist/**/*.{js,ts,jsx,tsx}',
    // or if copying directly:
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of your config
}
```

### 2. Theme Provider Setup

For the theme toggle to work, wrap your app with the theme provider:

```tsx
import { ThemeProvider } from 'next-themes'

function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
```

### 3. Clerk Authentication Setup

Configure Clerk in your app:

```tsx
import { ClerkProvider } from '@clerk/nextjs'

function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Component {...pageProps} />
    </ClerkProvider>
  )
}
```

## Customization

### Styling

The components use Tailwind CSS classes and CSS custom properties. You can customize the appearance by:

1. **CSS Custom Properties**: Define your color palette in CSS variables
2. **Tailwind Config**: Extend your Tailwind theme
3. **Component Props**: Many styling options are configurable via props

### Example CSS Variables

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... add your custom colors */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode colors */
}
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

To contribute to this package:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## DevScrow Original

These components were extracted from [DevScrow](https://github.com/yourorg/devscrow), a secure escrow platform powered by DevvE's Contingent Transaction Sets technology.