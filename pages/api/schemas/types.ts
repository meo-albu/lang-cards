export interface Title {
  english: String
  romanian: String
}

export interface Translation {
  english: String
  romanian: String
}

export interface Word {
  id: String
  german: String
  translations: Translation
}

export interface Category {
  title: Title
  words: Word[]
}