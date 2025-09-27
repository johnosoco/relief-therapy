// @ts-nocheck
/**
 * NOTE: This is a server-side function and should be deployed in a serverless environment
 * (e.g., Vercel Functions, Netlify Functions, Google Cloud Functions).
 * 
 * To deploy, you will need to:
 * 1. Install `resend` and `react-email` as dependencies: `npm install resend react-email`
 * 2. Set up environment variables for RESEND_API_KEY and ADMIN_EMAIL in your hosting provider.
 */
import { Resend } from 'resend';
import { render } from 'react-email';
import { ClientConfirmationEmail, AdminNotificationEmail } from '../components/EmailTemplates';
import { type FormData } from '../components/BookingModal';

interface RequestBody {
    formData: FormData;
    serviceTitle: string;
}

// This is a mock of how a serverless function handler might look.
// The actual implementation will vary slightly based on the provider (Vercel, Netlify, etc.).
export default async function handler(req: Request, res: Response) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const { formData, serviceTitle } = await (req.json() as Promise<RequestBody>);
        const { name, email, phone, date, time, notes, sendEmailCopy } = formData;

        // Basic validation
        if (!name || !email || !date || !time || !serviceTitle) {
            return new Response(JSON.stringify({ message: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
        // IMPORTANT: In a real app, process.env.RESEND_API_KEY would be securely set in your serverless environment.
        const resend = new Resend(process.env.RESEND_API_KEY);
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';

        const emailPromises = [];

        // 1. Send notification email to admin
        emailPromises.push(
            resend.emails.send({
                from: 'Booking <onboarding@resend.dev>', // Must be a verified domain in Resend
                to: [adminEmail],
                subject: `New Booking Request: ${serviceTitle}`,
                html: render(AdminNotificationEmail({ name, email, phone, date, time, notes, serviceTitle })),
            })
        );
        
        // 2. Send confirmation email to client if they opted in
        if (sendEmailCopy) {
            emailPromises.push(
                resend.emails.send({
                    from: 'Relief Psychological Service <onboarding@resend.dev>',
                    to: [email],
                    subject: 'Your Booking Request has been Received',
                    html: render(ClientConfirmationEmail({ name, date, time, serviceTitle })),
                })
            );
        }

        await Promise.all(emailPromises);

        return new Response(JSON.stringify({ message: 'Emails sent successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error sending email:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return new Response(JSON.stringify({ message: 'Failed to send email', error: errorMessage }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
