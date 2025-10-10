# Orbit: Transforming Waste into Innovation

[![Devpost](/assets/projects/orbit-htv.png)](https://devpost.com/software/orbit-ja26qm)

An AI-powered platform that transforms waste materials into actionable product concepts with 3D models, build instructions, and real-time sustainability metrics. **Winner at Hack The Valley**.

## The Problem

Over **2 billion tons** of waste are produced annually, yet only **6.9%** of materials are recycled. The challenge isn't a lack of interest in upcycling—it's accessibility. People don't know what to do with waste materials that still have value.

## Our Solution

Orbit is an AI-powered platform that turns any waste material into actionable product concepts with visual previews, complete build instructions, and real-time sustainability impact analysis.

### How It Works

**1. Input Waste Material**
Users simply describe or upload an image of their waste material.

**2. AI-Generated Concepts**
Orbit generates three distinct product concepts, each featuring:
- Material breakdown and feasibility scores
- Required tools and skill level
- Step-by-step build instructions
- Estimated time and cost

**3. Interactive Refinement**
Users can adjust designs through our "Magic Pencil" feature:
- Mark changes directly on the design
- Specify textual edits
- AI updates concept in real-time

**4. 3D Visualization & Guidelines**
Final output includes:
- Interactive 3D model (via Trellis 2D→3D pipeline)
- Real-time sustainability metrics
- Complete DIY build guidelines
- Material sourcing recommendations

## Technical Architecture

### Frontend Stack
- **Next.js 15** with App Router for optimal performance
- **React 19** + TypeScript for type-safe development
- **Three.js** for 3D model rendering
- **Tailwind CSS** for responsive design
- **Server-Sent Events (SSE)** for real-time updates (<100ms latency)

### Backend Infrastructure
- **FastAPI** (Python 3.11+) for high-performance API
- **LangGraph** for 11-phase AI agent orchestration
- **Redis** for state management and checkpointing
- **Docker + Compose** for containerized deployment
- **Uvicorn** ASGI server with CORS support

### AI/ML Pipeline
- **Gemini 2.5 Flash** for concept generation and reasoning
- **Nano Banana** for image generation and editing
- **Trellis** for 2D-to-3D model conversion
- **Structured Output Validation** using responseSchema
- **Parallel Processing** reducing total generation time by ~66%

## Technical Challenges & Solutions

### 1. LangGraph State Management
**Challenge:** Managing complex interrupt/resume patterns for user input without losing context.

**Solution:** Implemented Redis-backed checkpointing with thread IDs and comprehensive error recovery patterns. This ensures workflows can pause seamlessly and resume exactly where they left off.

### 2. Structured LLM Outputs
**Challenge:** Getting consistently formatted JSON from LLMs for complex nested structures.

**Solution:** Leveraged Gemini's `responseSchema` with `response_mime_type=application/json` to enforce strict schema validation. Added automatic retry mechanisms for reliability.

### 3. Real-time User Experience
**Challenge:** Long AI generation times creating poor UX.

**Solution:**
- Parallel image generation for 66% time reduction
- Server-Sent Events for <100ms progress updates
- Honest progress indicators instead of opaque spinners

## Key Achievements

### Technical Excellence
- **11-phase orchestration** with interrupt/resume capabilities
- **Multi-model pipeline** coordinating Gemini, Imagen, and Trellis
- **Production-ready practices**: comprehensive error handling, state checkpointing, full CORS support
- **Latency optimization**: SSE updates, parallel processing, connection resilience

### Innovation Recognition
- **Hack The Valley Winner** - Selected from hundreds of competing projects
- **Sustainability Impact** - Addressing the global recycling crisis through accessible upcycling

## What We Learned

### State Machine Design
Treating LangGraph as a persistent state machine with proper checkpointing patterns is crucial for complex multi-step AI workflows.

### Never Trust LLM Outputs
Always enforce schemas, handle null/type validation, and implement backoff strategies for transient errors. Fall-back mechanisms are essential.

### Real-time Communication
Server-Sent Events are ideal for server→client progress updates. Design for reconnection and proper event ordering from the start.

### Redis as State Store
Proper namespacing, TTL strategies, and memory monitoring are critical when storing image data and session state.

### Latency-Aware UX
Intelligent parallelization combined with honest progress indicators beats opaque loading spinners every time.

## Future Roadmap

### B2B Sustainability Partnerships
Target brands like Unilever, Nestlé, and Coca-Cola seeking 25-50% recycled/upcycled content in packaging. Offer Orbit as a scalable prototyping tool for sustainable product development.

### Gamification & Community
- **Impact-based rewards**: Points and badges for upcycling activities
- **Community sharing**: Leaderboards, challenges, and achievement showcasing
- **Digital collectibles**: NFT rewards for sustainability milestones

### Enhanced Features
- **Smart Sourcing**: Material substitution suggestions with supplier links
- **Local Material Sharing**: Connect users with neighbors for material swapping
- **AR Visualization**: Preview products in your space before building

## Tech Stack Summary

**Frontend:** Next.js 15, React 19, TypeScript, Three.js, Tailwind CSS, EventSource (SSE)

**Backend:** FastAPI, LangGraph, Redis, Pydantic, Uvicorn, Docker

**AI/ML:** Gemini 2.5 Flash, Nano Banana, Trellis, Structured Outputs

**Infrastructure:** Docker Compose, Redis Persistence, CORS-enabled API

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                  Frontend (Next.js 15)               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ Three.js │  │   SSE    │  │ Tailwind │          │
│  │ 3D View  │  │ Updates  │  │   UI     │          │
│  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────┘
                        │
                        ▼ (REST + SSE)
┌─────────────────────────────────────────────────────┐
│              Backend (FastAPI + LangGraph)           │
│  ┌──────────────────────────────────────────────┐  │
│  │         LangGraph (11-phase pipeline)        │  │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐     │  │
│  │  │ Input   │→ │ Concept │→ │  3D     │     │  │
│  │  │ Process │  │  Gen    │  │  Gen    │     │  │
│  │  └─────────┘  └─────────┘  └─────────┘     │  │
│  └──────────────────────────────────────────────┘  │
│                        │                             │
│                        ▼                             │
│  ┌──────────────────────────────────────────────┐  │
│  │            Redis State Store                 │  │
│  │  • Session checkpoints  • Image cache        │  │
│  └──────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                AI/ML Services                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐          │
│  │ Gemini   │  │   Nano   │  │ Trellis  │          │
│  │ 2.5 Flash│  │  Banana  │  │ 2D→3D    │          │
│  └──────────┘  └──────────┘  └──────────┘          │
└─────────────────────────────────────────────────────┘
```

## Impact

Orbit demonstrates that sustainability doesn't have to be complicated. By making upcycling accessible through AI-powered guidance and visual previews, we're helping turn 2 billion tons of annual waste into opportunities for creativity and environmental impact.

### Environmental Impact Metrics
- **Waste Reduction**: Each upcycled item prevents ~2-5kg of landfill waste
- **Carbon Savings**: DIY upcycling reduces manufacturing emissions by ~80%
- **Education**: Platform teaches sustainable practices to next generation

---

**Built at Hack The Valley 2025** | [GitHub Repository](https://github.com/stanleypangg/Orbit)

**Team:** Steric Tsui & Stanley Pang & Isaac Nguyen & Sarah Kim 
