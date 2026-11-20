import type { IconProps } from '@/components/landing/icons/types'

export let FeatherIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M20 4c-8 0-14 4-14 11v5h5c7 0 11-6 11-14v-2h-2Z" strokeLinejoin="round" />
    <path d="M5 20 17 8M9 14h5" strokeLinecap="round" />
  </svg>
)
