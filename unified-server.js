const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 80;

// Serve the static files (Landing Page) from the current directory
app.use(express.static(__dirname, {
    index: ['index.html'],
    // don't serve the launch-app directory directly as static files
    ignore: ['/launch-app/**/*']
}));

// Proxy all requests starting with /app to the Next.js dev server
app.use(createProxyMiddleware({
    pathFilter: '/app',
    target: 'http://localhost:3000',
    changeOrigin: true,
    ws: true, // proxy websockets for Next.js HMR
    logLevel: 'debug',
}));

app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Unified Web Server is running on port ${PORT}!`);
    console.log(`======================================================\n`);
    console.log(`🌐 MAIN WEBSITE (Landing Page): http://localhost${PORT === 80 ? '' : `:${PORT}`}/`);
    console.log(`💻 DASHBOARD APP (Next.js):     http://localhost${PORT === 80 ? '' : `:${PORT}`}/app`);
    console.log(`\nIf you have a domain pointing to this server, access it via your domain name!`);
});
