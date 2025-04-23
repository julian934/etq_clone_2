import axios from 'axios'
import { MongoClient } from 'mongodb'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request:NextRequest){
    const body =await request?.body;
    const formData=new FormData()
    const username=formData.get('username');
    const password=formData.get('password');
    console.log('entered credentials:', username, ' ', password)
    const getMongo=await new MongoClient(`mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/`);
    console.log(getMongo);
    const conn=await getMongo?.connect();
    const newUserData={
        username:username,
        userCart:[],
            wishList:[],
            userSettings:[]
    }
    const coll=await conn?.db('users')?.collection('the_magisters_corner_users')?.findOne({"user.username":"johnsmith@gmail.com"})
    const testPerson=await conn?.db('users')?.collection('the_magisters_corner_users')?.findOne({"user.username":`${body}`})
    return NextResponse.json({data:coll})
}

//export {getData as GET,getData as POST}