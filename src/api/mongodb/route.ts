import axios from 'axios'
import { MongoClient } from 'mongodb'
import { NextResponse, type NextRequest } from 'next/server'

export async function getData(request:NextRequest){
    const getMongo=await new MongoClient(`mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/`);
    console.log(getMongo);
    const conn=await getMongo?.connect();
    const coll=await conn?.db('users')?.collection('gam3rs')?.findOne({"user.username":"johnsmith@gmail.com"})
    return NextResponse.json({data:coll?.json()})
}

export {getData as GET}