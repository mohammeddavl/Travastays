'use client';

import { useEffect, useState } from 'react';
import { rentalwiseAPI } from '@/lib/rentalwise/api';

export default function APITestPage() {
  const [configStatus, setConfigStatus] = useState('Checking config...');
  const [apiStatus, setApiStatus] = useState('Not tested yet');
  const [properties, setProperties] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testAPI() {
      // Check config
      const apiKeyExists = !!process.env.NEXT_PUBLIC_RENTALWISE_API_KEY;
      if (!apiKeyExists) {
        setConfigStatus('❌ API Key Not Set');
        return;
      }
      setConfigStatus('✅ API Key Configured');

      // Test API connection
      try {
        setApiStatus('⏳ Testing API connection...');
        console.log('🔍 Calling RentalWise API...');
        
        const response = await rentalwiseAPI.getProperties();
        console.log('✅ API Response:', response);
        
        setApiStatus('✅ API Connected Successfully!');
        
        // Extract properties
        const propertyList = response?.data || response || [];
        setProperties(Array.isArray(propertyList) ? propertyList : []);
        
      } catch (err: any) {
        console.error('❌ API Error:', err);
        setApiStatus('❌ API Connection Failed');
        setError(err.message || 'Unknown error');
      }
    }

    testAPI();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">🔍 RentalWise API Test</h1>
          
          {/* Config Status */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Configuration</h2>
            <p className="text-lg">{configStatus}</p>
          </div>

          {/* API Status */}
          <div className="mb-6 p-4 bg-purple-50 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">API Connection</h2>
            <p className="text-lg">{apiStatus}</p>
          </div>

          {/* Error Details */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-lg font-semibold text-red-800 mb-2">❌ Error Details</h3>
              <p className="text-sm text-red-700 font-mono">{error}</p>
              <div className="mt-4 text-sm text-red-600">
                <p className="font-semibold">Common Issues:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>API key is invalid or expired</li>
                  <li>API URL is incorrect</li>
                  <li>CORS not enabled for localhost</li>
                  <li>Network/firewall blocking request</li>
                </ul>
              </div>
            </div>
          )}

          {/* Properties Found */}
          {properties.length > 0 && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                ✅ Found {properties.length} Properties
              </h3>
              <div className="mt-4 space-y-2">
                {properties.slice(0, 3).map((prop: any, idx: number) => (
                  <div key={idx} className="p-3 bg-white rounded border">
                    <p className="font-semibold">{prop.name || 'Unnamed'}</p>
                    <p className="text-sm text-gray-600">ID: {prop.id}</p>
                  </div>
                ))}
                {properties.length > 3 && (
                  <p className="text-sm text-gray-600">...and {properties.length - 3} more</p>
                )}
              </div>
            </div>
          )}

          {/* No Properties */}
          {!error && properties.length === 0 && apiStatus.includes('Successfully') && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚠️ No Properties Found</h3>
              <p className="text-sm text-yellow-700">
                API connected successfully but returned 0 properties. You may need to add properties in your RentalWise account.
              </p>
            </div>
          )}

          {/* Next Steps */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">📋 Next Steps</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Check the status above</li>
              <li>If ✅, go to <a href="/stays" className="underline font-semibold text-blue-600">/stays</a> page</li>
              <li>Open browser console (F12) to see detailed logs</li>
              <li>Check Network tab for API requests</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
