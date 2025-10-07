// Firebase Admin User Creation Script
// This script helps you create an admin user for your blog

import { auth } from './src/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

async function createAdminUser() {
  const email = 'admin@gph.com'; // Change this to your desired admin email
  const password = 'admin123456'; // Change this to a secure password

  try {
    console.log('Creating admin user...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('✅ Admin user created successfully!');
    console.log('📧 Email:', userCredential.user.email);
    console.log('🆔 UID:', userCredential.user.uid);
    console.log('\n🔐 Login credentials:');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('\n🚨 IMPORTANT: Change the password after first login!');
  } catch (error) {
    console.error('❌ Error creating admin user:', error);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log('✅ User already exists with this email');
      console.log('🔐 Try logging in with:');
      console.log('Email:', email);
      console.log('Password: [your existing password]');
    } else if (error.code === 'auth/weak-password') {
      console.log('🔒 Password too weak. Please use a stronger password.');
    } else if (error.code === 'auth/invalid-email') {
      console.log('📧 Invalid email format.');
    }
  }
}

// Run the script
createAdminUser();