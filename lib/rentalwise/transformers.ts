// lib/rentalwise/transformers.ts
import type { RentalWiseProperty } from '@/types/rentalwise';

/**
 * Transform RentalWise property to app property format
 */
export function transformProperty(rwProperty: RentalWiseProperty) {
  return {
    id: rwProperty.id,
    name: rwProperty.name,
    location: `${rwProperty.location.city}, ${rwProperty.location.state}`,
    price: rwProperty.pricing.basePrice,
    image: rwProperty.images.find(img => img.isPrimary)?.url || rwProperty.images[0]?.url || '/placeholder.jpg',
    amenities: rwProperty.amenities,
    description: rwProperty.description,
    bedrooms: rwProperty.capacity.bedrooms,
    bathrooms: rwProperty.capacity.bathrooms,
    guests: rwProperty.capacity.guests,
    images: rwProperty.images.map(img => img.url),
    // Additional fields from RentalWise
    fullLocation: rwProperty.location,
    pricing: rwProperty.pricing,
    availability: rwProperty.availability,
    rules: rwProperty.rules,
  };
}

/**
 * Transform multiple properties
 */
export function transformProperties(rwProperties: RentalWiseProperty[]) {
  return rwProperties.map(transformProperty);
}

/**
 * Get amenity icon/label mappings
 */
export function getAmenityLabel(amenity: string): string {
  const amenityMap: Record<string, string> = {
    wifi: 'WiFi',
    ac: 'Air Conditioning',
    kitchen: 'Kitchen',
    parking: 'Parking',
    pool: 'Pool',
    gym: 'Gym',
    washer: 'Washer',
    dryer: 'Dryer',
    tv: 'TV',
    heating: 'Heating',
    workspace: 'Workspace',
    'pets-allowed': 'Pet Friendly',
  };

  return amenityMap[amenity.toLowerCase()] || amenity;
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
  }).format(price);
}

/**
 * Calculate total nights between dates
 */
export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Validate date range
 */
export function validateDateRange(checkIn: string, checkOut: string): {
  valid: boolean;
  error?: string;
} {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (start < today) {
    return { valid: false, error: 'Check-in date cannot be in the past' };
  }

  if (end <= start) {
    return { valid: false, error: 'Check-out date must be after check-in date' };
  }

  return { valid: true };
}
