'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function AuthDebug() {
    const [email, setEmail] = useState('admin@gph.com');
    const [password, setPassword] = useState('admin123456');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const createUser = async () => {
        setIsLoading(true);
        setMessage('');
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setMessage(`✅ User created successfully! UID: ${userCredential.user.uid}`);
        } catch (error: unknown) {
            if (error && typeof error === 'object' && 'code' in error && error.code === 'auth/email-already-in-use') {
                setMessage('✅ User already exists! Try signing in.');
            } else {
                setMessage(`❌ Error: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
        setIsLoading(false);
    };

    const signIn = async () => {
        setIsLoading(true);
        setMessage('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setMessage(`✅ Sign in successful! UID: ${userCredential.user.uid}`);

            // Test the login API
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage(prev => prev + '\n✅ API login successful!');
            } else {
                const data = await response.json();
                setMessage(prev => prev + `\n❌ API login failed: ${data.error}`);
            }
        } catch (error: unknown) {
            setMessage(`❌ Sign in error: ${error instanceof Error ? error.message : String(error)}`);
        }
        setIsLoading(false);
    };

    const testAuth = async () => {
        setIsLoading(true);
        setMessage('');
        try {
            const response = await fetch('/api/auth/verify');
            const data = await response.json();
            setMessage(`🔍 Auth status: ${JSON.stringify(data, null, 2)}`);
        } catch (error) {
            setMessage(`❌ Verify error: ${error}`);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6">🔧 Auth Debug Tool</h1>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex space-x-2">
                        <button
                            onClick={createUser}
                            disabled={isLoading}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
                        >
                            Create User
                        </button>
                        <button
                            onClick={signIn}
                            disabled={isLoading}
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                        >
                            Sign In
                        </button>
                    </div>

                    <button
                        onClick={testAuth}
                        disabled={isLoading}
                        className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 disabled:opacity-50"
                    >
                        Test Auth Status
                    </button>

                    {message && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-md">
                            <pre className="text-sm whitespace-pre-wrap">{message}</pre>
                        </div>
                    )}

                    {isLoading && (
                        <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        </div>
                    )}
                </div>

                <div className="mt-8 p-4 bg-yellow-50 rounded-md">
                    <h3 className="font-medium text-yellow-800">Instructions:</h3>
                    <ol className="mt-2 text-sm text-yellow-700 list-decimal list-inside">
                        <li>First, click &quot;Create User&quot; to create an admin account</li>
                        <li>Then click &quot;Sign In&quot; to test authentication</li>
                        <li>Click &quot;Test Auth Status&quot; to verify cookies are set</li>
                        <li>If everything works, go to /admin/login</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}