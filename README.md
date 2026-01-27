# Portfolio

Hey! This is my personal portfolio website built with Next.js. Create something that stands out from the typical portfolio templates, so went with a unique newspaper-inspired design with some cool interactive elements.

##  Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety (because who likes runtime errors?)
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations and smooth transitions
- **Matter.js** - Physics engine for the tech stack section (the bouncing balls)
- **Lenis** - Smooth scrolling
- **EmailJS** - Contact form handling

##  Features

- **Interactive Hero Section** - Pendulum-style cards that react to mouse movement
- **Physics-based Tech Stack** - Drag and interact with tech icons (Matter.js)
- **Newspaper-themed Achievements** - Vintage newspaper design for showcasing projects
- **Smooth Scrolling** - Custom smooth scroll implementation
- **Responsive Design** - Works on all screen sizes (mobile, tablet, desktop)
- **Performance Optimized** - Lazy loading, image optimization, and caching

##  Getting Started

First, clone the repo and install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

##  Build for Production

```bash
npm run build
npm start
```

##  Project Structure

```
src/
├── app/              # Next.js app directory
├── components/
│   ├── layout/       # Navbar, MobileSidebar
│   ├── sections/     # All page sections (Hero, About, Projects, etc.)
│   └── ui/           # Reusable UI components
└── lib/              # Utility functions
```

##  Configuration

The project uses:
- Next.js Image Optimization
- Tailwind CSS for styling
- TypeScript for type safety
- Custom caching headers in `next.config.js`


