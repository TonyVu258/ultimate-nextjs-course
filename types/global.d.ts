import { NextResponse } from "next/server"

interface Questions {
  _id: string;
  title: string;
  content: string;
  tags: Tag[];
  author: Author;
  createdAt: Date;
  upvotes: number;
  downvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}

interface Tag {
  _id: string;
  name: string;
  questions?: number;
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
    data?: T;
    error?: {
      message: string;
      details?: Record<string, string[]>;
    };
    status?: number;
  };

type SuccessResponse<T = null> = ActionResponse<T> & {success: true};
type ErrorResponse = ActionResponse<undefined> & {success: false};

type APIErrorResponse = NextResponse<ErrorResponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorResponse>;

interface RouteParams {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}