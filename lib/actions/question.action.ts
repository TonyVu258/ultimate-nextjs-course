"use server";

import { ActionResponse, ErrorResponse, Questions } from "@/types/global";
import { AskQuestionSchema } from "../validations";
import mongoose from "mongoose";
import action from "../handlers/action";
import handleError from "../handlers/error";
import { Question, Tag, TagQuestion } from "@/database";

export async function createQuestion(params: CreateQuestionParams): Promise<ActionResponse<Questions>> {
    const validationResult = await action({
        schema: AskQuestionSchema,
        params,
        authorize: true,
    })

    if(validationResult instanceof Error) {
        return handleError(validationResult) as ErrorResponse;
    }

    const { title, content, tags } = params;
    const userId = validationResult?.session?.user?.id;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const [question] = await Question.create([{title, content, author: userId}], {session});
        if (!question) {
            throw new Error("Question not created");
        }

        const tagIds: mongoose.Types.ObjectId[] = [];
        const tagQuestionDocuments = [];

        for (const tag of tags) {
            const existingTag =  await Tag.findOneAndUpdate(
                {name: { $regex: new RegExp(`^${tag}$`, "i") }},
                {$setOnInsert: {name: tag},$inc: {questions:1}},
                {upsert:true , new:true, session}
            );

            tagIds.push(existingTag._id);
            tagQuestionDocuments.push({
                question: question._id,
                tag: existingTag._id
            });
        }
        await TagQuestion.insertMany(tagQuestionDocuments, {session});

        await Question.findByIdAndUpdate(question._id, {$push: {tags: {$each: tagIds}}}, {session});

        await session.commitTransaction();
        return {success: true, data: JSON.parse(JSON.stringify(question))};
    } catch (e) {
        await session.abortTransaction();
        return handleError(e) as ErrorResponse;
    }finally{
        session.endSession();
    }
}