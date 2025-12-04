Render & Vercel deployment notes

- Ensure the frontend (Vercel) has environment variable `VITE_API_URL` set to your backend URL:
  - `VITE_API_URL=https://coffee-backend-5si7.onrender.com`

- For Render (backend):
  - Build command: `npm run render-build`
  - Start command: `npm start`
  - Do NOT set a `PORT` env var manually — Render supplies it.
  - Set `CORS_ORIGINS` to the frontend origin(s), e.g. `https://your-frontend.vercel.app` or set `CORS_ORIGINS=https://coffee-frontend-xyz.vercel.app,https://coffee-backend-5si7.onrender.com`.

- After changing env vars on Vercel/Render, redeploy the respective service so the new variables are included in the build/runtime.
