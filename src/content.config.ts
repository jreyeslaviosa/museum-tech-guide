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
  display:     defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/display' }),     schema: entrySchema }),
  light:       defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/light' }),       schema: entrySchema }),
  sound:       defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/sound' }),       schema: entrySchema }),
  physical:    defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/physical' }),    schema: entrySchema }),
  interaction: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/interaction' }), schema: entrySchema }),
}
