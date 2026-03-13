import { CATEGORIES } from '../data/categories'
import type { Category } from '../data/categories'

export type { Category }

export type EntryMeta = {
  slug: string
  category: Category
  title: string
  subcategory: string
  normalizedSubcategory: string
  skill_level: 'beginner' | 'intermediate' | 'advanced'
  we_use_this: boolean
  related: string[]
  tags: string[]
}

export type SubcategoryNode = {
  name: string
  normalizedName: string
  entries: EntryMeta[]
}

export type CategoryNode = {
  category: Category
  subcategories: SubcategoryNode[]
}

export type TaxonomyTree = CategoryNode[]

export function buildTree(entries: EntryMeta[]): TaxonomyTree {
  const catMap = new Map<Category, Map<string, SubcategoryNode>>()

  for (const entry of entries) {
    if (!catMap.has(entry.category)) {
      catMap.set(entry.category, new Map())
    }
    const subMap = catMap.get(entry.category)!
    const key = entry.normalizedSubcategory
    if (!subMap.has(key)) {
      subMap.set(key, { name: entry.subcategory, normalizedName: key, entries: [] })
    }
    subMap.get(key)!.entries.push(entry)
  }

  return CATEGORIES
    .filter(cat => catMap.has(cat))
    .map(cat => ({
      category: cat,
      subcategories: Array.from(catMap.get(cat)!.values()),
    }))
}

export function parseHash(hash: string): { category: string; slug: string } | null {
  if (!hash || hash === '#') return null
  const parts = hash.replace(/^#/, '').split('/')
  if (parts.length !== 2 || !parts[0] || !parts[1]) return null
  return { category: parts[0], slug: parts[1] }
}

export function serializeHash(category: string, slug: string): string {
  return `#${category}/${slug}`
}

export function buildEntryId(category: string, slug: string): string {
  return `entry-${category}-${slug}`
}

export function resolveRelated(related: string[], allEntries: EntryMeta[]): EntryMeta[] {
  const seen = new Set<string>()
  const result: EntryMeta[] = []

  for (const ref of related) {
    let match: EntryMeta | undefined

    if (ref.includes('/')) {
      const [cat, slug] = ref.split('/')
      match = allEntries.find(e => e.category === cat && e.slug === slug)
    } else {
      const matches = allEntries.filter(e => e.slug === ref)
      if (matches.length > 1) {
        throw new Error(
          `[taxonomy] ambiguous related slug "${ref}" matches entries in multiple categories: ` +
          matches.map(e => `${e.category}/${e.slug}`).join(', ') +
          '. Use category/slug form to disambiguate.'
        )
      }
      match = matches[0]
    }

    if (!match) {
      console.warn(`[taxonomy] unresolved related slug: "${ref}"`)
      continue
    }

    const key = `${match.category}/${match.slug}`
    if (!seen.has(key)) {
      seen.add(key)
      result.push(match)
    }
  }

  return result
}
