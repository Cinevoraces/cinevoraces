export interface dbMovie {
  id: number
  french_title: string
  original_title: string
  poster_url: string
  directors: string[]
  release_date: Date
  runtime: number
  casting: string[]
  presentation: string
  is_published: boolean | null
  publishing_date: Date
  user_id: number
  season_id: number
  created_at: Date
  updated_at: Date | null
}
 
