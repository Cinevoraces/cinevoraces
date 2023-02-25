import type { ERoles } from '../enums/_index';

export interface dbUser {
  id: number
  pseudo: string
  mail: string
  password: string
  mail_sub: boolean | null
  role: ERoles
  created_at: Date
  updated_at: Date | null
}
