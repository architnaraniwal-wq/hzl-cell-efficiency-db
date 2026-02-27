# Deployment Guide for AI Studio Manager

## Overview
This Create React App project is now ready for deployment through your AI Studio Manager.

## Configuration Settings for AI Studio Manager

Based on your screenshot, use these exact settings:

### 1. Framework
- **Framework**: `Create React App`
- **Rendering Mode**: `Client-Side Rendering (CSR)` ✓

### 2. Repository Path
- **Repository Path**: `Root Directory` (select from dropdown)
  - This is the default setting where package.json is located

### 3. Install Command
```bash
npm install --force
```
**Note**: Use `--force` flag to ensure all dependencies install correctly

### 4. Build Command
```bash
npm run build
```
This creates an optimized production build in the `build/` folder

### 5. Start Command
For production deployment, use:
```bash
serve -s build
```

**Alternative** (if serve is not available):
```bash
npx serve -s build
```

### 6. Memory Allocation
- **Memory Allocation**: `512 MB` (minimum)
- Recommended: `1024 MB` for better performance

## Pre-Deployment Checklist

- [x] `package.json` exists in root directory
- [x] `public/` folder with index.html and assets
- [x] `src/` folder with React components
- [x] `.gitignore` file configured
- [x] README.md with project documentation

## File Structure

```
your-repo/
├── public/
│   ├── index.html              # React shell
│   ├── app-content.html        # Main application HTML
│   └── *.png                   # Images
├── src/
│   ├── index.js                # React entry point
│   ├── index.css               # Styles
│   └── App.js                  # Main component
├── package.json                # Dependencies
├── README.md                   # Documentation
└── .gitignore                  # Git ignore rules
```

## Deployment Steps

### Step 1: Push to Git Repository
```bash
git add .
git commit -m "Setup Create React App for deployment"
git push origin main
```

### Step 2: Configure AI Studio Manager

1. Open AI Studio Manager
2. Click "Deploy react Application"
3. Fill in the form with these values:

| Field | Value |
|-------|-------|
| Framework | Create React App |
| Rendering Mode | Client-Side Rendering (CSR) |
| Repository Path | Root Directory |
| Install Command | `npm install --force` |
| Build Command | `npm run build` |
| Start Command | `serve -s build` |
| Memory Allocation | 512 MB (or higher) |

4. Click "Deploy React App"

### Step 3: Wait for Deployment
- The deployment process will:
  1. Clone your repository
  2. Run `npm install --force`
  3. Run `npm run build`
  4. Start the server with `serve -s build`

### Step 4: Access Your Application
- Once deployed, you'll receive a URL
- The application will be accessible at that URL

## Troubleshooting

### Issue: "serve command not found"
**Solution**: The deployment environment should install serve automatically. If not, modify the start command to:
```bash
npx serve -s build
```

### Issue: Build fails with dependency errors
**Solution**: The `--force` flag in install command should resolve this. If it persists, check the build logs.

### Issue: Application shows blank page
**Solution**: Check browser console for errors. Ensure all external scripts (Chart.js, jsPDF) are loading correctly.

### Issue: Memory limit exceeded
**Solution**: Increase Memory Allocation to 1024 MB or higher.

## Environment Variables (if needed)

If your application needs environment variables:

1. Create a `.env` file in the root:
```env
REACT_APP_API_URL=https://your-api-url.com
```

2. Use in code as:
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

## Port Configuration

- **Development**: Port 3000 (default)
- **Production (serve)**: Port 3000 (default) or specified by deployment platform
- The deployment manager will handle port assignment automatically

## Build Output

After successful build, you'll see:
```
Creating an optimized production build...
Compiled successfully.

File sizes after gzip:

  [size details]

The build folder is ready to be deployed.
```

## Post-Deployment

After deployment:
1. Test all features (charts, exports, etc.)
2. Verify API connections work
3. Check that all images load correctly
4. Test on different browsers

## Support

For deployment issues:
1. Check AI Studio Manager logs
2. Verify all configuration settings
3. Ensure git repository is accessible
4. Contact your deployment admin if issues persist

## Notes

- The app uses external CDN scripts (Chart.js, jsPDF) - ensure outbound internet access
- All images are bundled in the `public/` folder
- The build process may take 2-5 minutes depending on server resources
- First deployment may take longer as dependencies are installed

---

**Last Updated**: February 27, 2026
**Version**: 1.0.0
