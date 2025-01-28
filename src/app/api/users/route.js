import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";

export const GET = async (req) =>{
    let query;
    const {searchParams} = new URL(req.url);
    const email = searchParams.get('email');
    const db = await connectDB();
    const userCollection = await db.collection('user');
    if(email){
        query = {email: email}
        const result = await userCollection.findOne(query);
        return NextResponse.json(result)
    }
    const result = await userCollection.find().toArray();
    return NextResponse.json(result)
}

export const PUT = async (req) =>{
    try {
        const {searchParams} = new URL(req.url)
        // console.log(searchParams, "result")
        const email = searchParams.get('email');
        // console.log(email, "email")
        if(!email){
            return NextResponse.json({error: "No email Provided"}, {status: 404})
        }
        else{
            const db = await connectDB();
            const userCollection = await db.collection('user');
            const query = {email: email};
            const targetUser = await userCollection.findOne(query);
            if(!targetUser?._id){
                return NextResponse.json({message: "no user found"}, {status: 404, statusText: "not found"})
            }
            const user = await req.json();
            const updatedData = {
                $set:{
                    ...user
                }
            }
            const result = await userCollection.updateOne(query, updatedData);
            return NextResponse.json(result)
        }

    }
    catch(err){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}