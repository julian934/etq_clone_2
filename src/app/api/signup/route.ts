import { MongoClient } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'
export async function getData(request:NextRequest){
    const body:any=await request?.body
    const formData=new FormData();
    const username=formData.get('username');
    console.log(username)
    const password=formData.get('password');
    console.log(password);
    const user=await body?.username
    const pass=await body?.password
    const getMongo=await new MongoClient(`mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/`);
    const conn=await getMongo?.connect();
    console.log(getMongo);
    console.log(user);
    console.log(pass);
    const newUserData={
        username:user,
        password:pass,
        userCart:[],
            wishList:[],
            userSettings:[]
    };
    const db=await getMongo.db('users')
    console.log(db);
    if(request.method==='POST'){
        console.log(request)
        const body=await request.json();
        if(body){
           console.log(body)
        }
        let data=body?.data
        const result=db.collection('the_magisters_corner_users')?.insertOne(data);
        return NextResponse.json({
            message:'Data inserted successfully',
            result:result
        })
    }
    await conn?.db('users')?.collection('the_magisters_corner_users')?.insertOne(newUserData);
    getMongo.close();
    return NextResponse.json({data:'User Added'});

}

export {getData as GET, getData as POST}