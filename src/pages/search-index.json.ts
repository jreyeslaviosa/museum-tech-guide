import type { APIRoute } from 'astro'
import { readdir, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const CATEGORIES = ['creative-code', 'display', 'av-tools', 'physical', 'sensors', 'ai-tools']

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/s)
  if (!match) return { fm: {} as Record<string, unknown>, body: raw }
  const fm: Record<string, unknown> = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const val = line.slice(colon + 1).trim()
    fm[key] = val.startsWith('[')
      ? val.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean)
      : val.replace(/^['"]|['"]$/g, '')
  }
  return { fm, body: match[2] }
}

function stripMarkdown(text: string): string {
  return text
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export const GET: APIRoute = async () => {
  const contentDir = resolve(process.cwd(), 'src/content')
  const index = []

  for (const cat of CATEGORIES) {
    const dir = resolve(contentDir, cat)
    let files: string[]
    try {
      files = (await readdir(dir)).filter(f => f.endsWith('.md'))
    } catch {
      continue
    }
    for (const file of files) {
      const raw = await readFile(resolve(dir, file), 'utf8')
      const { fm, body } = parseFrontmatter(raw)
      index.push({
        slug:        file.replace('.md', ''),
        category:    cat,
        title:       fm.title ?? '',
        subcategory: fm.subcategory ?? '',
        body:        stripMarkdown(body),
        tags:        fm.tags ?? [],
      })
    }
  }

  return new Response(JSON.stringify(index), {
    headers: { 'Content-Type': 'application/json' },
  })
}
