import type { IconProps } from '@/components/landing/icons'

export let LogoutIcon: React.FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
    <path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4" strokeLinecap="round" />
    <path d="M15 8l4 4-4 4m4-4H9" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
