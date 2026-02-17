
# Dota2Group Verification Flow — Implementation Plan

## Overview
A single-page, 4-step onboarding flow that guides users from Unverified → Verified. Frontend-only prototype with simulated OAuth and form steps. Dark theme, readability-first design.

---

## 1. Page Shell & Layout
- Dark charcoal background with a centered content column (max ~640px)
- **Header** (sticky): "Dota2Group" text logo (left), Support · Privacy · Terms links (right)
- **Footer** (minimal): Privacy Policy · Terms · Support + "No payments required" disclaimer
- Mobile: logo left, support icon right; footer simplified

## 2. Sticky Stepper
- 4 labeled steps: Discord → Profile → Steam → Done
- Visual states: active (accent border, bright text), completed (green tick), upcoming (muted)
- Desktop: horizontal bar pinned below header
- Mobile: compact horizontal stepper showing current + next step label

## 3. Hero Section (Above Card, Step 1 Only)
- **H1**: "Unlock the Official Dota2Group Discord"
- **Subtitle**: "Link Discord, create your tournament profile, and verify Steam. Takes ~60 seconds."
- **Trust line**: "No payments required. We will never ask you to send money to a person or moderator."

## 4. Step 1 — Link Discord
- Card with step label, title ("Link your Discord"), body copy, and primary CTA button ("Link Discord & continue →")
- Microcopy under CTA: "Takes 30–60 seconds. You can disconnect anytime."
- "What we access" text link opens a modal/drawer
- Below card: compact "What you unlock" row with 4 bullet items (tournaments, rank roles, team finder, giveaways)
- Clicking CTA simulates success and advances to Step 2

## 5. Step 2 — Create Tournament Profile
- Card with Username, Email, Password fields + "Create profile & continue →" CTA
- Basic client-side validation (required fields, email format, password length)
- Microcopy: "Powered by Rivals Gaming..."
- Collapsible "Why do I need this?" inline explanation
- On submit, advance to Step 3

## 6. Step 3 — Link Steam
- Card with title ("Verify your Dota account"), body, and "Link Steam & verify →" CTA
- Microcopy: "We only store your SteamID and public Dota data."
- "What we access" link opens modal
- Clicking CTA simulates success and advances to Step 4

## 7. Step 4 — Done
- Card with "You're verified ✅" title and "Return to Discord →" CTA
- Microcopy: "You can manage linked accounts anytime in your Rivals settings."
- CTA links to `#` (placeholder)

## 8. "What We Access" Modal
- Desktop: centered modal; Mobile: bottom sheet style
- Tabbed: Discord | Steam
- Each tab shows ✅ "We can access" items and ❌ "We cannot access" items
- "Why Discord?" / "Why Steam?" explanation at bottom of each tab

## 9. Styling & Design
- **Palette**: near-black charcoal background, slightly lighter card, off-white text, strong red accent for CTAs, muted greys for secondary elements
- **Typography**: Inter / system sans-serif; generous line-height (1.5+); sizes per spec (H1 28–32px desktop, body 15–16px, microcopy 12–13px)
- **Buttons**: 48px min height, 12–14px border-radius, subtle hover brighten
- **Cards**: subtle 1px border, soft shadow
- **Transitions**: 200ms fade/slide between steps; green tick animation on completion

## 10. Mobile Optimizations
- Full-width card with 16px padding
- Optional sticky CTA button at bottom with safe-area padding
- Bottom-sheet modals with clear close button
- Correct input types on form fields (email, password)
- Step title + CTA visible without scroll
