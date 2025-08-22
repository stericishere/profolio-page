# Development Notes & Reminders

## Markdown Content System

### Issue: Markdown edits not reflecting immediately
**Problem**: When editing project markdown files (`.md` files in `/src/content/projects/`), changes don't show up on the website immediately.

**Root Cause**: The API endpoint at `/api/content/projects/[slug]` was caching markdown content for 1 hour in all environments.

**Solution**: Environment-dependent caching implemented:
- **Development**: No caching (`no-cache, no-store, must-revalidate`)
- **Production**: 1-hour cache (`public, max-age=3600`)

**If you still see stale content after editing markdown files:**
1. **Clear Next.js cache**: `rm -rf .next` then restart dev server
2. **Hard refresh the page**: `Cmd+Shift+R` on Mac, `Ctrl+Shift+R` on Windows
3. **Clear browser cache** for the specific page
4. **Restart the dev server**: `npm run dev`

**Additional Cache-Busting Measures Added:**
- API endpoint: Environment-dependent cache headers
- Client-side fetch: Cache-busting query parameter (`?t=${Date.now()}`) in development
- Client-side fetch: `cache: 'no-store'` option in development mode

**Complete Cache Clear Steps:**
```bash
# Stop dev server (Ctrl+C)
rm -rf .next
npm run dev
# Then hard refresh browser
```

### File Locations
- **Markdown content**: `/src/content/projects/*.md`
- **API endpoint**: `/src/app/api/content/projects/[slug]/route.ts`
- **Markdown renderer**: `/src/components/ui/MarkdownRenderer.tsx`
- **Blog client**: `/src/app/projects/[slug]/BlogPostClient.tsx`

### Available Project Markdown Files
- `tinyproof.md` - RL-based theorem prover
- `adaptive-education-ml.md` - ML for education
- `pokemon-rl-agent.md` - AI agent for Pokémon Red
- `generative-agents-dating.md` - Multi-agent social simulation
- `netflix-portfolio.md` - This portfolio project

### Creating New Project Blog Posts
1. Create a new `.md` file in `/src/content/projects/` with the project ID as filename
2. Add the project to `portfolioData.ts` with the matching ID
3. The system will automatically load and render the markdown content

## Other Development Reminders

### Performance Notes
- Build warnings about `<img>` elements - consider using Next.js `<Image>` component for optimization
- Several unused variables in components - clean up for production build

### TypeScript Issues
- Some `any` types used for complex React components - consider more specific typing
- ESLint rules may need adjustment for component prop patterns

### Build Process
- Build succeeds with warnings - safe to deploy
- All TypeScript compilation errors have been resolved
- Markdown rendering system fully functional