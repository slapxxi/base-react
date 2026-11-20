import { GridIcon, SettingsIcon, UsersIcon } from '@/components/admin/icons'

export let links = [
  { to: '/admin', label: 'Overview', icon: GridIcon, end: true },
  { to: '/admin/users', label: 'Users', icon: UsersIcon, end: false },
  { to: '/admin/settings', label: 'Settings', icon: SettingsIcon, end: false },
]
