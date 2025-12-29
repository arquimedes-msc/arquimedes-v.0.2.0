/**
 * Gerador de sitemap.xml dinâmico
 * Lista todas as páginas públicas do site para indexação no Google
 */

import * as db from "./db";

const BASE_URL = process.env.VITE_APP_URL || "https://arquimedes.manus.space";

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

/**
 * Gera XML do sitemap
 */
function generateSitemapXml(urls: SitemapUrl[]): string {
  const urlsXml = urls
    .map(
      (url) => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ""}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ""}
    ${url.priority !== undefined ? `<priority>${url.priority}</priority>` : ""}
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
}

/**
 * Gera lista de URLs para o sitemap
 */
export async function generateSitemap(): Promise<string> {
  const urls: SitemapUrl[] = [];

  // Página inicial
  urls.push({
    loc: BASE_URL,
    changefreq: "daily",
    priority: 1.0,
  });

  // Páginas estáticas
  urls.push(
    {
      loc: `${BASE_URL}/disciplinas`,
      changefreq: "weekly",
      priority: 0.9,
    },
    {
      loc: `${BASE_URL}/desafio-do-dia`,
      changefreq: "daily",
      priority: 0.8,
    }
  );

  // Disciplinas
  const disciplines = await db.getAllDisciplines();
  for (const discipline of disciplines) {
    urls.push({
      loc: `${BASE_URL}/disciplina/${discipline.slug}`,
      changefreq: "weekly",
      priority: 0.9,
    });

    // Módulos da disciplina
    const modules = await db.getModulesByDiscipline(discipline.id);
    for (const module of modules) {
      urls.push({
        loc: `${BASE_URL}/disciplina/${discipline.slug}/modulo/${module.slug}`,
        changefreq: "weekly",
        priority: 0.8,
      });

      // Páginas do módulo
      const pages = await db.getPagesByModule(module.id);
      for (const page of pages) {
        urls.push({
          loc: `${BASE_URL}/disciplina/${discipline.slug}/modulo/${module.slug}/aula/${page.slug}`,
          lastmod: page.updatedAt?.toISOString().split("T")[0],
          changefreq: "monthly",
          priority: 0.7,
        });
      }
    }
  }

  const blogPosts = await db.getBlogPosts();
  for (const post of blogPosts) {
    urls.push({
      loc: `${BASE_URL}/blog/${post.slug}`,
      lastmod: post.updatedAt?.toISOString().split("T")[0],
      changefreq: "monthly",
      priority: 0.6,
    });
  }

  return generateSitemapXml(urls);
}

/**
 * Gera robots.txt
 */
export function generateRobotsTxt(): string {
  return `# Arquimedes - Plataforma de Educação em Matemática
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

Sitemap: ${BASE_URL}/sitemap.xml
`;
}
