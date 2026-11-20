import type { IconProps } from '@/components/landing/icons/types'

export let PaletteIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path
      d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 1.6-3.2 1.8 1.8 0 0 1 1.4-2.8H19a2 2 0 0 0 2-2A9 9 0 0 0 12 3Z"
      strokeLinejoin="round"
    />
    <circle cx="7.5" cy="11" r="1" fill="currentColor" stroke="none" />
    <circle cx="10" cy="7.5" r="1" fill="currentColor" stroke="none" />
    <circle cx="15" cy="8" r="1" fill="currentColor" stroke="none" />
  </svg>
)
