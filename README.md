# 🚲 Ride DMV
### A destination for every ride.

## Deploy to Vercel

1. Go to **github.com** → create a new repo called `ride-dmv`
2. Upload this **entire unzipped folder** to GitHub
   - Click "uploading an existing file"
   - Open the unzipped folder on your computer
   - Select ALL files AND the `src/` and `public/` folders
   - Drag everything into GitHub at once → Commit
3. Go to **vercel.com** → "Add New Project" → import `ride-dmv`
4. Leave all settings as-is → click **Deploy**
5. 🎉 Done! Your app is live.

## Run locally

```bash
npm install
npm run dev
```
Then open http://localhost:5173

## Add Google Maps (optional)
Open `src/App.jsx`, find `AIzaSyDemo_Replace_With_Real_Key` and swap in a real key from console.cloud.google.com
