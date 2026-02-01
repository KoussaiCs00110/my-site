# 🛡️ Cyber Defense Systems - Portfolio Website

Elite cybersecurity portfolio website with backend contact form functionality.

## 📁 Project Structure

```
cyber-defense-portfolio/
├── index.html          # Main HTML file
├── style.css           # Cyberpunk styling
├── script.js           # Frontend JavaScript
├── profile.webp        # Profile picture
├── server.js           # Backend API server
├── package.json        # Node.js dependencies
├── .env.example        # Environment variables template
└── README.md           # This file
```

## 🚀 Quick Start

### Frontend Setup

1. **Open the website:**
   - Simply open `index.html` in your browser
   - No installation needed for frontend only

### Backend Setup (For Contact Form)

1. **Install Node.js:**
   - Download from: https://nodejs.org/
   - Version 14 or higher required

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure email settings:**
   - Copy `.env.example` to `.env`
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` and add your email credentials:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   RECEIVER_EMAIL=where-you-want-to-receive@gmail.com
   PORT=3000
   ```

4. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development (auto-restart):
   ```bash
   npm run dev
   ```

## 📧 Email Configuration

### Using Gmail

1. **Enable 2-Factor Authentication:**
   - Go to: https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Select "Mail" and your device
   - Copy the generated 16-character password
   - Use this password in `.env` as `EMAIL_PASSWORD`

3. **Example `.env` file:**
   ```
   EMAIL_USER=yourname@gmail.com
   EMAIL_PASSWORD=abcd efgh ijkl mnop
   RECEIVER_EMAIL=yourname@gmail.com
   PORT=3000
   ```

### Alternative Email Services

#### SendGrid
```javascript
// In server.js, replace transporter with:
const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
    }
});
```

#### Mailgun
```javascript
const transporter = nodemailer.createTransport({
    host: 'smtp.mailgun.org',
    port: 587,
    auth: {
        user: process.env.MAILGUN_USERNAME,
        pass: process.env.MAILGUN_PASSWORD
    }
});
```

#### Outlook/Hotmail
```javascript
const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
```

## 🌐 Deployment Options

### Option 1: Local Development
- Frontend: Open `index.html` in browser
- Backend: Run `npm start`
- Access: `http://localhost:3000`

### Option 2: Deploy Backend to Heroku

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables:**
   ```bash
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASSWORD=your-app-password
   heroku config:set RECEIVER_EMAIL=your-receiving-email@gmail.com
   ```

4. **Deploy:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

5. **Update frontend:**
   - In `script.js`, change API URL:
   ```javascript
   const response = await fetch('https://your-app-name.herokuapp.com/api/contact', {
   ```

### Option 3: Deploy Backend to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Set environment variables:**
   - Go to Vercel dashboard
   - Add environment variables
   - Redeploy

### Option 4: Deploy Frontend to Netlify/Vercel

1. **Frontend only (static hosting):**
   - Upload `index.html`, `style.css`, `script.js`, `profile.webp`
   - Update API URL in `script.js` to your backend URL

2. **Deploy to Netlify:**
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

## 🔧 Customization

### Update Contact Information

Edit `index.html`:
```html
<!-- Line ~450 -->
<div class="contact-value">
    <a href="mailto:your-email@gmail.com">your-email@gmail.com</a>
</div>
```

### Update Logo

Edit `index.html`:
```html
<!-- Line ~15 -->
<div class="logo">YOUR_BRAND</div>
```

### Change Colors

Edit `style.css`:
```css
:root {
    --primary-red: #ff0000;
    --neon-red: #ff003c;
    /* Change to your preferred colors */
}
```

### Add Social Media Links

Edit `index.html` in the contact section:
```html
<div class="contact-item">
    <div class="contact-label">Twitter</div>
    <div class="contact-value">
        <a href="https://twitter.com/yourhandle">@yourhandle</a>
    </div>
</div>
```

## 📊 Features

### Frontend Features
- ✅ Cyberpunk red/black theme
- ✅ Animated cyber grid background
- ✅ Glitch text effects
- ✅ Scan line animations
- ✅ Particle effects
- ✅ Terminal typing animation
- ✅ Responsive mobile design
- ✅ Profile picture with cyber frame
- ✅ Smooth scroll navigation

### Backend Features
- ✅ Express.js REST API
- ✅ Email notifications via Nodemailer
- ✅ HTML formatted emails
- ✅ Auto-reply to clients
- ✅ Input validation
- ✅ CORS enabled
- ✅ Error handling
- ✅ Health check endpoint

## 🔒 Security Features

1. **Input Validation:**
   - Email format validation
   - Required field checking
   - XSS prevention

2. **CORS Protection:**
   - Configurable origins
   - Secure headers

3. **Environment Variables:**
   - Sensitive data in `.env`
   - Never commit credentials

## 📝 API Endpoints

### POST `/api/contact`
Send contact form message

**Request:**
```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "company": "Tech Corp",
    "message": "Need security audit"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Message sent successfully"
}
```

### GET `/api/health`
Check server status

**Response:**
```json
{
    "status": "online",
    "message": "Cyber Defense API is operational"
}
```

## 🐛 Troubleshooting

### Email Not Sending

1. **Check Gmail App Password:**
   - Make sure 2FA is enabled
   - Use App Password, not regular password

2. **Check .env file:**
   - Verify all variables are set
   - No quotes around values

3. **Check firewall:**
   - Allow port 587 (SMTP)
   - Allow Node.js through firewall

### CORS Errors

Update `server.js`:
```javascript
app.use(cors({
    origin: 'http://yourdomain.com'
}));
```

### Port Already in Use

Change port in `.env`:
```
PORT=3001
```

## 📞 Support

For issues or questions:
- Email: security@0xkey.com
- Telegram: @0xkey
- LinkedIn: linkedin.com/in/0xkey

## 📄 License

MIT License - Feel free to use for personal or commercial projects.

---

© 2026 Cyber Defense Systems. All intrusions monitored.