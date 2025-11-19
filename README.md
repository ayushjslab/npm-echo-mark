# 🎯 EcoMark - Customer Feedback Made Simple

<div align="center">

![EcoMark Logo](https://img.shields.io/badge/EcoMark-Feedback_Widget-6366f1?style=for-the-badge)
[![npm version](https://img.shields.io/npm/v/ecomark?style=flat-square)](https://www.npmjs.com/package/echomark)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![Downloads](https://img.shields.io/npm/dm/ecomark?style=flat-square)](https://www.npmjs.com/package/ecomark)

**Collect real-time customer feedback with a beautiful, customizable widget. One line of code. Zero hassle.**

[🌐 Visit EchoMark](https://echomark.vercel.app/) · [📚 Documentation](https://echomark.vercel.app/#watch-demo) · [🐛 Report Bug](https://github.com/ayushjslab/ecomark/npm-echomark)

</div>

---

## ✨ Why EcoMark?

- **⚡ Lightning Fast Setup** - Install and integrate in under 60 seconds
- **🎨 Fully Customizable** - Match your brand perfectly with our visual customization tools
- **📊 Real-Time Analytics** - Monitor feedback instantly through your dashboard
- **🔒 Privacy First** - GDPR compliant with enterprise-grade security
- **🚀 Framework Agnostic** - Works with React, Vue, Angular, Next.js, and more

---

## 📦 Installation

```bash
# Using npm
npm i ecomark

# Using yarn
yarn add ecomark

# Using pnpm
pnpm add ecomark
```

---

## 🚀 Quick Start

### Step 1: Get Your Site ID

1. Visit [EchoMark Dashboard](https://echomark.vercel.app/)
2. Sign up for free (no credit card required)
3. Add your website to get your unique `siteId`

### Step 2: Integrate the Component

#### React / Next.js

```jsx
import { Feedback } from 'ecomark';

function App() {
  return (
    <div>
      <h1>My Awesome App</h1>
      
      {/* Add the feedback widget */}
      <Feedback siteId="your_site_id_here" />
    </div>
  );
}

export default App;
```

#### Vue 3

```vue
<template>
  <div>
    <h1>My Awesome App</h1>
    <Feedback siteId="your_site_id_here" />
  </div>
</template>

<script setup>
import { Feedback } from 'ecomark';
</script>
```

#### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <h1>Welcome!</h1>
  
  <div id="feedback-root"></div>
  
  <script type="module">
    import { Feedback } from 'ecomark';
    
    const root = document.getElementById('feedback-root');
    Feedback.mount(root, { siteId: 'your_site_id_here' });
  </script>
</body>
</html>
```

---

## 🎨 Customization

Want to match your brand? Head over to the **[Customization Options](https://echomark.vercel.app/customize)** on the EchoMark website to:

- 🎨 Change colors and themes
- 📍 Adjust widget position
- ✍️ Customize button text and labels
- 🌙 Toggle dark/light mode
- 📱 Configure mobile responsiveness
- 💬 Add custom fields

All changes sync automatically - no code updates needed!

---

## ⚙️ Advanced Configuration

### Props & Options

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `siteId` | `string` | **required** | Your unique site identifier from EchoMark dashboard |
| `position` | `'bottom-right' \| 'bottom-left' \| 'top-right' \| 'top-left'` | `'bottom-right'` | Widget position on screen |
| `theme` | `'light' \| 'dark' \| 'auto'` | `'auto'` | Color theme (auto detects system preference) |
| `trigger` | `'button' \| 'text'` | `'button'` | How the feedback widget appears |
| `showOnLoad` | `boolean` | `false` | Auto-open widget when page loads |
| `language` | `string` | `'en'` | Interface language (en, es, fr, de, etc.) |


---

## 📊 View Your Feedback

Once integrated, all feedback appears instantly in your [EchoMark Dashboard](https://echomark.vercel.app/dashboard):

- 📈 **Analytics** - Track feedback trends and sentiment analysis
- 🔔 **Notifications** - Get alerts for critical feedback
- 📤 **Export** - Download feedback as CSV or JSON
- 🔗 **Integrations** - Connect with Slack, Discord, webhooks, and more

---

## 🛠️ Framework-Specific Examples

<details>
<summary><b>Next.js App Router</b></summary>

```tsx
// app/layout.tsx
import { Feedback } from 'ecomark';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Feedback siteId={process.env.NEXT_PUBLIC_ECOMARK_SITE_ID} />
      </body>
    </html>
  );
}
```

</details>

<details>
<summary><b>Next.js Pages Router</b></summary>

```tsx
// pages/_app.tsx
import { Feedback } from 'ecomark';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Feedback siteId={process.env.NEXT_PUBLIC_ECOMARK_SITE_ID} />
    </>
  );
}
```

</details>

<details>
<summary><b>Nuxt 3</b></summary>

```vue
<!-- app.vue -->
<template>
  <div>
    <NuxtPage />
    <Feedback :siteId="config.public.ecomarkSiteId" />
  </div>
</template>

<script setup>
import { Feedback } from 'ecomark';

const config = useRuntimeConfig();
</script>
```

</details>

<details>
<summary><b>Svelte / SvelteKit</b></summary>

```svelte
<!-- +layout.svelte -->
<script>
  import { Feedback } from 'ecomark';
  import { PUBLIC_ECOMARK_SITE_ID } from '$env/static/public';
</script>

<slot />
<Feedback siteId={PUBLIC_ECOMARK_SITE_ID} />
```

</details>

---

## 🌟 Features Overview

| Feature | Starter | Professional | Enterprise |
|---------|---------|--------------|------------|
| Feedback Collection | 100/month | 5,000/month | Unlimited |
| Customization | ✅ | ✅ | ✅ |
| Analytics Dashboard | Basic | Advanced | Custom |
| Team Members | 1 | 5 | Unlimited |
| Priority Support | ❌ | ✅ | ✅ |
| Custom Branding | ❌ | ✅ | ✅ |
| API Access | ❌ | ❌ | ✅ |

[View Full Pricing →](https://echomark.vercel.app/#pricing)

---

## 🤝 Support & Community

- 📧 Email: ayush.jslab@gmail.com
- 🐦 Twitter (X): https://twitter.com/ayushjslab
- 💼 LinkedIn: https://www.linkedin.com/in/ayushjslab
- 🐙 GitHub: https://github.com/ayushjslab
- 📸 Instagram: https://instagram.com/ayushjslab
- ▶️ YouTube: https://youtube.com/@ayushjslab
- 🌐 Website (if you have one): https://ayushjslab.vercel.app
---

## 📄 License

MIT © EchoMark

---

## 🙏 Contributing

We welcome contributions! . https://github.com/ayushjslab/npm-echomark

---

<div align="center">

**Made with ❤️ by the EchoMark Team**

[Get Started Free](https://echomark.vercel.app/) · [Star on GitHub](https://github.com/yourusername/ecomark) ⭐

</div>