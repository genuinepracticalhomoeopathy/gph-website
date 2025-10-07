# 🚀 Production Deployment Guide

## ✅ Pre-Deployment Checklist

### 1. Environment Variables
Ensure these environment variables are set in your hosting platform:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
NEXT_PUBLIC_BASE_URL=https://your-production-domain.com
```

### 2. Firebase Setup
- [ ] Create Firebase project
- [ ] Enable Authentication (Email/Password)
- [ ] Create Firestore database
- [ ] Set up security rules
- [ ] Add admin user(s) in Firebase Console

### 3. Build Verification
```bash
# Test build locally
npm run build
npm start

# Or use the build script
./scripts/build.sh
```

## 🌐 Deployment Platforms

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Set Environment Variables**
   - Go to Vercel Dashboard → Project → Settings → Environment Variables
   - Add all the Firebase environment variables
   - Set `NEXT_PUBLIC_BASE_URL` to your Vercel domain

3. **Custom Domain** (Optional)
   - Add your custom domain in Vercel Dashboard
   - Update `NEXT_PUBLIC_BASE_URL` to your custom domain

### Netlify

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables**
   - Add all Firebase environment variables in Netlify Dashboard

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm start
   ```

## 🔧 Production Optimizations

### Performance
- ✅ Static page generation enabled
- ✅ Image optimization configured
- ✅ Bundle optimization with SWC
- ✅ Compression enabled

### Security
- ✅ HTTPS enforced
- ✅ Security headers configured
- ✅ Firebase security rules
- ✅ Admin authentication

### SEO
- ✅ Meta tags configured
- ✅ Structured data ready
- ✅ Sitemap generation

## 📊 Monitoring & Analytics

### Google Analytics (Optional)
Add to environment variables:
```bash
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

### Error Monitoring
Consider adding:
- Sentry for error tracking
- LogRocket for user session replay

## 🔒 Security Checklist

- [ ] Firebase security rules configured
- [ ] Admin emails whitelisted
- [ ] HTTPS enforced
- [ ] Security headers enabled
- [ ] Cookie security configured
- [ ] Input validation in place

## 📝 Post-Deployment Tasks

1. **Test Admin Login**
   - Visit `/admin/login`
   - Sign in with Firebase admin account
   - Create a test blog post

2. **Test Public Blog**
   - Visit `/blogs`
   - Verify blog posts display correctly
   - Test individual blog post pages

3. **Performance Testing**
   - Run Lighthouse audit
   - Test on mobile devices
   - Verify loading times

4. **SEO Verification**
   - Check meta tags
   - Verify social sharing
   - Test search engine indexing

## 🆘 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Firebase Connection Issues
- Verify environment variables
- Check Firebase project settings
- Ensure Firestore rules allow access

### Performance Issues
- Enable compression
- Optimize images
- Check bundle size analysis

## 📞 Support

For deployment issues:
1. Check build logs
2. Verify environment variables
3. Test Firebase connection
4. Review security rules

---

**✨ Your GPH Blog is production-ready!**