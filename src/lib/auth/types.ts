export type AuthUser = {
  id: string
  email: string
  role: string
  createdAt: string
}

export type AdminOverview = {
  service: string
  users: number
  admins: number
}
