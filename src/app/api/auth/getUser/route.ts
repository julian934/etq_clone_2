import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function GET(request:NextRequest){
      const body=await request.nextUrl.searchParams;
      const username=await body.get('username');
      console.log(username)
    try {
        const mongo=await new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`);
        await mongo.connect();
        if(mongo){
            const currUser=await mongo.db('users').collection('the_magisters_corner_users').aggregate([
                {
                    "$match":{username:username}
                }
            ]).toArray()
            console.log('current user: ', JSON.stringify(currUser))

            const currData=currUser.reverse()
            console.log('curr user: ', currData)
             await mongo.close();
            return NextResponse.json({data:currData[0]});
        }
        return NextResponse.json({message:'Could not connect to database...'})
    } catch (error) {
        console.error("error:", error)
        return NextResponse.json({error:error},{status:500})
    }

}