import type { IconProps } from '@/components/landing/icons/types'

export let LayersIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" strokeLinejoin="round" />
    <path d="m3 12 9 5 9-5M3 16l9 5 9-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
