# Deployment Guide for AI Studio Manager (Express Server)

## Why Express Instead of Create React App?

Your application is a **standalone HTML file** that works perfectly as-is. Instead of forcing it into React (which was causing issues), we're using a simple **Express.js server** that just serves your HTML file.

This approach:
- ✅ Keeps your original `index.html` unchanged
- ✅ Works with AI Studio Manager's deployment system
- ✅ Doesn't affect your GitHub Pages deployment
- ✅ Simple and straightforward

## Deployment Settings for AI Studio Manager

Since there's no "Express" or "Static HTML" framework option, you'll need to configure it manually:

### Option 1: If there's a "Node.js" or "Custom" Framework Option

| Setting | Value |
|---------|-------|
| **Framework** | `Node.js` or `Custom` or `Other` |
| **Repository Path** | `Root Directory` |
| **Install Command** | `npm install` |
| **Build Command** | `echo "No build needed"` |
| **Start Command** | `npm start` or `node server.js` |
| **Memory Allocation** | `512 MB` |

### Option 2: If You Must Select "Create React App"

Use these workarounds:

| Setting | Value |
|---------|-------|
| **Framework** | `Create React App` |
| **Repository Path** | `Root Directory` |
| **Install Command** | `npm install` |
| **Build Command** | `npm start &` *(start server in background)* |
| **Start Command** | `tail -f /dev/null` *(keep process alive)* |
| **Memory Allocation** | `512 MB` |

**Alternative Start Command**:
```bash
node server.js
```

## File Structure

```
your-repo/
├── server.js              # Express server (NEW)
├── package.json          # Node dependencies (UPDATED)
├── index.html            # Your main app (UNCHANGED)
├── *.png                 # Images (UNCHANGED)
└── .gitignore           # Git ignore
```

## What Each File Does

### `server.js`
- Simple Express.js web server
- Serves `index.html` and static files (images, etc.)
- Runs on port 3000 (or PORT environment variable)

### `package.json`
- Defines Express.js as the only dependency
- `npm start` runs `node server.js`
- No build process needed

### `index.html`
- **Your original application - completely unchanged**
- All functionality preserved
- Works exactly like it does locally

## Deployment Steps

### Step 1: Commit Changes to Git

```bash
git add server.js package.json
git commit -m "Add Express server for production deployment"
git push origin main
```

**Note**: Your GitHub Pages deployment is unaffected!

### Step 2: Configure AI Studio Manager

1. Open AI Studio Manager
2. Try to find a "Node.js" or "Custom" framework option
3. If not available, select "Create React App" and use the workaround settings above
4. Fill in the deployment form
5. Click Deploy

### Step 3: Test Locally First

Before deploying, test the Express server locally:

```bash
# Install dependencies
npm install

# Start the server
npm start

# Access at http://localhost:3000
```

You should see your app working exactly as before!

## Troubleshooting

### Issue: "Framework not supported"
**Solution**: Use "Create React App" with the workaround commands, or ask your admin if there's a "Node.js" or "Custom" option.

### Issue: Server starts but shows blank page
**Solution**: Check that `index.html` is in the root directory (not in a subfolder).

### Issue: Images not loading
**Solution**: Verify all PNG files are in the root directory with `server.js`.

### Issue: Port already in use
**Solution**: The deployment platform will assign a port automatically via `process.env.PORT`.

## Alternative: Manual Deployment

If AI Studio Manager doesn't work, you can deploy manually:

### Using PM2 (Process Manager)
```bash
npm install -g pm2
pm2 start server.js --name hzl-app
pm2 save
pm2 startup
```

### Using Docker
Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t hzl-app .
docker run -p 3000:3000 hzl-app
```

## Environment Variables

If needed, create `.env` file:
```env
PORT=3000
NODE_ENV=production
```

Update `server.js` to use:
```javascript
require('dotenv').config();
const PORT = process.env.PORT || 3000;
```

## Comparison with GitHub Pages

| Feature | GitHub Pages | AI Studio Manager |
|---------|-------------|-------------------|
| **File Used** | `index.html` | `index.html` (via server.js) |
| **Server** | GitHub's static server | Your Express server |
| **Build Process** | None | None |
| **Deployment** | Git push to gh-pages | AI Studio Manager |
| **URL** | yourname.github.io/repo | Your custom domain |

**Both deployments use the same `index.html` file!**

## Why This Works

1. **Simple**: Just serves files, no complex build process
2. **Compatible**: Works with most deployment platforms
3. **Unchanged App**: Your `index.html` stays exactly the same
4. **Flexible**: Can add features later (API proxying, authentication, etc.)

## Support

If deployment fails:
1. Check the server logs in AI Studio Manager
2. Verify `server.js` and `package.json` are committed
3. Test locally first with `npm start`
4. Ask your deployment admin about Node.js framework support

---

**Last Updated**: February 27, 2026
**Version**: 2.0.0 (Express Server)
