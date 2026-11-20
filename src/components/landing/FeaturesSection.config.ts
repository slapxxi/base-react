import { CodeIcon, FeatherIcon, LayersIcon, MoonIcon, PaletteIcon, ShieldIcon } from '@/components/landing/icons'

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
