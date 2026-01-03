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

        // Check if Resend is configured
        if (!process.env.RESEND_API_KEY) {
            console.log('Contact form submission received:', { name, email });
            return NextResponse.json({ 
                success: true,
                message: 'Message received successfully'
            });
        }

        // Dynamically import Resend only if API key is available
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send email using Resend
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'salonisaki2028@gmail.com',
            subject: `Portfolio Contact: ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });
        
        return NextResponse.json({ 
            success: true,
            message: 'Email sent successfully'
        });

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
