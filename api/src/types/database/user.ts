import type { Roles } from '../_index';

export interface user {
  id: number
  pseudo: string
  mail: string
  password: string
  avatar_url: string | null
  mail_sub: boolean | null
  role: Roles
  created_at: Date
  updated_at: Date | null
}
