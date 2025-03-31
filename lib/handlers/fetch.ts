import { ActionResponse } from "@/types/global";
import { RequestError } from "../http-errors";
import logger from "../logger";
import handleError from "./error";

interface FetchOptions extends RequestInit {
    // Add any custom options here
    timeout?: number;
}

function isError(e: unknown): e is Error {
    return e instanceof Error;
}

export async function fetchHandler<T>(
    url: string,
    options: FetchOptions = {}
): Promise<ActionResponse<T>>{
    const { timeout = 100000, headers: customHeaders = {}, ...restOptions} = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const defaultHeader: HeadersInit = {
        "Content-Type": "application/json",
        Accept: "application/json",
    }

    const headers: HeadersInit = {...defaultHeader, ...customHeaders};
    const config: RequestInit = {...restOptions, headers, signal: controller.signal};

    try {
        const response = await fetch(url, config);
        clearTimeout(id);
        if(!response.ok){
            throw new RequestError(response.status, `HTTP error: ${response.status}`);
        }

        return await response.json();
    } catch (e) {
       const error = isError(e) ? e : new Error("Unknown error");

       if(error.name === "AbortError"){
           logger.warn(`Request to ${url} timed out after ${timeout}ms`);
       }else{
            logger.error(`Error fetching ${url}: ${error.message}`);
       }

       return handleError(error) as ActionResponse<T>;
    }
}