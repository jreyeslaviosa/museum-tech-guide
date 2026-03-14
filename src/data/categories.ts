export type Category = 'creative-code' | 'display' | 'av-tools' | 'physical' | 'sensors' | 'ai-tools'

export const CATEGORIES: Category[] = [
  'creative-code', 'display', 'av-tools', 'physical', 'sensors', 'ai-tools',
]

export const CATEGORY_META: Record<Category, { label: string; emoji: string }> = {
  'creative-code': { label: 'Creative Code Frameworks', emoji: '💻' },
  display:         { label: 'Display Tech & Video',     emoji: '🖥️' },
  'av-tools':      { label: 'Professional AV Tools',    emoji: '🎛️' },
  physical:        { label: 'Physical Computing',       emoji: '⚙️' },
  sensors:         { label: 'Sensors & Interaction',    emoji: '👁️' },
  'ai-tools':      { label: 'AI & Machine Learning',    emoji: '🤖' },
}
