## TodoApp

This is a simple to todo app, built with [Next.js](https://github.com/vercel/next.js), [Prisma](https://github.com/prisma/prisma), [NextAuth.js](https://github.com/nextauthjs/next-auth) and [NextUI](https://github.com/nextui-org/nextui).

✅ **AWS Amplify Ready** - Optimized for serverless deployment

## Features

- 🔐 Authentication with NextAuth.js (GitHub, Email)
- 📝 Create, read, update, delete todos
- 🎨 Beautiful UI with NextUI
- 🗄️ Database integration with Prisma
- ☁️ AWS Amplify deployment ready
- 🔍 Health check endpoint
- 📱 Responsive design

## Screenshots

<img src="https://tomsmits.nl/assets/screenshot-1.png">

<img src="https://tomsmits.nl/assets/screenshot-2.png">

<img src="https://tomsmits.nl/assets/screenshot-3.png">

<img src="https://tomsmits.nl/assets/screenshot-4.png">

## Database Support

- ✅ MySQL (recommended for AWS Amplify)
- ✅ PostgreSQL
- ✅ SQLite
- ✅ MongoDB
- ✅ PlanetScale (recommended for serverless)

## Quick Start (Local Development)

1. **Install dependencies:**
```bash
npm install
```

2. **Setup environment variables:**
Rename `.env.example` to `.env` and configure:

```shell
# App
NEXT_PUBLIC_APP_NAME="TodoApp"
NEXT_PUBLIC_APP_DESCRIPTION="A simple To-Do webapp."

# Database (use PlanetScale for serverless)
DATABASE_URL="mysql://username:password@endpoint/database"

# NextAuth
SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# OAuth
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Email (optional)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email"
EMAIL_SERVER_PASSWORD="your-password"
EMAIL_FROM="noreply@yourdomain.com"
```

3. **Setup database:**
```bash
npx prisma generate
npx prisma db push
```

4. **Start development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## AWS Amplify Deployment 🚀

This app is optimized for AWS Amplify with:
- ✅ Serverless-ready configuration
- ✅ Optimized build process
- ✅ Health check endpoint
- ✅ Production-ready NextAuth setup

### Quick Deploy to Amplify

1. **Push to GitHub** (this repository)

2. **Follow the deployment guide**: See `AMPLIFY_DEPLOYMENT.md` for detailed instructions

3. **One-click deploy**: [![Deploy to Amplify](https://console.aws.amazon.com/amplify/home#/deploy?repo=https://github.com/yourusername/TodoApp)](https://console.aws.amazon.com/amplify/home#/deploy)

### Health Check

Monitor your deployment: `https://your-app.amplifyapp.com/api/health`

## Alternative Deployments

### Vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/TodoApp)

### Netlify  
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/TodoApp)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:amplify` - Build for Amplify deployment
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push Prisma schema to database
- `npm run db:generate` - Generate Prisma client

## Tech Stack

- **Framework**: Next.js 16
- **Database**: Prisma with MySQL/PlanetScale
- **Authentication**: NextAuth.js
- **UI**: NextUI + Tailwind CSS
- **Deployment**: AWS Amplify (recommended)
- **TypeScript**: Full type safety
