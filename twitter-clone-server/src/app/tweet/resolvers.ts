import { Tweet } from "@prisma/client";
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import { prismaClient } from "../../clients/db";
import { GraphqlContext } from "../../intefaces";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


interface CreateTweetPayload {
  content: string;
  imageURL?: string;
}
const s3Client=new S3Client({
  region: "us-west-1",
  credentials: {accessKeyId:"AKIAVDBZSO6BNZTBBFVW", secretAccessKey:"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"},
});

const queries = {
  getAllTweets: () =>
    prismaClient.tweet.findMany({ orderBy: { createdAt: "desc" } }),
  
  getSignedURLForTweet: async(
    parent:any, 
    {imageType, imageName}: {imageType:string, imageName:string},
    ctx:GraphqlContext
  )=>{
    if(!ctx.user || !ctx.user.id) throw new Error("User is not authenticated");

    const allowedTypes=['jpg','jpeg', "png","webp"];

    if(!allowedTypes.includes(imageType)) throw new Error("Image type not supported");

    const putObjectCommand=new PutObjectCommand({
      Bucket: 'saunvid-twitter-dev',
      Key: `/downloads/${ctx.user.id}/tweets/${imageName}-${Date.now()}.${imageType} `,
    });

    const signeUrl=await getSignedUrl(s3Client,putObjectCommand);

    return signeUrl;
    


  },
};

 

const mutations = {
  createTweet: async (
    parent: any,
    { payload }: { payload: CreateTweetPayload },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user) throw new Error("You are not authenticated");
    const tweet = await prismaClient.tweet.create({
      data: {
        content: payload.content,
        imageURL: payload.imageURL,
        author: { connect: { id: ctx.user.id } },
      },
    });

    return tweet;
  },
};

const extraResolvers = {
  Tweet: {
    author: (parent: Tweet) =>
      prismaClient.user.findUnique({ where: { id: parent.authorId } }),
  },
};

export const resolvers = { mutations, extraResolvers, queries,s3Client };
