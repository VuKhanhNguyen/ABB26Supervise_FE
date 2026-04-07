# Design System Specification: High-Performance Automotive Intelligence

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Kinetic Cockpit."** 

Unlike standard utility apps, this system avoids the "static template" look. It is designed to feel like a high-performance heads-up display (HUD) found in next-generation endurance racing. We move beyond traditional flat grids by employing **intentional asymmetry, glassmorphism, and tonal depth** to mimic the layered instrumentation of the Air Blade 2026. The goal is a digital experience that feels as precisely engineered as the machine it supervises.

---

## 2. Color Strategy & Surface Logic
The palette is rooted in high-contrast "After-Dark" aesthetics, utilizing deep carbon tones to allow functional accents to vibrate with clarity.

### The "No-Line" Rule
**Explicit Instruction:** You are prohibited from using 1px solid borders to section off content. 
Boundaries must be defined solely through background color shifts or tonal transitions. For example, a `surface-container-low` section sitting on a `surface` background provides all the separation required. This creates a more sophisticated, seamless "molded" look rather than a "pasted" look.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of carbon fiber and frosted glass.
- **Base Layer:** `surface` (#131313) or `surface-container-lowest` (#0E0E0E).
- **Secondary Tier:** Use `surface-container` (#201F1F) for major content blocks.
- **Nesting:** Place a `surface-container-high` (#2A2A2A) element inside a `low` container to define its importance through "natural lift" rather than artificial lines.

### Signature Textures & Glassmorphism
- **Glassmorphism:** For floating widgets (e.g., real-time RPM or fuel gauges), use `surface` at 60% opacity with a `backdrop-blur` of 20px. 
- **The "Pulse" Gradient:** Main CTAs should not be flat. Use a subtle linear gradient from `primary` (#98CDF2) to `primary-container` (#457B9D) at a 135-degree angle to provide "visual soul."

---

## 3. Typography
The typography system balances the technical precision of **Space Grotesk** (for data and headings) with the high readability of **Inter** (for functional UI).

| Level | Token | Font Family | Size | Character |
| :--- | :--- | :--- | :--- | :--- |
| **Display** | `display-lg` | Space Grotesk | 3.5rem | Aggressive, tech-forward hero stats. |
| **Headline** | `headline-md` | Space Grotesk | 1.75rem | Major diagnostic categories. |
| **Title** | `title-lg` | Inter | 1.375rem | Bold, authoritative section headers. |
| **Body** | `body-md` | Inter | 0.875rem | High-readability technical data. |
| **Label** | `label-md` | Inter | 0.75rem | High-contrast, all-caps metadata. |

**Creative Usage:** Use `display-lg` for speed or temperature readouts with a tight letter-spacing (-0.02em) to evoke a bespoke automotive instrument cluster.

---

## 4. Elevation & Depth
In "The Kinetic Cockpit," depth is earned through light, not lines.

- **Tonal Layering:** Stacking `surface-container-lowest` on `surface-container-low` creates a soft, natural recession. This is the preferred method for cards and lists.
- **Ambient Shadows:** When an element must "float" (e.g., a critical engine alert), use an extra-diffused shadow. 
    - *Blur:* 30px-50px. 
    - *Opacity:* 6%. 
    - *Color:* Use a tinted version of `primary` or `tertiary` (Racing Red) rather than black.
- **The Ghost Border Fallback:** If accessibility requires a container edge, use the `outline-variant` (#41484D) at 15% opacity. Never use 100% opaque borders.

---

## 5. Components

### Buttons & CTAs
- **Primary:** Gradient-filled (`primary` to `primary-container`). 8px (`lg`) corner radius. High-contrast `on-primary` text.
- **Secondary:** Glass-filled. `surface-bright` at 10% opacity with a 1px "Ghost Border."
- **Interaction:** On hover/active, increase the `surface-tint` to create a "glow" effect, mimicking backlit dashboard buttons.

### Cards & Information Architecture
- **Rule:** Forbid divider lines. Use vertical white space (16px or 24px) or subtle shifts between `surface-container` tiers.
- **The "Diagnostic" Card:** Use a glassmorphic background with a 1px top-edge-only highlight (0.5pt `primary` at 30% opacity) to simulate a light-catching glass edge.

### Status Indicators (Chips)
- **Healthy:** `secondary-container` (#30A193) background with `on-secondary` text.
- **Alert:** `tertiary-container` (#DC3240) with a pulsing animation to draw immediate attention.

### Input Fields
- Avoid the "box" look. Use a `surface-container-lowest` background with a `primary` 2px bottom-accent line that activates on focus. This mimics technical blueprint aesthetics.

---

## 6. Do’s and Don’ts

### Do
- **DO** use asymmetric layouts. Align a large diagnostic number to the left and its label to the far right to create a "wide-screen" cockpit feel.
- **DO** lean into high-contrast labels. Use `label-sm` with 0.1em letter spacing for a "NASA" tech aesthetic.
- **DO** use "Safety Green" (`secondary`) as a breath of fresh air against the deep carbon background to signal system health.

### Don’t
- **DON'T** use standard 1px borders. It breaks the immersive, "machined" feel of the interface.
- **DON'T** use pure black (#000000). Use the `surface` (#131313) and `surface-container` tokens to maintain visual "air" and depth.
- **DON'T** use rounded "pill" buttons. Stick to the 8px (`lg`) radius to maintain the "Sharp-Edge" automotive design language.

---

## 7. Signature Elements for AB26Supervise
- **The "Telemetry Scan" Animation:** When the app opens, elements should not just fade in; they should "wipe" horizontally, mimicking a laser scan of the bike's hardware.
- **Performance Gauges:** Use the `tertiary` (Racing Red) for redlines and the `primary` (Electric Blue) for active performance zones, ensuring the user can interpret data at 80mph at a glance.