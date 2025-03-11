export const GET = async () => {
    return new Response('Hello, World!');
}

export const POST = async (request: Request) => {
    const { name } = await request.json();
    return new Response(`Hello, ${name}!`);
}