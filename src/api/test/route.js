import { NextResponse } from "next/server";

export async function GET(request){
   const data={
    testVals:'Data Received'
   }
    // return New Response()
    console.log({testVals:['Data Received']})
    return NextResponse.json(data)
}