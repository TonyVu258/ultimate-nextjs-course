import { User } from "@/database";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET() {
   try {
    await dbConnect();

    const users = await User.find();

    return NextResponse.json({ success: true, data: users }, { status: 200 });

   }catch(e){
    return handleError(e, "api") as APIErrorResponse;
   }
}

// Create a new user
export async function POST(request: Request) {
  try {
   await dbConnect();
   const body = await request.json();

   const validatedData = UserSchema.safeParse(body);

   if (!validatedData.success) {
   throw new ValidationError(validatedData.error.flatten().fieldErrors);
   }

   const {email, username} = validatedData.data;

   // Check if a user with the same email or username already exists
   const existingUser = await User.findOne({email});
   if (existingUser) throw new Error("User with this email already exists.");

   // Check if a user with the same email or username already exists
   const existingUsername = await User.findOne({username});
   if (existingUsername) throw new Error("User with this username already exists.");

   const newUser = await User.create(validatedData.data);

   return NextResponse.json({ success: true, data: newUser }, { status: 201 });

  } catch (e) {
    return handleError(e, "api") as APIErrorResponse;
  }
}