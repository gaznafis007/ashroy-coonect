import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server"

export const POST = async(req) =>{
    try{
        const blog = await req.json();
        const db = await connectDB();
        const blogCollection = await db.collection('blogs');
        const result = await blogCollection.insertOne(blog);
        return NextResponse.json(result)
    }catch(err){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}

export const GET = async() =>{
    try{
        const db = await connectDB();
        const blogCollection = await db.collection('blogs');
        const result = await blogCollection.find({}).toArray();
        return NextResponse.json(result)
    }catch(err){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}

export const PUT = async(req) =>{
    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');
    const update = await req.json()
    const db = await connectDB();
    const blogCollection = await db.collection('blogs')
    let query;
    if(!update){
        return NextResponse.json({message: "nothing to update"});
    }
    if(id){
        const updatedDoc = {
            $set:{
                ...update
            }
        }
        query = {_id: new ObjectId(id)}
        const result = await blogCollection.updateOne(query, updatedDoc)
    }
}