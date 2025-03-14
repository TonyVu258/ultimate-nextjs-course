import mongoose from "mongoose";
import slugify from "slugify";
import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
import { Account, User } from "@/database";
import { APIErrorResponse } from "@/types/global";
import { SignInWithOAuthSchema } from "@/lib/validations";
import { ValidationError } from "@/lib/http-errors";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { provider, providerAccountId, user } = await request.json();

    await dbConnect();

    const session = await mongoose.startSession(); // Start a session
    session.startTransaction(); // Start a transaction

    try {
        const validatedData = SignInWithOAuthSchema.safeParse({
            provider,providerAccountId, user
        });

        if(!validatedData.success) throw new ValidationError(validatedData.error.flatten().fieldErrors);

        const { name, username, email, image } = user;

        const slugifiedUsername = slugify(username, {
            lower:true,
            strict:true,
            trim:true
        });

        let existingUser = await User.findOne({ email }).session(session);

        if(!existingUser) {
            [existingUser] = await User.create(
                [
                    {
                    name, username: slugifiedUsername, email, image
                }],
                { session });
        }else {
            const updatedData: {name?: string; image?: string} = {};

            if (existingUser.name !== name) updatedData.name = name;
            if (existingUser.image !== image) updatedData.image = image;

            if (Object.keys(updatedData).length > 0) {  
                await User.updateOne(
                    { _id: existingUser._id },
                    { $set: updatedData }).session(session);
            }
        }

        const existingAccount = await Account.findOne({ 
            userId: existingUser._id,
            provider,
            providerAccountId
         }).session(session);

        if(!existingAccount) {
            await Account.create([
                {
                    userId: existingUser._id,
                    name,
                    image,
                    provider,
                    providerAccountId
                }
            ], { session });
        }

        await session.commitTransaction();

        return NextResponse.json({ success: true, data: existingUser }, { status: 200 });
    }catch(e :unknown){
        await session.abortTransaction();
        return handleError(e, "api") as APIErrorResponse;
    }finally{
        session.endSession();
    }
}