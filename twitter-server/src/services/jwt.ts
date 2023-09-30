import JWT from 'jsonwebtoken';
import { prismaClient } from '../clients/db';
import { User } from '@prisma/client';
import { JWTuser } from '../interfaces';

const JWt_SECRET="$uper@1234";

class JWTservice{
    public static genrateTokenForUser(user: User){
     
        const payload={
            id:user?.id,
            email:user?.email,
        };
        const token=JWT.sign(payload,JWt_SECRET);
        return token;
    }
    public static decodeToken(token:string){
        try {
            return JWT.verify(token,JWt_SECRET) as JWTuser; 
        } catch (error) {
            return null;
        }
        
    }
}
export default JWTservice;