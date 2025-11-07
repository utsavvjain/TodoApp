# AWS Amplify Deployment Checklist

## ✅ Pre-Deployment Checklist

### Code Preparation
- [ ] Code pushed to GitHub repository
- [ ] All dependencies are in `package.json`
- [ ] `amplify.yml` build configuration is present
- [ ] Environment variables documented in `.env.amplify`
- [ ] Health check endpoint works (`/api/health`)

### Database Setup
- [ ] Database created (PlanetScale or AWS RDS)
- [ ] Database connection string ready
- [ ] Prisma schema matches your requirements
- [ ] Database accessible from AWS (security groups configured)

### Authentication Setup
- [ ] GitHub OAuth app created
- [ ] OAuth callback URLs configured
- [ ] NextAuth secret generated (32+ characters)
- [ ] Email service configured (AWS SES recommended)

### AWS Amplify Console Setup
- [ ] Repository connected to Amplify
- [ ] Build settings configured (uses `amplify.yml`)
- [ ] Environment variables added in Amplify Console
- [ ] Build image set to Amazon Linux:2023
- [ ] Node.js version 18+ selected

## 📋 Environment Variables to Set in Amplify Console

```bash
# Required
DATABASE_URL=mysql://username:password@endpoint/database
SECRET=your-nextauth-secret-here
NEXTAUTH_URL=https://your-domain.amplifyapp.com
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Optional (for email auth)
EMAIL_SERVER_HOST=email-smtp.region.amazonaws.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-ses-username
EMAIL_SERVER_PASSWORD=your-ses-password
EMAIL_FROM=noreply@yourdomain.com
```

## 🚀 Post-Deployment Checklist

### Verification
- [ ] App deploys successfully (green build status)
- [ ] Health check endpoint responds: `/api/health`
- [ ] Database connection works
- [ ] Authentication flow works (login/logout)
- [ ] Todo CRUD operations work
- [ ] No console errors in browser

### Monitoring Setup
- [ ] CloudWatch logs configured
- [ ] Billing alerts set up
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active

### Performance
- [ ] App loads quickly (< 3 seconds)
- [ ] Images load properly
- [ ] API responses are fast
- [ ] Mobile responsiveness works

## 🔧 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Build fails | Check `amplify.yml` and dependencies |
| Database connection error | Verify `DATABASE_URL` format |
| NextAuth callback error | Check `NEXTAUTH_URL` and OAuth URLs |
| 500 errors | Check CloudWatch logs |
| CSS not loading | Check build output and static files |

## 📊 Production Monitoring

### Key Metrics to Monitor
- Application response times
- Database connection pool usage
- Error rates in CloudWatch
- Amplify build success rates
- User authentication success rates

### Recommended Alerts
- High error rates (>5%)
- Slow response times (>5 seconds)
- Build failures
- Database connection issues

## 🎯 Next Steps After Deployment

- [ ] Set up monitoring dashboards
- [ ] Configure backup strategies
- [ ] Implement CI/CD improvements
- [ ] Add more comprehensive error tracking
- [ ] Set up staging environment
- [ ] Document deployment process for team

---

## 🆘 Emergency Contacts & Resources

- AWS Amplify Documentation: https://docs.amplify.aws/
- NextAuth.js Documentation: https://next-auth.js.org/
- PlanetScale Support: https://planetscale.com/docs
- Next.js Documentation: https://nextjs.org/docs

**Ready to deploy!** 🚀
