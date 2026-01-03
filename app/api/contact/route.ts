import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json();

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Log the submission (you can add email service later)
        console.log('Contact form submission:', {
            name,
            email,
            message,
            timestamp: new Date().toISOString()
        });
        
        return NextResponse.json({ 
            success: true,
            message: 'Message received successfully! We will get back to you soon.'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
