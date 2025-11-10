# Hook Audit Notes

Quick reference for reviewing the custom React hooks used across the project and the follow-up work they require.

## Hooks That Need Attention

### `useMapMarkers`
- Guard the returned API against the current mismatch: either return `setMapMarkers` (preferred) or update the docs to reflect the side-effect behaviour.
- Clear existing markers before adding replacements and during cleanup to avoid duplicates and detached DOM nodes.
- Memoise the `clearMapMarkers` helper or include it in the `useEffect` dependency array to satisfy linting and capture the latest implementation.
- Gate marker initialisation on `mapReady` and trigger an initial refresh once the map is ready so markers appear on first load.

### `useClientAddress`
- Debounce or cancel in-flight `getCoordinates` calls so stale responses cannot overwrite newer addresses.
- Persist the bootstrapped address so the hook does not re-fetch on every remount.
- Surface the loading/error state so callers can provide feedback.

### `useAuthentication`
- Skip `getAccessTokenSilently()` until `user` (and ideally `isAuthenticated`) is available to reduce noisy errors.
- Prevent state updates on unmounted components when the access token request resolves late.
- Consider exposing the user object alongside the token for consumers that already need both.

### `useUserLogin`
- Guard the login flow on `user` being present in addition to `isAuthenticated` and `userToken`.
- Provide abort logic or a stale-response guard for the login request to avoid logging out-of-date responses.
- Replace the `console.log` with production-safe handling (e.g. toast, telemetry hook).

## Hooks Currently Stable
- `useMapLibreInstance`: Handles lifecycle and cleanup appropriately; no changes needed.
- `useMapHelpers`: Purely derives bounds-sensitive features; stable for current mock data use.
- `useSampleParkData`: Static memoised sample data; nothing pending.

## Checklist

- [ ] Update `useMapMarkers` to guarantee markers refresh on load and expose the documented setter API.
- [ ] Ensure marker cleanup runs before each refresh and during hook teardown.
- [ ] Add race-condition protection to `useClientAddress` for address/coordinate resolution.
- [ ] Cache or memoise the resolved client address between mounts.
- [ ] Gate the Auth0 token request in `useAuthentication` on `user`/`isAuthenticated`.
- [ ] Prevent setState-after-unmount in `useAuthentication`.
- [ ] Strengthen the guards and cancellation logic in `useUserLogin`.
- [ ] Replace temporary `console.log` calls in authentication hooks with production-friendly feedback.
