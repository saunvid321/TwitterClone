import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import bodyParser from 'body-parser';
import { prismaClient } from '../clients/db/index';

export async function initServer() {
    const app=express();

 

    app.use(bodyParser.json());
    const graphqlserver = new ApolloServer({
        typeDefs: `
            type Query{
                sayHello:String
            }
        `,
        resolvers: {
            Query:{
                sayHello: ()=> `hello from Graphql Server`,
            },
        },
      });
    
      await graphqlserver.start();

      app.use('/graphql', expressMiddleware(graphqlserver));

      return app;
    
}