// types/rentalwise.ts
export interface RentalWiseProperty {
  id: string;
  name: string;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  pricing: {
    basePrice: number;
    currency: string;
    cleaningFee?: number;
    securityDeposit?: number;
  };
  capacity: {
    bedrooms: number;
    bathrooms: number;
    guests: number;
    beds?: number;
  };
  amenities: string[];
  images: {
    url: string;
    caption?: string;
    isPrimary?: boolean;
  }[];
  availability?: {
    checkIn: string;
    checkOut: string;
    minimumStay?: number;
    maximumStay?: number;
  };
  rules?: {
    checkInTime?: string;
    checkOutTime?: string;
    smokingAllowed?: boolean;
    petsAllowed?: boolean;
  };
}

export interface RentalWiseAvailability {
  propertyId: string;
  available: boolean;
  dates: {
    date: string;
    available: boolean;
    price: number;
    minimumStay?: number;
  }[];
}

export interface RentalWiseReservation {
  id: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  pricing: {
    basePrice: number;
    cleaningFee: number;
    serviceFee: number;
    taxes: number;
    total: number;
    currency: string;
  };
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface RentalWiseSearchParams {
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  bedrooms?: number;
  bathrooms?: number;
  minPrice?: number;
  maxPrice?: number;
  amenities?: string[];
  location?: string;
  page?: number;
  limit?: number;
}

export interface RentalWiseApiResponse<T> {
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface RentalWiseError {
  message: string;
  code?: string;
  status: number;
}
