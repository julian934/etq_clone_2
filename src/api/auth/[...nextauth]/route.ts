import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { MongoClient } from "mongodb"
import { NextRequest,NextResponse } from "next/server"


//This is a catch-all route, so it will receive any data passed to the auth folder at all. 
//Access database for authorized users and passs the information here. If valid, session will be created and token will be given.
const db=new MongoClient(`mongodb+srv://julian:Kratos155@m0db.rkibr.mongodb.net/`) //MongoDB Integration
const handler = NextAuth({
    
    providers:[
        CredentialsProvider({ // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
              // Add logic here to look up the user from the credentials supplied
              let user:any = { id: "1", name: "J Smith", email: "jsmith@example.com" }
              const conn=await db.connect();
              console.log(conn)
              const coll=await conn?.db('users')?.collection('gam3rs')?.findOne({"user.username":"johnsmith@gmail.com"})
              console.log(coll)
              const newUser=await {
                id:coll?._id,
                name:coll?.user?.username,
                email:coll?.user?.username
              }   
              if (user && newUser) {
                // Any object returned will be saved in `user` property of the JWT
                user=newUser
                return user
              } else {
                // If you return null then an error will be displayed advising the user to check their details.
                return null
        
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
              }
            }}),
        GoogleProvider({
            clientId:'clientID data',
            clientSecret:'client secret data',
        })
    ],
    callbacks:{
        async session({session,token,user}){
            return session
        }
    }
})

export {handler as GET, handler as POST}