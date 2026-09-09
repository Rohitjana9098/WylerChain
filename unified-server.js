const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 80;
const TARGET = process.env.NEXT_TARGET || 'http://localhost:3000';

// ----------------------------------------------------------------
// Production mirror: www.wylerchain.io (hosted on Vercel) serves
// the Next.js app in launch-app/ directly:
//   /            -> landing page      (launch-app/src/app/page.tsx)
//   /app         -> dashboard         (launch-app/src/app/app/page.tsx)
//   /brandkit.html, /LOGO, /logos...  (launch-app/public)
//
// To make this local server behave 100% identically to production,
// ALL requests are reverse-proxied to the local Next.js server.
//
// Start the Next.js server first:
//   cd launch-app && npm run start    (serves on port 3000)
// ----------------------------------------------------------------
app.use(createProxyMiddleware({
    target: TARGET,
    changeOrigin: true,
    ws: true, // proxy websockets for Next.js HMR in dev
    logLevel: 'warn',
}));

app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`WylerChain local server (production mirror) on port ${PORT}!`);
    console.log(`======================================================\n`);
    console.log(`MAIN WEBSITE:  http://localhost${PORT === 80 ? '' : `:${PORT}`}/`);
    console.log(`DASHBOARD APP: http://localhost${PORT === 80 ? '' : `:${PORT}`}/app`);
    console.log(`\nAll traffic is proxied to the Next.js server at ${TARGET},`);
    console.log(`exactly what Vercel serves at https://www.wylerchain.io`);
});

