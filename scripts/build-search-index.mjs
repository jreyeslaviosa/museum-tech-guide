import { readdir, readFile, writeFile } from 'fs/promises'
import { join, basename, extname, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const contentDir = join(__dirname, '../src/content')
const distDir    = join(__dirname, '../dist')

const CATEGORIES = ['creative-code', 'display', 'av-tools', 'physical', 'sensors', 'ai-tools']

// Minimal frontmatter parser (no extra deps)
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/s)
  if (!match) return { fm: {}, body: raw }
  const fmLines = match[1].split('\n')
  const fm = {}
  for (const line of fmLines) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const val = line.slice(colon + 1).trim()
    if (val.startsWith('[')) {
      fm[key] = val.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean)
    } else {
      fm[key] = val.replace(/^['"]|['"]$/g, '')
    }
  }
  return { fm, body: match[2] }
}

function stripMarkdown(text) {
  return text
    .replace(/#{1,6}\s+/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

async function getFiles(dir) {
  try {
    const files = await readdir(dir)
    return files.filter(f => extname(f) === '.md').map(f => join(dir, f))
  } catch { return [] }
}

async function build() {
  const index = []
  for (const cat of CATEGORIES) {
    for (const file of await getFiles(join(contentDir, cat))) {
      const raw = await readFile(file, 'utf8')
      const { fm, body } = parseFrontmatter(raw)
      index.push({
        slug:        basename(file, '.md'),
        category:    cat,
        title:       fm.title ?? '',
        subcategory: fm.subcategory ?? '',
        body:        stripMarkdown(body),
        tags:        fm.tags ?? [],
      })
    }
  }
  await writeFile(join(distDir, 'search-index.json'), JSON.stringify(index))
  console.log(`[search-index] ${index.length} entries → dist/search-index.json`)
}

build().catch(err => { console.error('[search-index] error:', err); process.exit(1) })
