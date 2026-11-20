import type { IconProps } from '@/components/landing/icons/types'

export let CodeIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="m8 8-4 4 4 4m8-8 4 4-4 4m-2-11-4 14" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
