export type Category = 'display' | 'light' | 'sound' | 'physical' | 'interaction'

export const CATEGORIES: Category[] = [
  'display', 'light', 'sound', 'physical', 'interaction',
]

export const CATEGORY_META: Record<Category, { label: string; emoji: string }> = {
  display:     { label: 'Display',     emoji: '🖥️' },
  light:       { label: 'Light',       emoji: '💡' },
  sound:       { label: 'Sound',       emoji: '🔊' },
  physical:    { label: 'Physical',    emoji: '⚙️' },
  interaction: { label: 'Interaction', emoji: '🤝' },
}
