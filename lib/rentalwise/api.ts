// lib/rentalwise/api.ts
import { RENTALWISE_CONFIG } from './config';
import type {
  RentalWiseProperty,
  RentalWiseAvailability,
  RentalWiseReservation,
  RentalWiseSearchParams,
  RentalWiseApiResponse,
  RentalWiseError,
} from '@/types/rentalwise';

class RentalWiseAPIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'RentalWiseAPIError';
  }
}

class RentalWiseAPI {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = RENTALWISE_CONFIG.apiUrl;
    this.apiKey = RENTALWISE_CONFIG.apiKey;
  }

  /**
   * Make an HTTP request to the RentalWise API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      // Handle non-JSON responses
      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        if (!response.ok) {
          throw new RentalWiseAPIError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status
          );
        }
      }

      const data = await response.json();

      if (!response.ok) {
        throw new RentalWiseAPIError(
          data.message || `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          data.code
        );
      }

      return data;
    } catch (error) {
      if (error instanceof RentalWiseAPIError) {
        throw error;
      }

      // Network or other errors
      console.error('RentalWise API Error:', error);
      throw new RentalWiseAPIError(
        error instanceof Error ? error.message : 'An unknown error occurred',
        0
      );
    }
  }

  /**
   * Build query string from parameters
   */
  private buildQueryString(params: Record<string, any>): string {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, String(v)));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
  }

  // ==================== PROPERTIES ====================

  /**
   * Get all properties
   */
  async getProperties(
    params?: RentalWiseSearchParams
  ): Promise<RentalWiseApiResponse<RentalWiseProperty[]>> {
    const queryString = params ? this.buildQueryString(params) : '';
    return this.request<RentalWiseApiResponse<RentalWiseProperty[]>>(
      `/properties${queryString}`
    );
  }

  /**
   * Get a single property by ID
   */
  async getProperty(propertyId: string): Promise<RentalWiseProperty> {
    return this.request<RentalWiseProperty>(`/properties/${propertyId}`);
  }

  /**
   * Search properties
   */
  async searchProperties(
    searchParams: RentalWiseSearchParams
  ): Promise<RentalWiseApiResponse<RentalWiseProperty[]>> {
    const queryString = this.buildQueryString(searchParams);
    return this.request<RentalWiseApiResponse<RentalWiseProperty[]>>(
      `/properties/search${queryString}`
    );
  }

  // ==================== AVAILABILITY ====================

  /**
   * Check availability for a property
   */
  async checkAvailability(
    propertyId: string,
    checkIn: string,
    checkOut: string
  ): Promise<RentalWiseAvailability> {
    const queryString = this.buildQueryString({ checkIn, checkOut });
    return this.request<RentalWiseAvailability>(
      `/properties/${propertyId}/availability${queryString}`
    );
  }

  /**
   * Get calendar availability for a property
   */
  async getCalendarAvailability(
    propertyId: string,
    month: string // Format: YYYY-MM
  ): Promise<RentalWiseAvailability> {
    const queryString = this.buildQueryString({ month });
    return this.request<RentalWiseAvailability>(
      `/properties/${propertyId}/calendar${queryString}`
    );
  }

  // ==================== PRICING ====================

  /**
   * Get pricing quote for a stay
   */
  async getPricingQuote(
    propertyId: string,
    checkIn: string,
    checkOut: string,
    guests: number = 1
  ): Promise<any> {
    const queryString = this.buildQueryString({ checkIn, checkOut, guests });
    return this.request(`/properties/${propertyId}/quote${queryString}`);
  }

  // ==================== RESERVATIONS ====================

  /**
   * Create a new reservation
   */
  async createReservation(
    reservationData: Partial<RentalWiseReservation>
  ): Promise<RentalWiseReservation> {
    return this.request<RentalWiseReservation>('/reservations', {
      method: 'POST',
      body: JSON.stringify(reservationData),
    });
  }

  /**
   * Get a reservation by ID
   */
  async getReservation(reservationId: string): Promise<RentalWiseReservation> {
    return this.request<RentalWiseReservation>(`/reservations/${reservationId}`);
  }

  /**
   * Update a reservation
   */
  async updateReservation(
    reservationId: string,
    updates: Partial<RentalWiseReservation>
  ): Promise<RentalWiseReservation> {
    return this.request<RentalWiseReservation>(`/reservations/${reservationId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  /**
   * Cancel a reservation
   */
  async cancelReservation(reservationId: string): Promise<RentalWiseReservation> {
    return this.request<RentalWiseReservation>(`/reservations/${reservationId}/cancel`, {
      method: 'POST',
    });
  }

  /**
   * Get all reservations (with optional filters)
   */
  async getReservations(params?: {
    status?: string;
    checkIn?: string;
    checkOut?: string;
    page?: number;
    limit?: number;
  }): Promise<RentalWiseApiResponse<RentalWiseReservation[]>> {
    const queryString = params ? this.buildQueryString(params) : '';
    return this.request<RentalWiseApiResponse<RentalWiseReservation[]>>(
      `/reservations${queryString}`
    );
  }
}

// Export singleton instance
export const rentalwiseAPI = new RentalWiseAPI();

// Export the class for testing or custom instances
export { RentalWiseAPI, RentalWiseAPIError };
