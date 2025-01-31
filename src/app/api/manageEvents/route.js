import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const POST = async (req) =>{
    try{
        const event = await req.json();
    if(!event){
        return NextResponse.json({message: "no event inserted"})
    }else{
        const db = await connectDB();
        const eventCollection = await db.collection('events');
        const result = await eventCollection.insertOne(event);
        return NextResponse.json(result)
    }
    }
    catch(err){
        return NextResponse.json({error: err.message}, {status: 500})
    }

}
export const GET = async (req) =>{
    try{
        const {searchParams} = new URL(req.url);
        const title = searchParams.get('title');
        const project = searchParams.get('project')
        let query = {}
        const db = await connectDB();
        const eventCollection = await db.collection('events');
        if(title){
            query = {title: title}
            const result = await eventCollection.findOne(query);
            return NextResponse.json(result);
        }     
        if(project){
            query = {project: project}
            const result = await eventCollection.find(query).toArray();
            return NextResponse.json(result);
        }     
        const result = await eventCollection.find(query).toArray();
        return NextResponse.json(result)
    }catch(err){
        return NextResponse.json({error:err.message}, {status: 500})
    }
}

