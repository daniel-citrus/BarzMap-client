# BarzMap Frontend Tech Plan

## Scope & Goals
Deliver a responsive web client that helps visitors discover outdoor gyms, submit new locations, and lets admin reviewers manage submissions. Frontend must feel fast, handle Auth0 auth flows, and integrate map-based discovery backed by Supabase APIs.

## Frontend Stack
- **React + Vite** for SPA composition and fast local iteration.
- **Tailwind CSS** to enforce a coherent UI system.
- **MapLibre GL JS** for interactive maps, markers, and clustering.
- **Auth0 React SDK** to manage authentication and secure API calls.

## Core User Flows
1. **Find Parks**: Load map, request geolocation, display nearby Supabase data with styled markers and detail popovers.
2. **Submit Park**: Authenticated user opens modal/page form, adds details, uploads images, and receives confirmation.
3. **Admin Review**: Admin user accesses protected routes rendering pending submissions, approves or rejects with feedback.

- map
- address input

## Startup Checklist (Frontend)
- [x] Initialize Vite + React project and add Tailwind.
- [x] Set up project folders (`src/components`, `src/hooks`, shared assets).
- [x] Wire Auth0 provider, login/logout buttons, and profile display.
- [ ] Implement protected routing and attach access token to API requests.
- [ ] Install MapLibre, render base map with controls, and enable geolocation.
- [ ] Scaffold park submission form with validation, image upload, and location picker.

## Integration Plan
- [ ] Install HTTP client (Axios or native fetch wrappers).
- [ ] Centralize API service with error/loading states.
- [ ] Consume backend endpoints for parks, equipment, and submissions.
- [ ] Add Supabase real-time listeners for live park updates.

## Build Roadmap
### Phase 1 – Foundation
- Define component architecture (buttons, inputs, modals, map wrappers).
- Configure routing (Home, Map, Submit, Profile) and responsive layout.
- Complete Auth0 login/logout + profile surfaces.

### Phase 2 – Discovery & Submission
- Fetch park markers, cluster dense areas, and show detail views.
- Build search, filter, and sort interfaces (equipment, distance, keywords).
- Finalize submission experience with progress states and confirmation messaging.

### Phase 3 – Admin & Content Ops
- Gate admin dashboard by role claim, list pending parks, and provide review UI.
- Allow comment-based approve/reject actions and change logs.
- Prepare media management views for uploaded images.

### Phase 4 – Polish & Launch
- Apply design system, animations, skeleton loaders, and mobile optimizations.
- Introduce caching, lazy loading, and bundle checks.
- Run accessibility, cross-browser, and device QA before production release.
