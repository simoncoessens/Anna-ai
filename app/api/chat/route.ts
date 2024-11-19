import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    // Parse the request body
    const body = await request.json();

    try {
        // Make a POST request to your Koyeb backend
        const res = await fetch('https://related-magdalene-anna-ai-20d61a76.koyeb.app/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }); 

        // Handle the response
        if (!res.ok) {
            //throw new Error(`Error from Koyeb backend: ${res.statusText}`);
        }
        const data = await res.json();


        console.log(data)
        // Return the response to the client
        return NextResponse.json({ role: "assistant", content: data.response.output});
    } catch (error) {
        console.error('Error calling Koyeb backend:', error);
        return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
    }
}