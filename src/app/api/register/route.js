import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) =>{
    const user = await req.json();
    if(!user?.email || !user?.password){
        return NextResponse.json({message: "Please provide email and password"})
    }
    try{
        const db = await connectDB();
        const userCollection = db.collection('user')
        const query = {email: user?.email}
        const registeredUser = await userCollection.findOne(query);
        if(registeredUser){
            return NextResponse.json({message:" user already exist."});
        }else{
            const result = await userCollection.insertOne(user);
            return NextResponse.json(result)
        }
    }catch(error){
        return NextResponse.json({error: 'something went wrong'})
    }

}
export const GET = async (req) =>{
    try{
        const {searchParams} = new URL(req.url);
    const email = searchParams.get('email');
    const db = await connectDB();
    const userCollection = db.collection('user');
    if(!email){
        const result = await userCollection.find({}).toArray();
        return NextResponse.json(result)
    }else{
        const query = {email};
        const result = await userCollection.findOne(query);
        if(!result?._id){
            return NextResponse.json({message: 'no user found!'})
        }
        return NextResponse.json(result)
    }
    }catch(error){
        return NextResponse.json({error:"something went wrong."})
    }
} 