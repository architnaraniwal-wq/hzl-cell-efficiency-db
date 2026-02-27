# HZL Cell Efficiency Monitoring Dashboard

A comprehensive dashboard for monitoring cell efficiency and rejected cathode counts at HZL.

## Features

- Cell Efficiency Heatmap
- KPI Dashboard
- Rejected Cathode Count tracking
- Cell Cycle Summary
- Real-time data visualization with Chart.js
- Export functionality (Excel, PDF, Images)

## Tech Stack

- React 18
- Chart.js for data visualization
- jsPDF for PDF exports
- Create React App

## Deployment Configuration for AI Studio Manager

### Framework Settings
- **Framework**: Create React App
- **Rendering Mode**: Client-Side Rendering (CSR)
- **Repository Path**: Root Directory
- **Install Command**: `npm install --force`
- **Build Command**: `npm run build`
- **Start Command**: `serve -s build`
- **Memory Allocation**: 512 MB (minimum)

### Installation

```bash
npm install --force
```

### Development

```bash
npm start
```

Runs the app in development mode on http://localhost:3000

### Production Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

### Deployment

The built application can be deployed using any static file server:

```bash
npm install -g serve
serve -s build
```

Or deploy to your preferred hosting platform (Vercel, Netlify, AWS S3, etc.)

## Project Structure

```
/
├── public/
│   ├── index.html          # React HTML shell
│   ├── app-content.html    # Main app HTML content
│   └── *.png              # Image assets
├── src/
│   ├── App.js             # Main React component
│   ├── index.js           # React entry point
│   └── index.css          # Application styles
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Configuration

The application connects to IOsense API. Make sure the API endpoints are accessible from your deployment environment.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - HZL Internal Use Only
