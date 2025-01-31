import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, {params}) =>{
  const {id} = await params;
  const db = await connectDB();
  const eventCollection = await db.collection("events");
  const query = {_id: new ObjectId(id)};
  const result = await eventCollection.findOne(query);
  return NextResponse.json(result)
}
export const DELETE = async (req, { params }) => {
  try {
    const {id} = await params;
    const query = { _id: new ObjectId(id) };
    const db = await connectDB();
    const eventCollection = await db.collection("events");
    const result = eventCollection.deleteOne(query);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

export const PUT = async (req, { params }) => {
  try {
    const event = await req.json();
    if (!event) {
      return NextResponse.json({ message: "nothing to edit" });
    } else {
      const {id} = await params;
      const query = { _id: new ObjectId(id) };
      const db = await connectDB();
      const eventCollection = await db.collection("events");
      const updatedDoc = {
        $set: {
          ...event,
        },
      };
      const result = await eventCollection.updateOne(query, updatedDoc);
      return NextResponse.json(result);
    }
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};
