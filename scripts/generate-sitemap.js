/**
 * Génère public/sitemap.xml et public/robots.txt avant chaque build
 * à partir du catalogue, pour un bon référencement Google.
 * L'URL du site se règle via la variable VITE_SITE_URL (voir .env.example).
 */
import { writeFileSync } from 'node:fs'
import products from '../src/data/products.js'

const site = (process.env.VITE_SITE_URL || 'https://the-smart-boutique.vercel.app').replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)
const pages = ['/', '/telephones', '/marques', '/services', '/a-propos', '/contact', ...products.map((p) => `/telephones/${p.id}`)]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${site}${p}</loc><lastmod>${today}</lastmod><priority>${p === '/' ? '1.0' : p.split('/').length > 2 ? '0.7' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
writeFileSync(new URL('../public/robots.txt', import.meta.url), `User-agent: *\nAllow: /\n\nSitemap: ${site}/sitemap.xml\n`)
console.log(`sitemap.xml : ${pages.length} URL (${site})`)
