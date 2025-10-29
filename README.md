# Random Wheel | 随机轮盘

A beautiful and interactive random wheel picker built with Next.js, featuring smooth animations and internationalization support.

## ✨ Features

- 🎯 **Interactive Wheel**: Smooth spinning animation with customizable options
- 🌍 **Internationalization**: Full support for English and Chinese with automatic language detection
- 🎨 **Beautiful UI**: Gradient colors and modern design with dark mode support
- 📱 **Responsive**: Fully optimized for mobile and desktop devices
- ⚡ **Fast**: Built with Next.js 16 and React 19
- 🎭 **Animations**: Powered by Framer Motion for fluid transitions
- 🔍 **SEO Optimized**: Complete SEO setup with sitemap, robots.txt, and structured data

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3758](http://localhost:3758) with your browser to see the result.

### Available Routes

- `/` - Automatically redirects to your browser's language
- `/en` - English version
- `/zh` - Chinese version

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Internationalization**: [next-intl](https://next-intl-docs.vercel.app/)
- **SEO**: [next-sitemap](https://github.com/iamvishnusankar/next-sitemap)
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📁 Project Structure

```
random-picker/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── layout.tsx     # Locale-specific layout
│   │   └── page.tsx       # Main wheel component
│   ├── layout.tsx         # Root layout
│   ├── manifest.ts        # PWA manifest
│   └── icon.svg           # App icon
├── i18n/
│   ├── routing.ts         # i18n routing configuration
│   └── request.ts         # i18n request configuration
├── messages/
│   ├── en.json           # English translations
│   └── zh.json           # Chinese translations
├── docs/
│   ├── SEO.md            # SEO optimization guide
│   └── DEPLOYMENT.md     # Deployment guide
├── middleware.ts         # Language detection middleware
├── next-sitemap.config.js # Sitemap configuration
└── next.config.ts        # Next.js configuration
```

## 🎮 Usage

1. **Add Options**: Enter custom options in the input field
2. **Remove Options**: Click the remove button (minimum 2 options required)
3. **Spin the Wheel**: Click the "Spin" button to randomly select an option
4. **Switch Language**: Click the language toggle button in the top right

## 🌐 Internationalization

The app automatically detects your browser language and redirects to the appropriate locale. You can manually switch languages using the toggle button.

Supported languages:
- English (en)
- Chinese (zh)

## 🔍 SEO Features

- ✅ Dynamic meta tags for each language
- ✅ Automatic sitemap generation
- ✅ robots.txt configuration
- ✅ Structured data (JSON-LD)
- ✅ Open Graph and Twitter Card tags
- ✅ hreflang tags for language alternatives
- ✅ Canonical URLs

### Generate Sitemap

```bash
# Build project (automatically generates sitemap)
pnpm build

# Or manually generate
pnpm postbuild
```

Generated files:
- `public/sitemap.xml`
- `public/robots.txt`

## 📝 Configuration

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_BASE_URL=https://random-picker-tau.vercel.app
```

### Port Configuration

The development server runs on port `3758` by default. You can change this in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev -p 3758"
  }
}
```

### NPM Registry

The project uses Taobao npm mirror for faster package installation in China. See `.npmrc`:

```
registry=https://registry.npmmirror.com
```

## 🚢 Deployment

### Deploy on Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/random-picker)

### Build for Production

```bash
pnpm build
pnpm start
```

### Post-Deployment

1. Verify sitemap: `https://your-domain.com/sitemap.xml`
2. Verify robots.txt: `https://your-domain.com/robots.txt`
3. Submit sitemap to search engines
4. Run SEO check: `pnpm seo-check`

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment guide.

## 🧪 Scripts

```bash
# Development
pnpm dev              # Start development server

# Production
pnpm build            # Build for production (includes sitemap generation)
pnpm start            # Start production server

# SEO
pnpm postbuild        # Generate sitemap and robots.txt
pnpm seo-check        # Run SEO validation checks

# Code Quality
pnpm lint             # Run ESLint
```

## 📚 Documentation

- [SEO Optimization Guide](docs/SEO.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 🔗 Links

- **Live Demo**: [https://random-picker-tau.vercel.app](https://random-picker-tau.vercel.app)
- **Documentation**: See `/docs` folder
- **Issues**: [GitHub Issues](https://github.com/yourusername/random-picker/issues)
