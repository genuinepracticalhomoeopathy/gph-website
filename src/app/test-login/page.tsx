// Temporary test authentication - for debugging only
// This bypasses Firebase and creates a simple test login

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TestLogin() {
  const [email, setEmail] = useState('test@admin.com');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleTestLogin = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('✅ Login successful! Redirecting...');
        setTimeout(() => router.push('/admin'), 1000);
      } else {
        const data = await response.json();
        setMessage(`❌ Login failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error: ${error}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">🧪 Test Login</h1>
        <p className="text-gray-600 mb-6 text-center text-sm">
          This bypasses Firebase for testing. Use this if Firebase auth is not working.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Enter any email"
            />
          </div>
          
          <button
            onClick={handleTestLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Test Login (Skip Firebase)'}
          </button>
          
          {message && (
            <div className={`p-4 rounded-xl ${message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message}
            </div>
          )}
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 rounded-xl">
          <p className="text-yellow-800 text-sm">
            <strong>Note:</strong> This is for testing only. The login API is currently set to 
            accept any email (allowAnyEmail = true). Once Firebase is working, 
            this should be disabled.
          </p>
        </div>
      </div>
    </div>
  );
}