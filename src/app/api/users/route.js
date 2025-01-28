import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";

export const GET = async () =>{
    const db = await connectDB();
    const userCollection = await db.collection('user');
    const result = await userCollection.find({}).toArray();
    return NextResponse.json(result)
}