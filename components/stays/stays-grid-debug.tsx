'use client';

import { useEffect, useState } from 'react';
import { RENTALWISE_CONFIG, validateConfig } from '@/lib/rentalwise/config';
import { rentalwiseAPI } from '@/lib/rentalwise/api';
import { PropertyCard } from "@/components/property-card";

export function StaysGridDebug() {
  const [debugInfo, setDebugInfo] = useState<any>({
    step: 'Initializing...',
    config: null,
    apiResponse: null,
    error: null,
    properties: [],
  });

  useEffect(() => {
    async function debugFetch() {
      const debug: any = {
        step: 'Starting debug...',
        timestamp: new Date().toISOString(),
      };

      try {
        // Step 1: Check environment variables
        debug.step = '1. Checking environment variables';
        debug.env = {
          apiUrl: process.env.NEXT_PUBLIC_RENTALWISE_API_URL,
          apiKeySet: !!process.env.NEXT_PUBLIC_RENTALWISE_API_KEY,
          apiKeyLength: process.env.NEXT_PUBLIC_RENTALWISE_API_KEY?.length || 0,
          environment: process.env.NEXT_PUBLIC_RENTALWISE_ENVIRONMENT,
        };
        setDebugInfo({...debug});

        // Step 2: Check config
        debug.step = '2. Checking RENTALWISE_CONFIG';
        debug.config = {
          apiUrl: RENTALWISE_CONFIG.apiUrl,
          apiKeySet: !!RENTALWISE_CONFIG.apiKey,
          apiKeyLength: RENTALWISE_CONFIG.apiKey?.length || 0,
          environment: RENTALWISE_CONFIG.environment,
        };
        setDebugInfo({...debug});

        // Step 3: Validate config
        debug.step = '3. Validating configuration';
        const isValid = validateConfig();
        debug.configValid = isValid;
        setDebugInfo({...debug});

        if (!isValid) {
          throw new Error('Configuration is invalid - API key not set');
        }

        // Step 4: Make API call
        debug.step = '4. Making API call to RentalWise';
        setDebugInfo({...debug});

        console.log('🔍 Making request to:', RENTALWISE_CONFIG.apiUrl + '/properties');
        console.log('🔑 Using API key:', RENTALWISE_CONFIG.apiKey.substring(0, 10) + '...');

        const response = await rentalwiseAPI.getProperties();
        
        debug.step = '5. API response received';
        debug.apiResponse = {
          hasData: !!response,
          dataType: typeof response,
          isArray: Array.isArray(response),
          hasDataProperty: response && 'data' in response,
          dataLength: response?.data?.length || 0,
          fullResponse: response,
        };
        setDebugInfo({...debug});

        // Step 5: Extract properties
        debug.step = '6. Extracting properties';
        const properties = response?.data || response || [];
        debug.properties = properties;
        debug.propertiesCount = Array.isArray(properties) ? properties.length : 0;
        
        setDebugInfo({...debug});

      } catch (error: any) {
        debug.step = 'ERROR';
        debug.error = {
          message: error.message,
          name: error.name,
          status: error.status,
          stack: error.stack,
          fullError: error,
        };
        setDebugInfo({...debug});
        console.error('🚨 Debug error:', error);
      }
    }

    debugFetch();
  }, []);

  return (
    <div className="space-y-6">
      {/* Debug Panel */}
      <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm">
        <h3 className="text-xl font-bold mb-4 text-white">🔍 Debug Information</h3>
        
        <div className="space-y-3">
          <div>
            <span className="text-gray-400">Current Step:</span>{' '}
            <span className="text-yellow-300">{debugInfo.step}</span>
          </div>

          {debugInfo.env && (
            <div>
              <div className="text-gray-400 mb-1">Environment Variables:</div>
              <pre className="text-xs bg-gray-800 p-2 rounded overflow-auto">
                {JSON.stringify(debugInfo.env, null, 2)}
              </pre>
            </div>
          )}

          {debugInfo.config && (
            <div>
              <div className="text-gray-400 mb-1">Config Object:</div>
              <pre className="text-xs bg-gray-800 p-2 rounded overflow-auto">
                {JSON.stringify(debugInfo.config, null, 2)}
              </pre>
            </div>
          )}

          {debugInfo.configValid !== undefined && (
            <div>
              <span className="text-gray-400">Config Valid:</span>{' '}
              <span className={debugInfo.configValid ? 'text-green-400' : 'text-red-400'}>
                {debugInfo.configValid ? '✅ YES' : '❌ NO'}
              </span>
            </div>
          )}

          {debugInfo.apiResponse && (
            <div>
              <div className="text-gray-400 mb-1">API Response:</div>
              <pre className="text-xs bg-gray-800 p-2 rounded overflow-auto max-h-64">
                {JSON.stringify(debugInfo.apiResponse, null, 2)}
              </pre>
            </div>
          )}

          {debugInfo.propertiesCount !== undefined && (
            <div>
              <span className="text-gray-400">Properties Found:</span>{' '}
              <span className="text-green-400">{debugInfo.propertiesCount}</span>
            </div>
          )}

          {debugInfo.error && (
            <div>
              <div className="text-red-400 font-bold mb-1">❌ ERROR:</div>
              <pre className="text-xs bg-red-900 text-red-100 p-2 rounded overflow-auto max-h-64">
                {JSON.stringify(debugInfo.error, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Properties Display */}
      {debugInfo.properties && debugInfo.properties.length > 0 ? (
        <div>
          <h3 className="text-2xl font-bold mb-4">
            ✅ Properties Loaded ({debugInfo.properties.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {debugInfo.properties.slice(0, 6).map((property: any, idx: number) => (
              <div key={idx} className="border rounded-lg p-4">
                <h4 className="font-bold">{property.name || 'Unnamed'}</h4>
                <p className="text-sm text-gray-600">ID: {property.id || 'No ID'}</p>
                <p className="text-sm">Price: ${property.pricing?.basePrice || property.price || 'N/A'}</p>
                <pre className="text-xs bg-gray-100 p-2 rounded mt-2 overflow-auto max-h-32">
                  {JSON.stringify(property, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        </div>
      ) : debugInfo.error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-800 mb-2">⚠️ Error Loading Properties</h3>
          <p className="text-red-600">{debugInfo.error.message}</p>
        </div>
      ) : (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-blue-800 mb-2">⏳ Loading...</h3>
          <p className="text-blue-600">Fetching properties from RentalWise API...</p>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-yellow-800 mb-2">📋 What to Check:</h3>
        <ol className="list-decimal list-inside space-y-2 text-sm text-yellow-700">
          <li>Environment Variables section should show <code>apiKeySet: true</code></li>
          <li>Config Valid should show <span className="text-green-600">✅ YES</span></li>
          <li>If you see an error, read the error message carefully</li>
          <li>Check browser console (F12) for additional logs</li>
          <li>Check Network tab (F12 → Network) for the API request</li>
        </ol>
      </div>
    </div>
  );
}
