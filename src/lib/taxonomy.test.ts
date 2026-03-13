import { describe, it, expect, vi } from 'vitest'
import {
  buildTree,
  parseHash,
  serializeHash,
  buildEntryId,
  resolveRelated,
} from './taxonomy'
import type { EntryMeta } from './taxonomy'

const make = (overrides: Partial<EntryMeta> = {}): EntryMeta => ({
  slug: 'test',
  category: 'display',
  title: 'Test',
  subcategory: 'Sub A',
  normalizedSubcategory: 'sub a',
  skill_level: 'beginner',
  we_use_this: false,
  related: [],
  tags: [],
  ...overrides,
})

describe('buildTree', () => {
  it('returns [] for no entries', () => {
    expect(buildTree([])).toEqual([])
  })

  it('groups entries by category', () => {
    const entries = [
      make({ category: 'display', slug: 'a' }),
      make({ category: 'light',   slug: 'b' }),
    ]
    const tree = buildTree(entries)
    expect(tree).toHaveLength(2)
    expect(tree[0].category).toBe('display')
    expect(tree[1].category).toBe('light')
  })

  it('groups entries into subcategories within a category', () => {
    const entries = [
      make({ slug: 'a', subcategory: 'LED Systems',  normalizedSubcategory: 'led systems' }),
      make({ slug: 'b', subcategory: 'Projection',   normalizedSubcategory: 'projection' }),
      make({ slug: 'c', subcategory: 'LED Systems',  normalizedSubcategory: 'led systems' }),
    ]
    const tree = buildTree(entries)
    expect(tree[0].subcategories).toHaveLength(2)
    const led = tree[0].subcategories.find(s => s.normalizedName === 'led systems')!
    expect(led.entries).toHaveLength(2)
  })

  it('deduplicates subcategories case-insensitively', () => {
    const entries = [
      make({ slug: 'a', subcategory: 'LED Systems', normalizedSubcategory: 'led systems' }),
      make({ slug: 'b', subcategory: 'led systems', normalizedSubcategory: 'led systems' }),
    ]
    const tree = buildTree(entries)
    expect(tree[0].subcategories).toHaveLength(1)
    expect(tree[0].subcategories[0].entries).toHaveLength(2)
  })

  it('omits categories with no entries', () => {
    const entries = [make({ category: 'display' })]
    const tree = buildTree(entries)
    expect(tree).toHaveLength(1)
    expect(tree[0].category).toBe('display')
  })

  it('preserves canonical category order', () => {
    const entries = [
      make({ category: 'interaction', slug: 'i' }),
      make({ category: 'display',     slug: 'd' }),
      make({ category: 'light',       slug: 'l' }),
    ]
    const tree = buildTree(entries)
    expect(tree.map(n => n.category)).toEqual(['display', 'light', 'interaction'])
  })
})

describe('parseHash', () => {
  it('returns null for empty or missing hash', () => {
    expect(parseHash('')).toBeNull()
    expect(parseHash('#')).toBeNull()
  })

  it('returns null for hash with no slash', () => {
    expect(parseHash('#noslash')).toBeNull()
  })

  it('parses a valid category/slug hash', () => {
    expect(parseHash('#display/advatek-pixlite')).toEqual({
      category: 'display',
      slug: 'advatek-pixlite',
    })
  })
})

describe('serializeHash', () => {
  it('produces #category/slug', () => {
    expect(serializeHash('display', 'advatek-pixlite')).toBe('#display/advatek-pixlite')
  })
})

describe('buildEntryId', () => {
  it('produces entry-category-slug', () => {
    expect(buildEntryId('display', 'advatek-pixlite')).toBe('entry-display-advatek-pixlite')
  })
})

describe('resolveRelated', () => {
  const pool: EntryMeta[] = [
    make({ slug: 'artnet',        category: 'light'   }),
    make({ slug: 'touchdesigner', category: 'display' }),
    make({ slug: 'led-strip',     category: 'display' }),
  ]

  it('resolves a bare slug', () => {
    const result = resolveRelated(['artnet'], pool)
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('artnet')
  })

  it('resolves a category/slug qualified ref', () => {
    const result = resolveRelated(['display/touchdesigner'], pool)
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('touchdesigner')
  })

  it('skips unresolved slugs (returns empty, warns)', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const result = resolveRelated(['nonexistent'], pool)
    expect(result).toHaveLength(0)
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })

  it('deduplicates refs', () => {
    const result = resolveRelated(['artnet', 'artnet'], pool)
    expect(result).toHaveLength(1)
  })

  it('throws a build error when a bare slug matches multiple entries in different categories', () => {
    const ambiguous: EntryMeta[] = [
      make({ slug: 'osc', category: 'light' }),
      make({ slug: 'osc', category: 'sound' }),
    ]
    expect(() => resolveRelated(['osc'], ambiguous)).toThrow(/ambiguous/)
  })
})
