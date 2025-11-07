# AWS Amplify Deployment Guide for TodoApp

This guide will help you deploy your Next.js TodoApp to AWS Amplify.

## Prerequisites

1. **AWS Account** with Amplify access
2. **GitHub Repository** (this codebase should be pushed to GitHub)
3. **Database Setup** (AWS RDS MySQL or PlanetScale recommended)
4. **OAuth Apps** configured (GitHub, Google if needed)
5. **Email Service** (AWS SES recommended for production)

## Step 1: Database Setup

### Option A: PlanetScale (Recommended for Serverless)
1. Create a PlanetScale account at https://planetscale.com/
2. Create a new database
3. Get the connection string from the dashboard
4. The connection string format: `mysql://username:password@aws.connect.psdb.cloud/database_name?sslaccept=strict`

### Option B: AWS RDS MySQL
1. Create an RDS MySQL instance in AWS Console
2. Configure security groups to allow connections
3. Note the endpoint, username, and password
4. Connection string format: `mysql://username:password@endpoint:3306/database_name`

## Step 2: GitHub OAuth App Setup

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `https://your-amplify-domain.amplifyapp.com/api/auth/callback/github`
4. Note the Client ID and Client Secret

## Step 3: AWS SES Setup (for Email Authentication)

1. Go to AWS SES Console
2. Verify your sender email address
3. Create SMTP credentials
4. Note the SMTP endpoint, username, and password

## Step 4: Deploy to AWS Amplify

### 4.1 Connect Repository
1. Go to AWS Amplify Console
2. Click "New app" → "Host web app"
3. Connect your GitHub repository
4. Select the repository and branch (main)

### 4.2 Build Settings
The `amplify.yml` file is already configured. Amplify will use it automatically.

### 4.3 Environment Variables
In Amplify Console → App Settings → Environment Variables, add:

```
DATABASE_URL=mysql://username:password@endpoint/database
SECRET=your-nextauth-secret-32-chars
NEXTAUTH_URL=https://your-amplify-domain.amplifyapp.com
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
EMAIL_SERVER_HOST=email-smtp.region.amazonaws.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-ses-smtp-username
EMAIL_SERVER_PASSWORD=your-ses-smtp-password
EMAIL_FROM=noreply@yourdomain.com
```

### 4.4 Advanced Settings
1. Build image: Amazon Linux:2023
2. Node.js version: 18 or higher
3. Build timeout: 10 minutes (for Prisma generation)

## Step 5: Database Migration

After the first deployment:

1. Connect to your deployed app
2. The Prisma schema will be automatically generated during build
3. For PlanetScale: Database schema will be automatically synced
4. For RDS: You may need to run migrations manually

## Step 6: Custom Domain (Optional)

1. In Amplify Console → Domain management
2. Add your custom domain
3. Update NEXTAUTH_URL environment variable
4. Update OAuth callback URLs

## Step 7: Monitoring and Troubleshooting

### Common Issues:
1. **Database connection errors**: Check DATABASE_URL format
2. **NextAuth errors**: Verify NEXTAUTH_URL matches your domain
3. **OAuth errors**: Check callback URL configuration
4. **Email errors**: Verify SES setup and credentials

### Logs:
- Check Amplify build logs in the console
- Monitor CloudWatch logs for runtime errors
- Use AWS X-Ray for detailed performance monitoring

## Step 8: Performance Optimization

The app is already optimized for Amplify with:
- ✅ Standalone output for better serverless performance
- ✅ Optimized Prisma client configuration
- ✅ Image optimization disabled (Amplify handles this)
- ✅ Proper caching configuration
- ✅ Serverless-friendly NextAuth settings

## Security Checklist

- [ ] Use strong SECRET for NextAuth
- [ ] Enable HTTPS only (secure cookies)
- [ ] Verify OAuth app callback URLs
- [ ] Use environment variables for all secrets
- [ ] Enable AWS CloudTrail for audit logging
- [ ] Configure proper IAM roles

## Cost Optimization

- Use PlanetScale hobby tier for development
- Monitor Amplify usage and set billing alerts
- Consider AWS RDS Serverless for variable traffic
- Use Amplify's built-in CDN for static assets

## Support

For issues:
1. Check Amplify documentation: https://docs.amplify.aws/
2. NextAuth documentation: https://next-auth.js.org/
3. Prisma documentation: https://www.prisma.io/docs/

---

Your TodoApp is now ready for AWS Amplify deployment! 🚀
