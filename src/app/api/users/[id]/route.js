import { connectDB } from "@/lib/connectDB"
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server"

export const GET = async (req, {params}) =>{
    const id = params.id
    const db = await connectDB();
    const userCollection = await db.collection('user')
    const query = {_id: new ObjectId(id)};
    const result = await userCollection.findOne(query);
    return NextResponse.json(result)
}
export const DELETE = async (req, {params}) =>{
    const id = params.id;
    const db = await connectDB();
    const userCollection = await db.collection('user');
    const query = {_id: new ObjectId(id)}
    const result = await userCollection.deleteOe(query);
    return NextResponse.json(result)
}