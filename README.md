# Virvly 📷

> **Take the photos. Clients find them. Get paid.**

**Virvly** is a modern, privacy-first web platform tailored for roaming, event, and itinerant photographers working in public or event spaces (such as beaches, landmarks, resorts, weddings, festivals, and national parks). It streamlines the connection between photographers and their clients, enabling customers to securely and instantly find themselves in photos using privacy-first face matching and purchase high-resolution digital copies on the spot.

---

## 🚀 How It Works

### For Photographers (The 5-Step Flow)
1. **Photograph**: Capture candid and posed moments of guests as you normally do, with no disruptions to your standard equipment or workflow.
2. **Connect**: Provide clients with a photographer-specific code or a quick QR link so they know how to access their pictures.
3. **Upload**: Upload your high-resolution photos directly to Virvly from your phone, laptop, or camera in seconds.
4. **Find & Buy**: Clients use their mobile browsers to search, discover, and purchase their photos.
5. **Get Paid**: Funds land directly into your connected account with zero invoicing, follow-ups, or manual tracking.

### For Clients (Find Your Photos)
1. **Access**: Visit the `/clients` page on any mobile device or browser.
2. **Upload Selfie**: Take or upload a quick selfie.
3. **Input Code**: (Optional) Enter the photographer's code to filter directly to your session or event.
4. **Discover**: The secure matching engine highlights only the photographs containing your face.
5. **Purchase**: Securely pay through the platform and download high-resolution copies instantly.

---

## 🛡️ Privacy & Biometric Data Approach

Privacy is a core pillar of the Virvly platform architecture:
- **Zero Persistent Biometric Databases**: Search selfies uploaded by customers are processed transiently in-memory to generate temporary matching vectors and are **never stored** on persistent disks or databases.
- **Immediate Discard**: Transient face vectors are purged immediately after the matching calculation completes.
- **Targeted Matching**: Clients can only see and access photos that they are actually in, protecting the privacy and dignity of other event attendees.
- **Regulatory Compliance**: Fully aligned with the **Nigeria Data Protection Act 2023 (NDPA)** and international data protection standards.

---

## 🛠️ Technology Stack

- **Framework**: [Astro 5](https://astro.build/) — For content-focused, ultra-fast performance, zero-JS by default, and high-performance static site generation.
- **Styling**: [Tailwind CSS 3.4](https://tailwindcss.com/) — Utility-first styling with a bespoke design system tokenised in `tailwind.config.mjs`.
- **Language & Standards**: TypeScript, semantic HTML5, and strict **British English (en-GB)** spelling standards across all copy and components.
- **SEO & Social Graph**:
  - Dynamic canonical URL generation (`https://virvly.com`)
  - Dedicated 1200×630px Open Graph and Twitter Card preview images (`/images/og-image.jpg`)
  - Full Schema.org JSON-LD structured data (`Organization`, `WebSite`, `ContactPage`, `WebPage`, `SoftwareApplication`)
  - Validated XML Sitemap (`/sitemap.xml`) and crawler controls (`/robots.txt`)
- **Typography**: Pre-connected Google Fonts optimised for Core Web Vitals:
  - *Plus Jakarta Sans* (Headings & Brand Wordmark)
  - *Inter* (Body copy)

---

## 📂 Project Structure

```text
virvly-mate/
├── public/                     # Static assets served at the root URL path
│   ├── brand/                  # Official brand assets (favicon.svg, virvly-logo.png)
│   ├── images/                 # Marketing visuals and 1200×630 og-image.jpg
│   ├── robots.txt              # Search engine crawler directives & sitemap declaration
│   └── sitemap.xml             # XML sitemap with all indexable routes and priorities
├── src/
│   ├── components/             # Reusable Astro UI components
│   │   ├── Button.astro        # Standardised button with primary/secondary/ghost variants
│   │   ├── ContactForm.astro   # Accessible enquiry form with client-side validation
│   │   ├── Footer.astro        # Global footer with brand navigation, legal & social links
│   │   ├── Header.astro        # Fixed/blur-scrolling header with mobile overlay navigation
│   │   ├── StepCard.astro      # Step card showcasing photographer 5-step workflow
│   │   └── WhereCard.astro     # Location card showcasing service targets
│   ├── layouts/
│   │   └── Layout.astro        # Master HTML layout, SEO meta tags, and Schema.org JSON-LD
│   └── pages/
│       ├── index.astro         # Photographer landing page (Home)
│       ├── clients.astro       # Client photo finder & privacy-first explainer
│       ├── contact.astro       # Contact and partnership enquiry page
│       ├── privacy.astro       # Comprehensive Privacy Policy (NDPA 2023 compliant)
│       └── terms.astro         # Terms of Service & photo licensing terms
├── astro.config.mjs            # Astro configuration (site URL, Tailwind integration)
├── tailwind.config.mjs         # Tailwind theme configuration (brand colours, typography)
└── package.json                # Project dependencies and npm scripts
```

---

## 🎨 Branding System

The design system uses custom design tokens defined in `tailwind.config.mjs`:
- **Brand Blue**: `#00759F` (Primary brand accent colour)
- **Brand Blue Deep**: `#053349` (Hero headers, overlays, and deep container backgrounds)
- **Brand Orange**: `#F78C1E` (CTAs, badge highlights, and active states)
- **Brand Charcoal**: `#1C1C1C` (Headings, dark cards, and footer background)
- **Brand Ink**: `#232323` (Core body typography)
- **Brand Paper**: `#FFFFFF` (Primary page background)
- **Brand Paper 2**: `#F7F7F7` (Secondary card and section background)

---

## 💻 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18.14.1 or higher is recommended).

### 1. Install Dependencies
Run the package installation command from the project root:
```bash
npm install
```

### 2. Run the Development Server
Launch the local development environment with hot module replacement:
```bash
npm run dev
```
The application will run locally at [http://localhost:4321/](http://localhost:4321/).

### 3. Build for Production
Create an optimised production build inside the `dist/` directory:
```bash
npm run build
```

### 4. Preview the Production Build
Locally preview the generated production output before deploying:
```bash
npm run preview
```

---

## 🌐 SEO & Accessibility Features

- **Semantic Document Hierarchy**: Strict single `h1` per page, followed by logical `h2` and `h3` heading progression.
- **Accessibility**: Includes a skip-to-content bypass link, `aria-expanded` and `aria-controls` for mobile navigation, descriptive `alt` tags on all images, and accessible form labels.
- **Core Web Vitals Optimisation**: Critical hero images leverage `loading="eager"` with `fetchpriority="high"`, while below-the-fold assets use `loading="lazy"` and `decoding="async"` to minimise Cumulative Layout Shift (CLS) and Largest Contentful Paint (LCP).
- **Search Engine Indexing**: Comprehensive XML sitemap and `robots.txt` ensuring discovery by Googlebot, Bingbot, and other major web search crawlers.

---

## 📝 Legal & Company Information

- **Entity**: Virvly Ltd (RC 8887413)
- **Registered Address**: Plot 1184, Extension Layout, Gwagwalada, Abuja, Federal Capital Territory, Nigeria
- **Enquiries**: [hello@virvly.com](mailto:hello@virvly.com)
- **Data Protection Officer**: [dpo@virvly.com](mailto:dpo@virvly.com)
- **Copyright**: &copy; 2026 Virvly Ltd. All rights reserved.
