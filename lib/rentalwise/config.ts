// lib/rentalwise/config.ts

export const RENTALWISE_CONFIG = {
  apiUrl: process.env.NEXT_PUBLIC_RENTALWISE_API_URL || 'https://api.rentalwise.com/v1',
  apiKey: process.env.NEXT_PUBLIC_RENTALWISE_API_KEY || '',
  environment: process.env.NEXT_PUBLIC_RENTALWISE_ENVIRONMENT || 'staging',
  
  // Partner API credentials (if applicable)
  partnerAuth: {
    username: process.env.RENTALWISE_PARTNER_USERNAME,
    password: process.env.RENTALWISE_PARTNER_PASSWORD,
  },
  
  // Request timeout in milliseconds
  timeout: 30000,
  
  // Retry configuration
  retry: {
    attempts: 3,
    delay: 1000,
  },
};

// Validate configuration
export function validateConfig() {
  if (!RENTALWISE_CONFIG.apiKey) {
    console.warn('⚠️ RentalWise API key is not configured. Please set NEXT_PUBLIC_RENTALWISE_API_KEY in your .env.local file.');
    return false;
  }
  return true;
}
