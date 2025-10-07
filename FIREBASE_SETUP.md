# Firebase Setup Instructions

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter project name (e.g., "gph-website")
4. Continue through the setup process

## 2. Enable Authentication

1. In Firebase Console, go to "Authentication" 
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" provider
5. Create an admin user:
   - Go to "Users" tab
   - Click "Add user"
   - Enter admin email (e.g., admin@gph.com)
   - Enter a secure password
   - Click "Add user"

## 3. Set up Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location close to your users
5. Click "Done"

## 4. Configure Security Rules

Replace the default Firestore rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for blogs, no write access from client
    match /blogs/{document} {
      allow read: if true;
      allow write: if false; // Only server-side operations allowed
    }
  }
}
```

## 5. Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select "Web" (</> icon)
4. Register your app with a nickname
5. Copy the configuration object

## 6. Update Environment Variables

1. Copy `.env.example` to `.env.local`
2. Fill in all the Firebase configuration values from step 5

## 7. Update Authorized Emails

In `/src/app/api/auth/login/route.ts`, update the `authorizedEmails` array with your admin email:

```typescript
const authorizedEmails = ['admin@gph.com', 'your-admin@email.com'];
```

## 8. Test the Setup

1. Run `npm run dev`
2. Go to `/admin/login`
3. Sign in with your admin credentials
4. Try creating a blog post

## Security Notes

- Keep your `.env.local` file secure and never commit it to version control
- Use strong passwords for admin accounts
- Consider enabling 2FA on your Firebase account
- Regularly review Firestore security rules
- Monitor authentication logs in Firebase Console

## Simplified Architecture

This setup uses:
- **Client-side Firebase Auth** for user authentication
- **Simple cookie-based sessions** for admin access
- **Client-side Firestore** for blog operations
- **No server-side Firebase Admin SDK** needed