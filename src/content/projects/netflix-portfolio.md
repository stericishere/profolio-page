# Building My Netflix-Style Portfolio:

When I finally sat down to rebuild my personal site (I didnt like my previous one), I asked myself a dangerous question: **what if going thro my website feels like watching a Netflix show?**  
That single thought turned my weekend into a “refresh my portfolio” week. Here’s how the idea became a reality and what I learned along the way.

---

- **Made recruiters feel at home.** Netfilx & Chill!
- **Gave developers a technical playground.** Lots of animation, React patterns, and clean TypeScript.  
- **Let casual visitors browse like they’re flipping through Netflix categories.**

The inspiration clicked while I was procrastinating with yet another show. 
The netfilx-animations and recommendations felt like the right metaphor for how I wanted people to experience my vibe & work.

# What the Project Does

It’s a Netflix-inspired portfolio built with **Next.js 15, TypeScript, Tailwind CSS 4, and Framer Motion**.  

## Tech Stack Highlights

| Purpose              | Tech & Reasoning |
|----------------------|------------------|
| Framework & routing  | Next.js 15 App Router for SEO + component streaming |
| Styling              | Tailwind CSS 4 for utility-first, themeable components |
| Animations           | Framer Motion 12 for timeline-level control |
| Type safety          | TypeScript 5—strict mode from the start |

## Architecture & Design Choices

### 1. Persona-Driven Landing
All persona copy lives in `src/data/portfolioData.ts`. Each persona has its own background, hero text, and “Top Picks.”

```ts
const personas = [
  { id: 'recruiter', name: 'Recruiter', backgroundColor: 'bg-emerald-500', description: 'Looking for talent' },
  // ...
]
```

### 2. Netflix Opening Sequence
A user-triggered audio jingle and animated intro:

```ts
const audio = new Audio('/assets/audio/nouveau-jingle-netflix.mp3')
audio.volume = 0.8
audio.play()

<motion.span
  key={index}
  initial={{ opacity: 0, scaleY: 0.5 }}
  animate={{ opacity: 1, scaleY: scale }}
>
  {char}
</motion.span>
```

### 3. Horizontal Sections & Template Cards
Projects, Experience, Skills → all use `HorizontalSection` + `TemplateCard`. Data-driven, scrollable rows.

### 4. Lazy Loading Skills
IntersectionObserver powers skeleton-to-real rendering:

```ts
const { ref, isVisible } = useIntersectionObserver({
  threshold: 0.1,
  rootMargin: '100px 0px',
  freezeOnceVisible: true,
})
```

### 5. Markdown-Powered Project Posts/Blog
Custom markdown renderer for Markdown formatting of my project blog. 

**Thogught:** I just really love writing in Markdown, I got used to it by using Obsidian to drop notes and keep track of my life

## Development Journey

**Challenge: Audio Autoplay Is a Trap**  
Browsers require user gesture → added “Start Netflix Experience” button.

**Challenge: Hover Clipping on Cards**  
Wrote `hoverUtils` to prevent cards from overflowing:

```ts
export function getSafeScaleFactor(bounds, viewport, desiredScale = 1.15) {
  const expandedWidth = bounds.width * desiredScale
  const rightSpace = viewport.width - (bounds.x + bounds.width)
  return Math.min(/* safe scale computations */)
}
```

**Challenge: Keeping Animations Snappy**  
Cut delays, memoized components, preloaded thresholds → instant feel.

# What I Learned

- **Framer Motion is ridiculous (in a good way).** JSX choreography feels like film editing.  
- **Lazy Loading = increasing insane performance** from 3s to 1s
- **Real-time content via WebSockets** 
- **Caching** caching most of the package in client side for one hour, (Gussing no one watch my Portolio for an hour)


## Reusability & Next Steps

Who else might benefit?

- Immersive portfolios / showcases  
- Persona-based landing pages  

**Try it yourself: (you also just edit the content and use it for yourself) MIT Licensed**

```bash
git clone https://github.com/stericishere/netflix-portfolio
cd netflix-portfolio
npm install
npm run dev
```

Edit `src/data/portfolioData.ts` for your own content.

## Closing Thoughts

Rebuilding my portfolio as a streaming service was equal parts **overkill and joy**. It stretched my development skills, made me think in terms of narratives, and gave me a playful spin on personal branding.

If you give it a spin, I’d love feedback—PRs, GitHub issues, or just a note saying which persona you picked first on LinkedIn!

Let’s keep making the **Portfolio** feel more like a **Real Person** and less like **your one page Resume**

---