const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASSWORD // Your email password or app password
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, company, message } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                error: 'Name, email, and message are required'
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid email format'
            });
        }

        // Prepare email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL, // Your receiving email
            subject: `🔒 New Security Inquiry from ${name}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: 'Courier New', monospace;
                            background-color: #0a0a0a;
                            color: #ffffff;
                            padding: 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background: #1a1a1a;
                            border: 2px solid #ff0000;
                            padding: 30px;
                            box-shadow: 0 0 30px rgba(255, 0, 0, 0.3);
                        }
                        .header {
                            text-align: center;
                            color: #ff0000;
                            font-size: 24px;
                            font-weight: bold;
                            margin-bottom: 30px;
                            text-shadow: 0 0 10px #ff0000;
                        }
                        .field {
                            margin-bottom: 20px;
                            padding-bottom: 20px;
                            border-bottom: 1px solid rgba(255, 0, 0, 0.3);
                        }
                        .label {
                            color: #ff0000;
                            font-size: 12px;
                            text-transform: uppercase;
                            letter-spacing: 2px;
                            margin-bottom: 8px;
                        }
                        .value {
                            color: #ffffff;
                            font-size: 16px;
                            line-height: 1.6;
                        }
                        .message-box {
                            background: #0a0a0a;
                            border: 1px solid #ff0000;
                            padding: 20px;
                            margin-top: 10px;
                            white-space: pre-wrap;
                        }
                        .footer {
                            text-align: center;
                            color: #888;
                            font-size: 12px;
                            margin-top: 30px;
                            padding-top: 20px;
                            border-top: 1px solid rgba(255, 0, 0, 0.3);
                        }
                        .timestamp {
                            color: #ff0000;
                            font-size: 11px;
                            margin-top: 10px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            🛡️ CYBER SECURITY INQUIRY
                        </div>
                        
                        <div class="field">
                            <div class="label">Contact Name</div>
                            <div class="value">${name}</div>
                        </div>
                        
                        <div class="field">
                            <div class="label">Email Address</div>
                            <div class="value">${email}</div>
                        </div>
                        
                        ${company ? `
                        <div class="field">
                            <div class="label">Company / Organization</div>
                            <div class="value">${company}</div>
                        </div>
                        ` : ''}
                        
                        <div class="field">
                            <div class="label">Security Requirements</div>
                            <div class="message-box">${message}</div>
                        </div>
                        
                        <div class="footer">
                            <div>© 2026 Cyber Defense Systems</div>
                            <div class="timestamp">Received: ${new Date().toLocaleString()}</div>
                        </div>
                    </div>
                </body>
                </html>
            `,
            // Plain text version for email clients that don't support HTML
            text: `
CYBER SECURITY INQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}

Security Requirements:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Received: ${new Date().toLocaleString()}
© 2026 Cyber Defense Systems
            `
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Optional: Send auto-reply to the client
        const autoReplyOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: '✅ Security Inquiry Received - 0xKEY Cyber Defense',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body {
                            font-family: 'Courier New', monospace;
                            background-color: #0a0a0a;
                            color: #ffffff;
                            padding: 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background: #1a1a1a;
                            border: 2px solid #ff0000;
                            padding: 30px;
                            box-shadow: 0 0 30px rgba(255, 0, 0, 0.3);
                        }
                        .header {
                            text-align: center;
                            color: #ff0000;
                            font-size: 24px;
                            font-weight: bold;
                            margin-bottom: 20px;
                            text-shadow: 0 0 10px #ff0000;
                        }
                        .content {
                            color: #ffffff;
                            line-height: 1.8;
                            margin-bottom: 20px;
                        }
                        .highlight {
                            color: #ff0000;
                            font-weight: bold;
                        }
                        .footer {
                            text-align: center;
                            color: #888;
                            font-size: 12px;
                            margin-top: 30px;
                            padding-top: 20px;
                            border-top: 1px solid rgba(255, 0, 0, 0.3);
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            ✅ MESSAGE RECEIVED
                        </div>
                        
                        <div class="content">
                            Hello <span class="highlight">${name}</span>,
                            <br><br>
                            Your security inquiry has been successfully received and encrypted. 
                            Our cyber defense team will analyze your requirements and respond within 
                            <span class="highlight">24 hours</span>.
                            <br><br>
                            We take security seriously, and your message is being processed with the 
                            highest level of confidentiality.
                            <br><br>
                            Thank you for reaching out to 0xKEY Cyber Defense Systems.
                        </div>
                        
                        <div class="footer">
                            <div>© 2026 Cyber Defense Systems</div>
                            <div>ALL COMMUNICATIONS ENCRYPTED AND MONITORED</div>
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        await transporter.sendMail(autoReplyOptions);

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Message sent successfully'
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to send message. Please try again later.'
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'online',
        message: 'Cyber Defense API is operational'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔═══════════════════════════════════════════╗
║   🛡️  CYBER DEFENSE API SERVER ONLINE 🛡️   ║
╚═══════════════════════════════════════════╝
    
Port: ${PORT}
Status: ACTIVE
Security: ENABLED
Monitoring: 24/7

[${new Date().toLocaleString()}] Server initialized...
    `);
});

module.exports = app;