import { gql } from '@apollo/client'

export const typeDefs = gql`
  type Title {
    english: String
    romanian: String
  }

  type Translation {
    english: String
    romanian: String
  }

  type Word {
    id: String
    german: String
    translations: Translation
  }
  
  type Category {
    title: Title
    slug: String
    words: [Word]
  }

  type Query {
    getCategories: [Category]
    getWords(slug: String!): [Word]
  }
`