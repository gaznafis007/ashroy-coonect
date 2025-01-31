import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PUT = async (req, {params}) =>{
    try{
        const {id} = await params;
    const query = {_id: new ObjectId(id)}
    const db = await connectDB();
    const projectCollection = await db.collection('projects');
    const project = await req.json();
    console.log(project)
    const updatedDoc = {
        $set:{
            ...project
        }
    }
    const result = await projectCollection.updateOne(query, updatedDoc);
    return NextResponse.json(result)
    }
    catch(err){
        return NextResponse.json({error: err.message}, {status: 500})
    }
}
export const GET = async(req,{params}) =>{
    const id =  params.id;
    const query = {_id: new ObjectId(id)}
    const db = await connectDB();
    const projectCollection = await db.collection('projects');
    const result = projectCollection.findOne(query);
    return NextResponse.json(result)
}
export const DELETE = async(req,{params}) =>{
    const id =  params.id;
    const query = {_id: new ObjectId(id)}
    const db = await connectDB();
    const projectCollection = await db.collection('projects');
    const result = projectCollection.deleteOne(query);
    return NextResponse.json(result)
}