import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import { AIAnswerSchema } from "@/lib/validations";
import { APIErrorResponse } from "@/types/global";
import {openai} from "@ai-sdk/openai";
import { generateText } from "ai";
import { NextResponse } from "next/server";

const API_KEY = process.env.DEEPSEEK_API_KEY || "";
const DEEPSEEK_API_URL  = process.env.DEEPSEEK_API_URL || "";
export async function POST(req: Request) {
    const { question, content, userAnswer } = await req.json();
    try {
        const validatedData = AIAnswerSchema.safeParse({ question, content });
        if (!validatedData.success) {
            throw new ValidationError(validatedData.error.flatten().fieldErrors);
        }
        const {text} = await generateText({
            model: openai('gpt-3.5-turbo'),
            prompt: `Generate a markdown-formatted response to the following question: "${question}".  
      
            Consider the provided context:  
            **Context:** ${content}  
            
            Also, prioritize and incorporate the user's answer when formulating your response:  
            **User's Answer:** ${userAnswer}  
            
            Prioritize the user's answer only if it's correct. If it's incomplete or incorrect, improve or correct it while keeping the response concise and to the point. 
            Provide the final answer in markdown format.`,
            system: "You are a helpful assistant that provides informative responses in markdown format. Use appropriate markdown syntax for headings, lists, code blocks, and emphasis where necessary. For code blocks, use short-form smaller case language identifiers (e.g., 'js' for JavaScript, 'py' for Python, 'ts' for TypeScript, 'html' for HTML, 'css' for CSS, etc.).",
        });

        return NextResponse.json({ success: true, data: text }, { status: 200 });
        // if(!DEEPSEEK_API_URL || !API_KEY) throw new Error("Deepseek API key or URL not found.");

        // const response = await fetch(DEEPSEEK_API_URL, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${API_KEY}`,
        //     },
        //     body: JSON.stringify({
        //         model: "deepseek-chat", // Use "deepseek-coder" for code-related tasks
        //         messages: [
        //             {
        //                 role: "system",
        //                 content: "You are a helpful assistant that provides informative responses in markdown format. Use appropriate markdown syntax for headings, lists, code blocks, and emphasis where necessary. For code blocks, use short-form smaller case language identifiers (e.g., 'js' for JavaScript, 'py' for Python, 'ts' for TypeScript, 'html' for HTML, 'css' for CSS, etc.).",
        //             },
        //             {
        //                 role: "user",
        //                 content: `Generate a markdown response to: ${question}. Use the provided content: ${content}`,
        //             },
        //         ],
        //     }),
        // });

        // if (!response.ok) {
        //     throw new Error(`DeepSeek API error: ${response.statusText}`);
        // }

        // const data = await response.json();
        // return NextResponse.json({ success: true, data: data.choices[0].message.content }, { status: 200 });
    }catch(e){
        return handleError(e, "api") as APIErrorResponse;
    }
}