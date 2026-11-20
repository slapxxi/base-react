import { CodeIcon, FeatherIcon, LayersIcon, MoonIcon, PaletteIcon, ShieldIcon } from '@/components/landing/icons'

export let navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'Community', href: '#community' },
  { label: 'Docs', href: '#docs' },
]

export let features = [
  {
    title: 'Composable primitives',
    description: 'Start with accessible building blocks and compose them into your own design language.',
    icon: LayersIcon,
  },
  {
    title: 'Design tokens',
    description: 'A consistent scale for color, spacing, and typography that is effortless to extend.',
    icon: PaletteIcon,
  },
  {
    title: 'Dark mode ready',
    description: 'Every component adapts to light and dark themes without any extra configuration.',
    icon: MoonIcon,
  },
  {
    title: 'Tiny footprint',
    description: 'Tree-shakeable modules keep your bundle lean without sacrificing functionality.',
    icon: FeatherIcon,
  },
  {
    title: 'Accessible by default',
    description: 'Keyboard navigation, focus states, and ARIA attributes are built into every piece.',
    icon: ShieldIcon,
  },
  {
    title: 'TypeScript first',
    description: 'Thoughtful types give you useful autocomplete and catch mistakes before they ship.',
    icon: CodeIcon,
  },
]

export let trustedBy = ['Northwind', 'Acme Co', 'Globex', 'Initech', 'Umbrella']

export let installCommand = 'npm install orbit-ui'

export let primaryButton =
  'inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

export let secondaryButton =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
