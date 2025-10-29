# Random Wheel | 随机轮盘

A beautiful and interactive random wheel picker built with Next.js, featuring smooth animations and internationalization support.

## ✨ Features

- 🎯 **Interactive Wheel**: Smooth spinning animation with customizable options
- 🌍 **Internationalization**: Full support for English and Chinese with automatic language detection
- 🎨 **Beautiful UI**: Gradient colors and modern design with dark mode support
- 📱 **Responsive**: Fully optimized for mobile and desktop devices
- ⚡ **Fast**: Built with Next.js 16 and React 19
- 🎭 **Animations**: Powered by Framer Motion for fluid transitions

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
- **Package Manager**: [pnpm](https://pnpm.io/)

## 📁 Project Structure

```
random-picker/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── layout.tsx     # Locale-specific layout
│   │   └── page.tsx       # Main wheel component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── i18n/
│   ├── routing.ts         # i18n routing configuration
│   └── request.ts         # i18n request configuration
├── messages/
│   ├── en.json           # English translations
│   └── zh.json           # Chinese translations
├── middleware.ts         # Language detection middleware
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

## 📝 Configuration

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

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.
