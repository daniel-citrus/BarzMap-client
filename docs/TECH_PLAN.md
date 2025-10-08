# BarzMap Frontend Tech Plan

## Scope & Goals
Deliver a mobile-first responsive web client that helps visitors discover outdoor gyms, submit new locations, and encourage community engagement. Frontend must feel fast, handle Auth0 auth flows, and integrate map-based discovery using internal API and Supabase database tables.

## Frontend Stack
- **React + Vite** for SPA composition and fast local iteration.
- **Tailwind CSS** to enforce a coherent UI system.
- **MapLibre GL JS** for interactive maps, markers, and clustering.
- **Auth0 React SDK** to manage authentication and secure API calls.

## Use Cases
- Outdoor gym search using the map: Guests and members open the map, auto-center on their location, and filter markers by equipment or amenities to quickly find a nearby workout spot.
- New outdoor gym submission feature: Authenticated users complete a guided form with address lookup, equipment checklist, and photo uploads to propose a new location for moderation.
- Events & Programming feature: Community members browse a calendar of upcoming workouts tied to each park, view host details, and RSVP or share links to boost attendance.

## Core Functionality
1. **Outdoor Gym Search**
   1. Load and style the MapLibre canvas with fallback center coordinates.
   2. Request and handle browser geolocation, recentering when permissions change.
   3. Power the search bar with text lookup and equipment filters, updating map bounds.
   4. Render markers with hover and detailed popups that expose address, equipment, and navigation links.
2. **New Outdoor Gym Submission**
   1. Require Auth0 login before showing the submission flow and surface profile context.
   2. Provide a guided form with address autocomplete, equipment checklist, and photo upload pipeline.
   3. Persist submissions to Supabase/SaaS backend, including draft state and validation feedback.
   4. Deliver an admin-facing review surface to approve, reject, or request changes, feeding status back to the submitter.
3. **Events & Programming**
   1. Create event data model tied to parks with fields for host, start/end times, capacity, and RSVP link.
   2. Surface upcoming events in park popups and in a list/calendar view with filtering by date and distance.
   3. Allow authenticated users to RSVP or share events, storing responses for organizers.
   4. Add moderation tools for event submissions and send status notifications to creators.

## Feature Rollout Checklist
- [x] Platform foundation (supports all use cases)
  - [x] Initialize Vite + React + Tailwind project and organize `src/components`, `src/hooks`, and shared assets.
- [x] Outdoor gym search
  - [x] Install MapLibre, render the base map with controls, and configure fallback center coordinates.
  - [x] Enable browser geolocation, recenter the map, and expose manual address search.
  - [x] Render park markers filtered by viewport and show detailed popups.
- [ ] New outdoor gym submission
  - [ ] Gate the submission flow behind Auth0 login and display user context.
  - [ ] Build the guided form with validation, equipment checklist, and multi-step progress UI.
  - [ ] Implement photo uploads and media preview handling.
  - [ ] Add a location picker with address autocomplete, map drag, and coordinate override.
- [ ] Submission moderation
  - [ ] Create an admin review dashboard to approve, reject, or request changes.
  - [ ] Surface feedback history and status updates back to submitters.
- [ ] Events & programming
  - [ ] Define frontend data models and API hooks for events tied to parks.
  - [ ] Surface upcoming events in park popups and a list/calendar view with filters.
  - [ ] Support RSVPs or share actions for authenticated users and persist responses.
  - [ ] Provide moderation workflows for event submissions and notify creators of changes.

## Future Features
- Integrate Auth0 provider with login/logout buttons and profile display.
- Define reusable component architecture for buttons, inputs, modals, and map wrappers.
- Deliver design system polish (animations, skeleton loaders, mobile optimization).
- Introduce caching strategies, lazy loading, and bundle size checks.
- Run accessibility, cross-browser, and device QA.
- Configure routing (Home, Map, Submit, Profile) with responsive layouts.
- Enhance map markers with hover popups and Google Maps directions link.
- Expand location search with address autocomplete and distance calculator.
- Extend park submissions with progress states and save progress.
- Extend admin dashboard with comment-based approvals and per-image review.
- Donation system to help fund local community projects focused in developing outdoor exercise equipment.
- Advanced event analytics and paid promotion slots for organizers.
