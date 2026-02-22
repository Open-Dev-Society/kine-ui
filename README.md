# Product Requirements Document: Kine UI

## Project Overview & Vision
**Name**: Kine UI

**Organization**: Open Dev Society

**Concept**: A headless, copy-pasteable component registry for web-based hand gesture controls.

**Objective**: Standardize computer vision for frontend developers. Kine UI provides raw, editable React components powered by a highly optimized background vision engine, utilizing the shadcn/ui distribution model (delivering source code, not compiled packages).

## Target Audience & Use Cases
- **Audience**: Frontend engineers, creative developers, and accessibility advocates.
- **Use Cases**:
  - Highly interactive motion graphics portfolios.
  - Spatial computing interfaces for web apps.
  - Accessible, touch-free navigation (e.g., swiping carousels, air-clicking).

## Tech Stack & Dependencies
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion (crucial for smoothing webcam jitter via spring physics)
- **Computer Vision**: @mediapipe/tasks-vision (WebAssembly, runs 100% locally)

## Architectural Philosophy: The Split Codebase
The repository must function as two distinct entities living within a single Next.js project to support CLI distribution:
- The Registry (src/registry/ & public/r/): The isolated source code of the gesture components. Components here must not import anything from the docs site. During the build step, these files are compiled into individual JSON payloads (e.g., public/r/air-cursor.json).
- The Documentation Site (src/app/): A standard Next.js website used exclusively to preview, test, and document the registry components.

## Detailed Directory Structure
```plaintext
kine-ui/
├── public/
│   └── r/                             <-- Generated JSON payloads for the CLI
│       ├── styles/
│       │   └── index.json             <-- Master index of all Kine UI components
│       └── air-cursor.json            <-- Example compiled component payload
├── src/
│   ├── app/                           <-- Documentation Site
│   │   ├── layout.tsx
│   │   ├── page.tsx                   <-- Landing page 
│   │   └── docs/
│   │       └── [component]/page.tsx   <-- Dynamic route for live webcam previews
│   ├── registry/                      <-- Source Code for CLI Distribution
│   │   ├── core/
│   │   │   └── kine-engine.ts         <-- Singleton MediaPipe wrapper
│   │   └── gestures/
│   │       ├── KineProvider.tsx       <-- Global webcam wrapper & Context Provider
│   │       ├── AirCursor.tsx          <-- Component: Index finger tracker
│   │       └── SwipeArea.tsx          <-- Component: L/R hand velocity detector
│   ├── components/                    <-- Site-specific UI (NOT for distribution)
│   │   ├── ui/                        <-- Docs site buttons, navbars, etc.
│   │   └── CodeBlock.tsx              <-- Syntax highlighter for raw registry code
│   └── registry.json                  <-- CLI configuration manifest
```

### Component Schema & CLI Architecture

To allow developers to install components via a command like npx shadcn add https://kineui.com/r/air-cursor.json, Kine UI uses the standard registry item schema.

| Property | Type | Description |
| name | String | The unique identifier (e.g., "air-cursor"). |
| type | String | Defines the category (e.g., "registry:component"). |
| dependencies | Array | Required npm packages (e.g., ["framer-motion", "@mediapipe/tasks-vision"]). |
| files | Array | The raw file paths and content to be injected into the user's project. |

## Core Modules & Specifications

### Module A: The Kine Engine (src/registry/core/kine-engine.ts)
**Purpose**: A singleton class managing @mediapipe/tasks-vision.
**Requirements**:
- Must request navigator.mediaDevices.getUserMedia with { video: { facingMode: "user" } }.
- Outputs a continuous requestAnimationFrame loop containing the 21 3D hand landmarks.

### Module B: The Global Provider (src/registry/gestures/KineProvider.tsx)
**Purpose**: Ensures the webcam is only initialized once, regardless of how many gesture components are mounted.
**Requirements**:
- Uses React Context to broadcast landmarks (the coordinate array) and isWebcamActive (boolean) to all child components.
- Includes an optional <DebugCanvas /> overlay to show the raw skeleton map during development.

### Module C: Component - Air Cursor (src/registry/gestures/AirCursor.tsx)
**Purpose**: Replaces the standard mouse cursor with the user's index finger.
**Logic**:
- Tracks landmarks[8] (Index Finger Tip).
- Calculates the 3D Euclidean distance between the thumb (landmarks[4]) and index finger to detect a "pinch" for clicking.
- **Math**: The distance $d$ is calculated as $d = \sqrt{(x_8 - x_4)^2 + (y_8 - y_4)^2 + (z_8 - z_4)^2}$. If $d < 0.04$, trigger a standard JavaScript MouseEvent('click').

### Module D: Component - Swipe Area (src/registry/gestures/SwipeArea.tsx)
**Purpose**: A wrapper div that listens for high-velocity horizontal movement.
**Logic**:
- Tracks the center palm (landmarks[0]).
- Compares the X-coordinate delta over a 5-frame buffer.
- If the velocity exceeds the defined threshold, fire onSwipeLeft or onSwipeRight.

## Agent Execution Plan (Strict Order)

### Phase 1: Foundation
Scaffold the Next.js App Router project. Install Tailwind, Framer Motion, and MediaPipe. Create the exact folder structure above.

### Phase 2: Vision Engine
Write kine-engine.ts. Verify it successfully connects to the webcam and logs the 21 landmarks without blocking the main UI thread.

### Phase 3: Context & Distribution
Build KineProvider.tsx. Setup the registry.json manifest at the root to prepare for CLI compilation.

### Phase 4: Component Logic
Build AirCursor.tsx and implement the 3D distance math for the pinch-to-click functionality.

### Phase 5: The Documentation
Build a live demo page at app/docs/air-cursor/page.tsx that requests camera access and mounts the component over a test interface.

---

## Phase 6: The `npx kine-ui` CLI
To strengthen the brand and maintain full control over the Next.js developer experience, Kine UI distributes a specialized CLI package (`kine-ui`) instead of relying exclusively on community implementations like `shadcn`.

The CLI will live alongside the source code in a monorepo setup, or as a distinct package `packages/cli` in the future.

**Commands**:
1. `npx kine-ui init`: Creates necessary directory structures (e.g., `@/components/kine` or `@/registry`) and writes foundational dependencies into the target project (`kine-provider`).
2. `npx kine-ui add <component>`: Installs specific spatial components (e.g., `air-cursor`) by fetching the JSON payload generated by `build-registry.mjs` and writing it to the target user's disk.
