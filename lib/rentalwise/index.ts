// lib/rentalwise/index.ts
// Central export file for RentalWise integration

// API Client
export { rentalwiseAPI, RentalWiseAPI, RentalWiseAPIError } from './api';

// Configuration
export { RENTALWISE_CONFIG, validateConfig } from './config';

// Transformers
export {
  transformProperty,
  transformProperties,
  getAmenityLabel,
  formatPrice,
  calculateNights,
  formatDate,
  validateDateRange,
} from './transformers';

// Types
export type {
  RentalWiseProperty,
  RentalWiseAvailability,
  RentalWiseReservation,
  RentalWiseSearchParams,
  RentalWiseApiResponse,
  RentalWiseError,
} from '@/types/rentalwise';
