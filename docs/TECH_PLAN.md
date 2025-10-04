# BarzMap Frontend Tech Plan

## Scope & Goals
Deliver a mobile-first responsive web client that helps visitors discover outdoor gyms, submit new locations, and lets admin reviewers manage submissions. Frontend must feel fast, handle Auth0 auth flows, and integrate map-based discovery using internal API and Supabase database tables. 

## Frontend Stack
- **React + Vite** for SPA composition and fast local iteration.
- **Tailwind CSS** to enforce a coherent UI system.
- **MapLibre GL JS** for interactive maps, markers, and clustering.
- **Auth0 React SDK** to manage authentication and secure API calls.

## Core Functionality
1. **Find Parks**: 
   1. Load map
   2. Request geolocation
   3. Filter by equipment
   4. Display gym map markers
      1. Map marker pop-ups to display description
      2. Hover pop-up widgets
   5. List view
      1. Sort by distance
2. **User Authentication**
   1. New account creation
   2. Profile display
   3. Profile UI widgets
3. **Park Submissions**:
   1. Authenticated users access submission form
   2. Inputs for park details (address, equipment checklist)
   3. Photo uploads
4. **Admin Review**:
   1. Admin user view existing submissions
   2. Approve/reject with feedback

## Feature Rollout Checklist
- [x] Initialize Vite + React + Tailwind project and organize `src/components`, `src/hooks`, and shared assets.
- [x] Install MapLibre, render the base map with controls, enable geolocation, and ensure the map recenters on the user.
- [x] Render park markers
  - [x] Onclick detailed popups
  - [x] Render based on view
    - [x] 1-2 second render delay
- [x] User location
  - [x] First visit geolocation request
  - [x] Location search
- [ ] Park submissions
  - [ ] Form validation
  - [ ] Image upload
  - [ ] Location picker
    - [ ] Map drag, coordinates, or direct address
- [ ] Admin dashboard
  - [ ] Approve or reject submissions
- [ ] Design system polish
  - [ ] Animations
  - [ ] Skeleton loaders
  - [ ] Mobile optimization
- [ ] Introduce caching strategies, lazy loading, and bundle size checks
- [ ] Run accessibility, cross-browser, and device QA

## Integration Plan
- [ ] Install HTTP client (Axios or native fetch wrappers).
- [ ] Centralize API service with error/loading states.
- [ ] Consume backend endpoints for parks, equipment, and submissions.
- [ ] Add Supabase real-time listeners for live park updates.

## Post Launch
  - [ ] Integrate Auth0 provider with login/logout buttons and profile display.
  - [ ] Define reusable component architecture for buttons, inputs, modals, and map wrappers.
  - [ ] Configure routing (Home, Map, Submit, Profile) with responsive layouts.
  - [ ] Map markers
    - [ ] Hover popups
    - [ ] Detailed popup address (link to Google Maps directions)
  - [ ] Location search
    - [ ] Address auto-complete
    - [ ] Distance calculator
  - [ ] Park submissions
    - [ ] Form progress states
    - [ ] Save progress
  - [ ] Admin dashboard
    - [ ] Comment based approvals
    - [ ] Individual image approval