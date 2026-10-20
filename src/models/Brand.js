/** Modèle : une marque de téléphones. */
export class Brand {
  constructor({ id, name, color = '#4F46E5', country = '', tagline = '' }) {
    if (!id || !name) throw new Error('Brand: "id" et "name" sont obligatoires')
    this.id = id
    this.name = name
    this.color = color
    this.country = country
    this.tagline = tagline
  }

  get initials() {
    return this.name.replace(/[^A-Za-z0-9 ]/g, '').split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
  }
}
