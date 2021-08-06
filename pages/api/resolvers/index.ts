import { Category } from "../schemas/types";

export const resolvers = {
  Query: {
    getCategories: () => {
      try {
        const categories = require('../../../words.json')
        return categories.map(({ title, words }: Category) => ({
          title,
          words
        }));
      } catch (error) {
        console.log(error)
      }
    }
  }
}