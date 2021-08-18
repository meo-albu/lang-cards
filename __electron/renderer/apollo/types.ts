export interface Title {
  english: string
  romanian: string
}

export interface Translation {
  english: string
  romanian: string
}

export interface Word {
  id: string
  german: string
  translations: Translation
}

export interface Category {
  title: Title
  slug: string
  words: Word[]
}