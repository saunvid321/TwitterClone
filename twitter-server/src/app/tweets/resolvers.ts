// import { PrismaClient } from "@prisma/client";
// import { GraphqlContext } from "../../interfaces";
// import { prismaClient } from "../../clients/db";

// interface CreateTweetPayload{
//     content: string;
//     imageURL?: string;
// }

// const mutations={
//     createTweet: async(
//         parent: any,
//         {payload}: {payload:CreateTweetPayload},
//         ctx: GraphqlContext

//     )=>{
//         if (!ctx.user) throw new Error("This user does not exists");

//         const tweet= await prismaClient.tweet.create({
//             data:{
//                 content: payload.content,
//                 imageURL: payload.imageURL,
//                 author: {connect: { id: ctx.user.id}},
//             },
//         });
            
//         },
        
        
    
// };
// export const resolvers={  mutations}