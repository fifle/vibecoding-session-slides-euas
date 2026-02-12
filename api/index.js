// server/index.ts
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express();
var isVercel = process.env.VERCEL === "1";
if (!isVercel) {
  const staticPath = path.resolve(__dirname, "public");
  const indexHtmlPath = path.join(staticPath, "index.html");
  if (fs.existsSync(staticPath) && fs.existsSync(indexHtmlPath)) {
    app.use(express.static(staticPath));
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
}
var index_default = app;
if (!isVercel) {
  const port = process.env.PORT || 3e3;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
export {
  index_default as default
};
