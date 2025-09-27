// @ts-nocheck
import React from 'react';

// NOTE: These are simplified email templates using inline styles for maximum compatibility
// across email clients. For more complex designs, libraries like `react-email` provide
// more components and better abstractions.

const containerStyle = {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
    backgroundColor: '#f8fafc',
    padding: '20px',
};

const mainStyle = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '32px',
    maxWidth: '600px',
    margin: '0 auto',
};

const h1Style = {
    color: '#1e293b',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0 0 16px',
};

const pStyle = {
    color: '#475569',
    fontSize: '16px',
    lineHeight: '1.5',
    margin: '0 0 16px',
};

const detailItemStyle = {
    marginBottom: '8px',
};

const footerStyle = {
    color: '#64748b',
    fontSize: '12px',
    textAlign: 'center',
    marginTop: '24px',
};


// Template for the confirmation email sent to the client
interface ClientEmailProps {
    name: string;
    serviceTitle: string;
    date: string;
    time: string;
}

export const ClientConfirmationEmail = ({ name, serviceTitle, date, time }: ClientEmailProps) => (
    <div style={containerStyle}>
        <div style={mainStyle}>
            <h1 style={h1Style}>Your Booking Request is Confirmed</h1>
            <p style={pStyle}>Dear {name},</p>
            <p style={pStyle}>Thank you for your booking request with Relief Psychological Service. We have received your request and will contact you shortly to finalize your appointment details.</p>
            <hr style={{ borderColor: '#e2e8f0', margin: '20px 0' }} />
            <h2 style={{ ...h1Style, fontSize: '20px' }}>Booking Details:</h2>
            <div style={pStyle}>
                <p style={detailItemStyle}><strong>Service:</strong> {serviceTitle}</p>
                <p style={detailItemStyle}><strong>Date:</strong> {date}</p>
                <p style={detailItemStyle}><strong>Time:</strong> {time}</p>
            </div>
            <p style={pStyle}>If you have any questions, please don't hesitate to contact us.</p>
            <p style={pStyle}>Sincerely,<br />The Relief Psychological Service Team</p>
        </div>
        <div style={footerStyle}>
            <p>&copy; {new Date().getFullYear()} Relief Psychological Service. All rights reserved.</p>
        </div>
    </div>
);


// Template for the notification email sent to the admin
interface AdminEmailProps {
    name: string;
    email: string;
    phone: string;
    serviceTitle: string;
    date: string;
    time: string;
    notes: string;
}

export const AdminNotificationEmail = ({ name, email, phone, serviceTitle, date, time, notes }: AdminEmailProps) => (
    <div style={containerStyle}>
        <div style={mainStyle}>
            <h1 style={h1Style}>New Booking Request!</h1>
            <p style={pStyle}>A new booking request has been submitted through the website. Please review the details below and follow up with the client.</p>
            <hr style={{ borderColor: '#e2e8f0', margin: '20px 0' }} />
            <h2 style={{ ...h1Style, fontSize: '20px' }}>Client & Booking Details:</h2>
            <div style={pStyle}>
                <p style={detailItemStyle}><strong>Service:</strong> {serviceTitle}</p>
                <p style={detailItemStyle}><strong>Name:</strong> {name}</p>
                <p style={detailItemStyle}><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p>
                {phone && <p style={detailItemStyle}><strong>Phone:</strong> {phone}</p>}
                <p style={detailItemStyle}><strong>Requested Date:</strong> {date}</p>
                <p style={detailItemStyle}><strong>Requested Time:</strong> {time}</p>
                {notes && (
                    <>
                        <p style={detailItemStyle}><strong>Notes:</strong></p>
                        <p style={{ ...detailItemStyle, paddingLeft: '16px', borderLeft: '2px solid #e2e8f0' }}><em>{notes}</em></p>
                    </>
                )}
            </div>
        </div>
    </div>
);
