import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request:NextRequest){
    const mongo=await new MongoClient(`${process.env.NEXT_PUBLIC_MONGO_DB}`).connect()
      const body=await request.json();
      const updatedData=await body;
      const username = request.nextUrl.searchParams.get("username");
      console.log("curr body: ", body.data.data.data);
      console.log("curr body data: ", body.data);
      console.log("body: ", body)
      

    try {
        if(mongo){
            const updateResult=await mongo.db('users').collection('the_magisters_corner_users').replaceOne({username:username},updatedData.data.data.data)

            return NextResponse.json({
                message:'Data Sent!',
                data:updateResult
            })
        }
        return NextResponse.json({message:'could not connect to database...'},{status:500})

        
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }

}