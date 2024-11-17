import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // Parse the request body
    const body = await request.json();
    const question: string = body.query;

    try {
        // Make a POST request to your Koyeb backend
        const res = await fetch('christian-shina-anna-ai-5bf87881.koyeb.app/process', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                response: question,  // Adjust based on your backend's expected input
            }),
        });

        // Handle the response
        if (!res.ok) {
            throw new Error(`Error from Koyeb backend: ${res.statusText}`);
        }

        const data = await res.json();


        // Return the response to the client
        return NextResponse.json({ role: "assistant", content: data.response[data.response.length - 1].content });
    } catch (error) {
        console.error('Error calling Koyeb backend:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}