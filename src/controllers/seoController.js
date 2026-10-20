import { shop, fullAddress } from '@/config/shop'

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/)
    el.setAttribute(key, name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

/** Met à jour le titre, la description et les balises de partage de la page. */
export function setPageMeta({ title, description = shop.description, path = '/' } = {}) {
  const fullTitle = title ? `${title} | ${shop.name}` : `${shop.name} — Smartphones neufs & reconditionnés à Yaoundé`
  document.title = fullTitle
  const url = shop.siteUrl.replace(/\/$/, '') + path
  setMeta('meta[name="description"]', 'content', description)
  setMeta('meta[property="og:title"]', 'content', fullTitle)
  setMeta('meta[property="og:description"]', 'content', description)
  setMeta('meta[property="og:url"]', 'content', url)
  let canonical = document.head.querySelector('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.rel = 'canonical'
    document.head.appendChild(canonical)
  }
  canonical.href = url
}

/** Données structurées LocalBusiness (Google) générées depuis la config. */
export function injectLocalBusinessSchema() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'MobilePhoneStore',
    name: shop.name,
    description: shop.description,
    url: shop.siteUrl,
    telephone: `+${shop.phoneInternational}`,
    image: `${shop.siteUrl}/og-image.png`,
    logo: `${shop.siteUrl}/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: shop.address.street,
      addressLocality: shop.address.city,
      addressCountry: shop.address.countryCode
    },
    geo: { '@type': 'GeoCoordinates', latitude: shop.geo.lat, longitude: shop.geo.lng },
    openingHours: shop.openingHours.map((h) => h.schema),
    priceRange: '50 000 – 1 500 000 FCFA',
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`
  }
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(data)
  document.head.appendChild(script)
}
