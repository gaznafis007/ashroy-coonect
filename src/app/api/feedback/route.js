import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server"

export const POST = async(req) =>{
    try{
        const feedback = await req.json();
        const db = await connectDB();
        const feedbackCollection = await db.collection('feedbacks');
        const result = await feedbackCollection.insertOne(feedback);
        return NextResponse.json(result)
    }catch(err){
        return NextResponse.json({error: err.message}, {status:500})
    }
}
export const GET = async() =>{
    try{
        const db = await connectDB();
        const feedbackCollection = await db.collection('feedbacks');
        const result = await feedbackCollection.find({}).toArray();
        return NextResponse.json(result)
    }catch(err){
        return NextResponse.json({error: err.message}, {status:500})
    }
}