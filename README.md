# ATLAS — 3D Interactive Learning & E-Worksheet Platform

A prototype digital learning environment for secondary-school **World History**, built around the unit **The Renaissance (c. 1300–1700)**. Students explore history through *time and geography*: a 3D globe with a year selector, a global “side-by-side” timeline, structured lessons, an interactive 3D printing press, and auto-marked e-worksheets with locally saved progress.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
```

The build uses a relative base path and hash-based routing, so `dist/` can be copied to any static host or school intranet folder without server configuration.

## Features

| Area | What it does |
| --- | --- |
| **Overview** | Unit header, progress ring, *Continue Learning*, the four unit objectives with live status, learning overview, and a 3D globe preview. |
| **Explore the World** | 3D globe (React Three Fiber): drag to rotate, scroll/pinch or buttons to zoom, click land or a label to choose one of 9 regions, and click event markers. Year slider 1300–1700 with ±1 / ±10 steps, typed input and period markers; events filtered within ±10/25/50 years. The region panel shows the era overview, the political powers *of that year* labelled by type, events, people and developments. Optional “Historical powers” layer. Flat-map mode, and automatic 2D fallback when WebGL is unavailable. |
| **Timeline** | “The World at a Glance”: swimlanes per region group, year cursor, region/category/range filters, side-by-side columns, event detail with **Meanwhile Around the World**, and **Show on the globe** (deep link to the globe, focused on the event). |
| **Lessons** | Five lessons with objectives, introduction, sectioned content, diagrams, key points, quotations, vocabulary, key figures, related events, knowledge check, completion and references. Sections are tracked as read while scrolling. |
| **3D learning object** | A Gutenberg-style hand press (Lesson 3): 9 hotspot components and a 6-step animated printing process. A perspective explorer (Lesson 2) lets students drag the vanishing point. |
| **Worksheets** | “Test Your Understanding”: multiple choice, select-all, true/false, matching, drag-and-drop (with tap-to-place for touch screens and keyboards), chronological ordering, short answer, source analysis and map questions. Autosave, progress indicator, submit confirmation, partial-credit scoring, explanations only after submission, “review incorrect” filter and retry. Written answers are kept for the teacher and are not auto-judged. |
| **My Progress** | Overall completion, lessons, worksheets, a quiz-results chart, objectives achieved, areas for further review, regions explored, and a chronological **Your Learning Journey**. No rankings. |
| **References** | Every reference used, plus notes on how to read dates, estimates, regions and illustrations. |

## Architecture

```
src/
  types/            TypeScript interfaces: events, regions, lessons, questions, progress
  data/             All content, kept separate from the UI
    historicalEvents.ts   48 curated events, each with sources
    regions.ts            9 navigation regions, with eras, polities, people and developments
    polityCentres.ts      approximate centres of historical powers (the globe layer)
    lessons.ts, worksheets.ts, objectives.ts, printingPress.ts, sources.ts
  hooks/            useProgress (reducer + localStorage), useWebGL
  utils/            time windows and "meanwhile", geo (lat/lon ↔ sphere, region hit-test), grading
  components/
    layout/  globe/  three/  lessons/  worksheets/  shared/  ui/
  pages/            Overview, ExploreWorld, Timeline, Lessons, LessonDetail, Worksheets,
                    WorksheetDetail, Progress, References
```

- **State:** all progress changes go through one reducer (`hooks/useProgress.tsx`) and are saved to `localStorage`. Adding accounts or a backend only needs this store synced to an API. The data files can be swapped for API calls without touching the components.
- **URL state:** the year, region, event and filters on the globe and timeline live in the URL, so any view can be linked or bookmarked.
- **Performance:** the globe, the press scene and the charts load on demand. The globe texture is drawn once to a canvas from Natural Earth 1:110m coastlines (no image downloads). Low-power WebGL settings and a capped pixel ratio help ordinary school laptops.

## Historical accuracy and known limitations

- **Borders.** Political frontiers between 1300 and 1700 were often fluid or contested, and reliable worldwide boundary data at this scale does not exist. ATLAS therefore uses **modern geographic regions only for navigation**. It shows historical powers as **labelled approximate centres** (empire, kingdom, dynasty, city-state, colonial territory…), not as drawn borders.
- **Dates.** Every event marks whether its date is documented or approximate (`c.`, decade, century, or “date debated” for the Haudenosaunee Confederacy). Figures such as death tolls are given as estimates.
- **Sources.** Each event and lesson lists references (Britannica, The Met, UNESCO, British Library, Khan Academy). Where I was not certain of an exact article URL, the link opens the publisher’s search for the article title, so no URL is invented. **Teachers should review the content and links before classroom use.**
- **Images.** No external images are loaded. All illustrations are SVG diagrams made for ATLAS. The two worksheet sources (the Copernicus diagram and a printing workshop) are redrawings and are labelled as such.
- **The press model** is a simplified reconstruction of a 15th–16th-century wooden hand press. Gutenberg’s own press does not survive.
- **Region hit-testing** uses simple latitude/longitude boxes, so a click near a regional edge may select the neighbouring region.
- **Progress** is per browser and per device. Clearing site data resets it.

## Next steps

Teacher accounts and class dashboards, a backend for submissions and teacher marking of written answers, more units (the data model is unit-agnostic), translations, and teacher-reviewed approximate boundary layers for selected years.
