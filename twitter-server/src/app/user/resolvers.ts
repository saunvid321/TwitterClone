import axios from 'axios';
import { prismaClient } from '../../clients/db';
import JWTservice from '../../services/jwt';
import { GraphqlContext } from '../../interfaces';

interface GoogleTokenResult{

    iss?: string;
    azp?: string;
    aud?: string;
    sub?: string;
    email: string;
    email_verified?: string;
    nbf?: string;
    picture?: string;
    given_name: string;
    locale?: string;
    iat?: string;
    exp?: string;
    jti?: string;
    alg?: string;
    kid?: string;
    typ?: string;
}

const queries={
    verifyGoogleToken: async(parent:any, {token}:{token:string})=>{
        const googleToken=token;

        const googleOauthURL=new URL('https://oauth2.googleapis.com/tokeninfo')
        googleOauthURL.searchParams.set('id_token',googleToken)
        
        const {data}=await axios.get<GoogleTokenResult>(
            googleOauthURL.toString(),
            {
                responseType:"json",
            }

         );
        
        const user=await prismaClient.user.findUnique({
            where: {email :data.email},
        });

        if(!user){
            await prismaClient.user.create({
                data:{
                    email: data.email,
                    firstName:data.given_name,
                    profileImageURL:data.picture,
                },
            });
        }
        const userInDb=await prismaClient.user.findUnique({ 
            where:{email:data.email}});

        if (!userInDb) throw new Error('User with this email does not exists');
        
        const Usertoken= JWTservice.genrateTokenForUser(userInDb);
        return Usertoken;
    },

    getCurrentUser:async (parent:any, args:any, ctx:GraphqlContext) => {
        return ctx.user;
        
    }
};
export const resolvers={queries};