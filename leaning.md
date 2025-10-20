Redux + User Fetching Logic (Theory)

1. Initial State:

loading is set to true by default in the Redux store.
This indicates the app is fetching user data initially.

2. App Start:

In App.js, we fetch the current user from the backend when the app mounts.
While fetching, loading remains true.

3. After Fetch:

When the user is successfully fetched or fetch fails, loading is set to false.
This tells the app that user data is ready (or absent).

4. Router Behavior:

The RouterProvider waits until loading is false to render routes.
ProtectedRoute checks if user exists:

If yes → allow access.
If no → redirect to login.

5. Login Route:

Same logic applies: show loading until the fetch is complete.
Prevents flash of login page if user is already logged in.
