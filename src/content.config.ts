import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const entrySchema = z.object({
  title: z.string(),
  subcategory: z.string(),
  skill_level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  we_use_this: z.boolean().default(false),
  related: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
})

export type EntryFrontmatter = z.infer<typeof entrySchema>

export const collections = {
  'creative-code': defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/creative-code' }), schema: entrySchema }),
  display:         defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/display' }),        schema: entrySchema }),
  'av-tools':      defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/av-tools' }),       schema: entrySchema }),
  physical:        defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/physical' }),       schema: entrySchema }),
  sensors:         defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/sensors' }),        schema: entrySchema }),
  'ai-tools':      defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/ai-tools' }),       schema: entrySchema }),
}
