import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import bodyParser from 'body-parser';
// import { prismaClient } from '../clients/db/index';
import { User } from './user';
import {Tweet} from './tweets'
import cors from 'cors';
import JWTservice from '../services/jwt';


export async function initServer() {
    const app=express();

 
    app.use(cors());
    app.use(bodyParser.json());
    const graphqlserver = new ApolloServer({
        typeDefs: `
            ${User.types}
            ${Tweet.types}
            type Query{
                ${User.queries}
            }
            

        `,
        resolvers: {
            Query:{
               ...User.resolvers.queries,
            },
            // Mutation:{
            //     ...Tweet.resolvers.mutations,
            // }
        },
      });
    
      await graphqlserver.start();

      app.use('/graphql', expressMiddleware(graphqlserver, {
        context:async({req,res})=>{
            return {
                user: req.headers.authorization
                ? JWTservice.decodeToken(req.headers.authorization):
                undefined,
            }
        }

      }))



      return app;
    
}