import { Category, Word } from "./types"

export const resolvers = {
  
  Query: {
    getCategories: () => {
      try {
        const categories = require('words.json')
        return categories.map(({ title, slug }: Category) => ({
          title,
          slug,
        }));
      } catch (error) {
        console.log(error)
      }
    },
    getWords: (_: any, {slug}: any) => {
      try {
        const categories = require('words.json')
        let words
        categories.map((cat: Category) => cat.slug === slug && (words = cat.words))
        return words
      } catch (error) {
        console.log(error)
      }
    }
  }
}