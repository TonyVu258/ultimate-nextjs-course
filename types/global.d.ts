import { NextResponse } from "next/server"

interface Question {
    question: {
        _id: string,
        title: string,
        description: string,
        tags: Tag[],
        author: Author
        upvotes: number,
        answers: number,
        views: number,
        createdAt: Date
    }
}

interface Tag {
    _id: string,
    name: string,
}

interface Author {
    _id: string,
    name: string,
    image: string
}

interface SearchParams {
    searchParams: Promise<{
      [key:string]:string
    }>
  }

type ActionResponse<T = null> = {
    success: boolean;
    error?: {
        message: string;
        details?: Record<string, string[]>;
    };
    data?: T;
    static?: number;
}

type SuccessResponse<T = null> = ActionResponse<T> & {success: true};
type ErrorResponse = ActionResponse<undefined> & {success: false};

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;