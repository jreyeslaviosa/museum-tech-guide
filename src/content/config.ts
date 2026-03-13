import { z, defineCollection } from 'astro:content'

const entrySchema = z.object({
  title: z.string(),
  subcategory: z.string(),
  skill_level: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
  we_use_this: z.boolean().default(false),
  related: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
})

export type EntryFrontmatter = z.infer<typeof entrySchema>

const collection = { type: 'content' as const, schema: entrySchema }

export const collections = {
  display:     defineCollection(collection),
  light:       defineCollection(collection),
  sound:       defineCollection(collection),
  physical:    defineCollection(collection),
  interaction: defineCollection(collection),
}
