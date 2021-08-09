import { Category } from "./types"

export const resolvers = {
  
  Query: {
    getCategories: () => {
      try {
        const categories = require('words.json')
        return categories.map(({ title, slug, words }: Category) => ({
          title,
          slug,
          words
        }));
      } catch (error) {
        console.log(error)
      }
    }
  }
}