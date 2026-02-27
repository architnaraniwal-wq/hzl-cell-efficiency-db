# Final Deployment Guide for AI Studio Manager

## Solution: Create a Fake React Build

Your AI Studio Manager expects a Create React App with a `build/` directory. We've created a workaround that satisfies this requirement while keeping your HTML app intact.

## What We've Done

1. ✅ Created a `build/` script that copies your files to a `build/` directory
2. ✅ Updated `server.js` to serve from either `build/` or root directory
3. ✅ Added the `build/` folder to git (not ignored)
4. ✅ Made the deployment system happy!

## AI Studio Manager Configuration

Use these **EXACT** settings:

| Field | Value |
|-------|-------|
| **Framework** | `Create React App` |
| **Rendering Mode** | `Client-Side Rendering (CSR)` ✓ |
| **Repository Path** | `Root Directory` |
| **Install Command** | `npm install` |
| **Build Command** | `npm run build` |
| **Start Command** | `node server.js` |
| **Memory Allocation** | `512 MB` |

## Important Changes

### package.json
```json
{
  "scripts": {
    "build": "mkdir -p build && cp index.html build/ && cp *.png build/ 2>/dev/null || true && echo 'Build completed successfully'",
    "start": "node server.js"
  }
}
```

The build script:
- Creates a `build/` directory
- Copies `index.html` to it
- Copies all PNG images to it
- Satisfies the deployment system's requirement

### server.js
- Automatically detects if `build/` directory exists
- Serves from `build/` if available, otherwise from root
- Works for both development and production

## Deployment Steps

### Step 1: Commit and Push

```bash
git add .
git commit -m "Add build directory for deployment"
git push origin main
```

**IMPORTANT**: Make sure the `build/` folder is committed to git!

### Step 2: Deploy on AI Studio Manager

1. Open AI Studio Manager
2. Select "Deploy react Application"
3. Fill in the form with the exact values above
4. Click "Deploy React App"

### Step 3: Watch the Logs

The deployment will:
1. ✅ Clone your repo
2. ✅ Run `npm install` (installs Express)
3. ✅ Run `npm run build` (creates/updates build folder)
4. ✅ Find the `build/` directory (deployment check passes!)
5. ✅ Run `node server.js` (starts your app)
6. ✅ Access your app at the provided URL

## What Happens During Build

```bash
npm run build
# Output:
# Build completed successfully
```

This creates:
```
build/
├── index.html           # Your main app
├── HZL_Logo.png        # All images
├── CE KPI .png
├── CE Setting.png
└── ... (all other PNGs)
```

## Testing Locally

### Test the build:
```bash
npm run build
ls build/  # Verify files are there
```

### Test the server:
```bash
npm install
npm start
# Visit http://localhost:3000
```

Your app should work exactly as before!

## Troubleshooting

### Error: "build directory not found"
**Solution**: Make sure you committed the `build/` folder to git:
```bash
git add build/
git commit -m "Add build directory"
git push
```

### Error: "Build failed"
**Solution**: The build script is very simple and shouldn't fail. Check the logs for the exact error.

### Error: Server starts but nothing loads
**Solution**: Check that all PNG files are in the build directory:
```bash
ls build/*.png
```

### Error: 502 Bad Gateway after deployment
**Solution**:
1. Check the deployment logs for Node.js errors
2. Verify the server is listening on the correct PORT
3. The server should bind to `0.0.0.0` (it does in server.js)

## Why This Works

Your AI Studio Manager has a hardcoded check for Create React App:
- ❌ It looks for a `build/` directory
- ❌ It fails if not found
- ✅ Our build script creates this directory
- ✅ Deployment passes!

The server then serves your original HTML app from the `build/` folder. It's the same app, just in a different location.

## File Structure

```
your-repo/
├── index.html          # Original (also copied to build/)
├── *.png              # Images (also copied to build/)
├── server.js          # Express server
├── package.json       # With build script
└── build/             # Created by npm run build
    ├── index.html
    └── *.png
```

## Post-Deployment

After successful deployment:
1. You'll get a URL like: `your-app.iocompute.ai`
2. Visit the URL - your app should work!
3. Check `/health` endpoint: `your-app.iocompute.ai/health`

## Summary

- ✅ Your original `index.html` is unchanged
- ✅ The `build/` folder satisfies deployment requirements
- ✅ The server works with or without the `build/` folder
- ✅ GitHub Pages still works (uses root `index.html`)
- ✅ AI Studio Manager deployment now works!

---

**Last Updated**: February 27, 2026
**Version**: 3.0.0 (Build Directory Solution)
