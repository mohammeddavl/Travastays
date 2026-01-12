'use client';

import { useEffect, useState } from 'react';

export default function APITestPage() {
  const [status, setStatus] = useState('Checking...');
  const [details, setDetails] = useState<any>({});

  useEffect(() => {
    // Check environment variables
    const envCheck = {
      apiUrl: process.env.NEXT_PUBLIC_RENTALWISE_API_URL,
      apiKeyExists: !!process.env.NEXT_PUBLIC_RENTALWISE_API_KEY,
      apiKeyLength: process.env.NEXT_PUBLIC_RENTALWISE_API_KEY?.length || 0,
      environment: process.env.NEXT_PUBLIC_RENTALWISE_ENVIRONMENT,
    };

    setDetails(envCheck);

    if (!envCheck.apiKeyExists) {
      setStatus('❌ API Key Not Configured');
    } else {
      setStatus('✅ Environment Variables Found');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">🔍 RentalWise API Test</h1>
        
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Status</h2>
          <p className="text-lg">{status}</p>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Environment Variables</h2>
          <div className="space-y-2 font-mono text-sm">
            <div>
              <strong>API URL:</strong> {details.apiUrl || '❌ Not set'}
            </div>
            <div>
              <strong>API Key:</strong> {details.apiKeyExists ? `✅ Set (${details.apiKeyLength} chars)` : '❌ Not set'}
            </div>
            <div>
              <strong>Environment:</strong> {details.environment || '❌ Not set'}
            </div>
          </div>
        </div>

        {!details.apiKeyExists && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-2">⚠️ Setup Required</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-red-700">
              <li>Create a file named <code className="bg-red-100 px-2 py-1 rounded">.env.local</code> in your project root</li>
              <li>Add this line: <code className="bg-red-100 px-2 py-1 rounded">NEXT_PUBLIC_RENTALWISE_API_KEY=your_key_here</code></li>
              <li>Restart your dev server (Ctrl+C then npm run dev)</li>
              <li>Refresh this page</li>
            </ol>
          </div>
        )}

        {details.apiKeyExists && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Configuration Looks Good!</h3>
            <p className="text-sm text-green-700">
              Your environment variables are set. If the API still isn&apos;t working, check:
            </p>
            <ul className="list-disc list-inside mt-2 text-sm text-green-700">
              <li>Your API key is correct (no typos)</li>
              <li>The API key is active in RentalWise</li>
              <li>Check browser console (F12) for errors</li>
            </ul>
          </div>
        )}

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-lg font-semibold text-yellow-800 mb-2">📋 Next Steps</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700">
            <li>If you see ✅ above, your setup is correct</li>
            <li>Go to <a href="/stays" className="underline font-semibold">/stays</a> to test the API</li>
            <li>Check browser console (F12) for any errors</li>
          </ol>
        </div>
      </div>
    </div>
  );
}