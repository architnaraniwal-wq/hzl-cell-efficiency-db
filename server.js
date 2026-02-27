const express = require('express');
const path = require('path');
const app = express();

// Determine if we should serve from build directory or root
const buildDir = path.join(__dirname, 'build');
const fs = require('fs');
const serveFromBuild = fs.existsSync(buildDir);

const staticDir = serveFromBuild ? buildDir : __dirname;

console.log(`Serving files from: ${staticDir}`);

// Serve static files
app.use(express.static(staticDir));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    serveFrom: serveFromBuild ? 'build' : 'root',
    timestamp: new Date().toISOString()
  });
});

// Catch all - serve index.html for any other routes (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
  console.log(`Serving from: ${staticDir}`);
});
