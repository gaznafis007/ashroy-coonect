import { connectDB } from "@/lib/connectDB";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"

const { default: NextAuth } = require("next-auth");

const handler = NextAuth({
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60
    },
    providers:[
        CredentialsProvider({
            credentials:{
                email: {},
                password: {}
            },
            async authorize(credentials){
                const {email, password} = credentials;
                if(!email || !password){
                    return null
                }else{
                    const db = await connectDB();
                    const userCollection = await db.collection('user');
                    const user = userCollection.findOne({email: email});
                    if(!user){
                        return null;
                    }else{
                        if(password == user?.password){
                            return user
                        }
                    }
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn (user, account){
        if(account.provider == 'google'){
            const db = await connectDB();
            const userCollection = await db.collection('user');
            const registeredUser = await userCollection.findOne({email: user?.email});
            if(registeredUser){
                return user
            }else{
                const res = await userCollection.insertOne(user);
                if(res.acknowledged){
                    return user
                }else{
                    return {error: 'please try again'}
                }
            }
        }else{
            return user
        }
        }
    }
})

export {handler as GET, handler as POST}