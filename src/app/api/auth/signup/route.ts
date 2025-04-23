import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request:NextRequest){
     
    const body=request.nextUrl.searchParams
    const username=body.get('username');
    const password=body.get('password')
    try {
        const mongo=await new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`)
        if(mongo!=undefined){
           const newUser={
            username:username,
            password:password,
            userCart:[],
            wishList:[],
            userSettings:[]
           }
            const postUser=await mongo.db('users').collection('the_magisters_corner_users').insertOne(newUser)

            return NextResponse.json({data:postUser});
        }
        return NextResponse.json({error:'Database not connected'},{status:500})
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }

}
