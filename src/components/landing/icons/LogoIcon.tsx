import type { IconProps } from '@/components/landing/icons/types'

export let LogoIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
    <circle cx="12" cy="12" r="3" />
    <ellipse cx="12" cy="12" rx="10" ry="5" transform="rotate(-30 12 12)" />
  </svg>
)
