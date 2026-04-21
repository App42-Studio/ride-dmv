# 🚲 Ride DMV
### A destination for every ride.

---

## How to put this on the internet (step by step)

### Step 1 — Make free accounts
1. Go to **github.com** → click "Sign up" → make a free account
2. Go to **vercel.com** → click "Sign up" → sign up **with your GitHub account**

---

### Step 2 — Put this folder on GitHub
1. On GitHub, click the **"+"** button (top right) → **"New repository"**
2. Name it `ride-dmv`
3. Leave everything else as-is → click **"Create repository"**
4. On the next page, click **"uploading an existing file"**
5. Drag and drop **everything inside this folder** into the upload box
6. Click **"Commit changes"** (the green button)

---

### Step 3 — Deploy with Vercel (1 click)
1. Go to **vercel.com/dashboard**
2. Click **"Add New Project"**
3. Find `ride-dmv` in the list → click **"Import"**
4. Don't change anything → click **"Deploy"**
5. Wait about 30 seconds ⏳
6. 🎉 **Your app is live!** Vercel gives you a link like `ride-dmv.vercel.app`

---

### Step 4 — Add your Google Maps API key (optional but recommended)
The map works with a real API key. Without it, the route map won't show — but everything else will work fine.

1. Go to **console.cloud.google.com**
2. Create a project → enable **"Maps Embed API"**
3. Go to **Credentials** → **"Create API Key"**
4. Open `src/App.jsx` in any text editor
5. Find the text `AIzaSyDemo_Replace_With_Real_Key`
6. Replace it with your real key
7. Save, re-upload to GitHub → Vercel will automatically rebuild

---

## Running locally on your computer (optional)

If you want to preview it on your computer before publishing:

```bash
# 1. Install Node.js from nodejs.org if you haven't already
# 2. Open a terminal in this folder, then:
npm install
npm run dev
# 3. Open http://localhost:5173 in your browser
```

---

## Files in this project

```
ride-dmv/
├── index.html          ← The webpage shell
├── package.json        ← Project settings
├── vite.config.js      ← Build tool config
├── vercel.json         ← Vercel deploy config
├── .gitignore          ← Files to not upload
└── src/
    ├── main.jsx        ← App entry point
    └── App.jsx         ← Your entire Ride DMV app ⭐
```

---

*Built with React + Vite. Deployable to Vercel for free.*
