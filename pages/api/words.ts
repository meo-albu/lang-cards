import type { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "./schemas";
import { resolvers } from "./resolvers";
import { Category } from './schemas/types';

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const startServer = apolloServer.start()

export default async function handler(req: NextApiRequest, res: NextApiResponse<Category>) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await apolloServer.createHandler({
    path: '/api/words',
  })(req, res)
}

export const config = {
  api: {
    bodyParser:  false
  }
}