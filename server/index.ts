import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// On Vercel, express.static() is ignored - static files are served from public/ directory automatically
// For local development, we need to serve static files manually
const isVercel = process.env.VERCEL === "1";

if (!isVercel) {
  // Local development: serve from dist/public
  const staticPath = path.resolve(__dirname, "public");
  const indexHtmlPath = path.join(staticPath, "index.html");

  if (fs.existsSync(staticPath) && fs.existsSync(indexHtmlPath)) {
    // Serve static files (only works locally, ignored on Vercel)
    app.use(express.static(staticPath));

    // Handle client-side routing - serve index.html for all routes
    app.get("*", (_req, res) => {
      res.sendFile(indexHtmlPath, (err) => {
        if (err) {
          console.error("Error sending index.html:", err);
          res.status(500).send("Error loading application");
        }
      });
    });
  } else {
    console.error(`ERROR: Static files not found at ${staticPath}`);
    app.get("*", (_req, res) => {
      res.status(500).send("Static files not found. Please run 'npm run build' first.");
    });
  }
} else {
  // On Vercel, static files are served automatically from public/ directory via CDN
  // The rewrite rule in vercel.json handles SPA routing by serving index.html
  // This Express app should NOT catch all routes - only handle specific API routes if needed
  // No catch-all route here - let Vercel handle static files and rewrites
}

// Export the app for Vercel (serverless function)
export default app;

// For local development, start the server
if (!isVercel) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
