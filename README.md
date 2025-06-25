# repty

A bank verification application with multi-step form validation.

## Installation

Clone the repository:

```bash
git clone https://github.com/sammy-dev-001/limobla-clonedd.git
cd limobla-clonedd
```

### Frontend Setup

Install frontend dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at: http://localhost:5174

### Backend Setup

Install backend dependencies:

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory with your email credentials:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

Start the backend server:

```bash
node server.js
```

The backend will be available at: http://localhost:5000

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/) and sign up/log in
3. Click "Add New" → "Project"
4. Connect your GitHub account and select this repository
5. Configure the project:
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: dist
6. Add environment variables (for backend):
   - EMAIL_USER: your-email@gmail.com
   - EMAIL_PASS: your-app-password
7. Click "Deploy"

## Features

- Multi-step user verification
- Card information validation
- OTP verification
- Responsive design
- Email notifications
