import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Production domain: https://shivommishraa.vercel.app
// Vercel build par VERCEL_PROJECT_PRODUCTION_URL automatic milta hai,
// warna SITE_URL env var, warna ye default.
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://shivommishraa.vercel.app")
).replace(/\/+$/, "");

const sitemapRoutes = [
  { path: "/", priority: "1.0", frequency: "monthly" },
  { path: "/projects", priority: "0.9", frequency: "monthly" },
  { path: "/about", priority: "0.8", frequency: "yearly" },
  { path: "/contact", priority: "0.8", frequency: "yearly" },
  { path: "/beyond-code", priority: "0.7", frequency: "yearly" },
];

function buildSitemap(base) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = sitemapRoutes
    .map(
      ({ path: route, priority, frequency }) => `  <url>
    <loc>${base}${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${frequency}</changefreq>
    <priority>${priority}</priority>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobots(base) {
  return `User-agent: *
Allow: /

Sitemap: ${base}/sitemap.xml
`;
}

function seoPlugin(base) {
  return {
    name: "seo-sitemap-robots",
    transformIndexHtml(html) {
      return html.replaceAll("%SITE_URL%", base);
    },
    closeBundle() {
      const outDir = path.resolve("dist");
      if (!fs.existsSync(outDir)) return;
      fs.writeFileSync(path.join(outDir, "sitemap.xml"), buildSitemap(base), "utf8");
      fs.writeFileSync(path.join(outDir, "robots.txt"), buildRobots(base), "utf8");
    },
  };
}

export default defineConfig({
  plugins: [react(), seoPlugin(siteUrl)],
});
