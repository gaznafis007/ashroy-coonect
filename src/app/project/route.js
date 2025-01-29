import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server"

export const POST = async ({req}) =>{
    try{
        const project = await req.json();
        if(!project){
            return NextResponse.json({message: 'no project to add'})
        }else{
            const db = await connectDB();
            const projectCollection = await db.collection('projects');
            const result = await projectCollection.insertOne(project);
            return NextResponse.json(result)
        }
    }catch(err){
        return NextResponse.json({error: err.message},{status: 500})
    }
}

export const GET = async () =>{
    try{
        const db = await connectDB();
        const projectCollection = db.collection('projects');
        let query = {};
        const result = await projectCollection.find(query).toArray();
        return NextResponse.json(result)
    }catch(error){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}