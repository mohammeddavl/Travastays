// hooks/use-rentalwise.ts
'use client';

import { useState, useEffect } from 'react';
import { rentalwiseAPI } from '@/lib/rentalwise/api';
import { transformProperties, transformProperty } from '@/lib/rentalwise/transformers';
import type { RentalWiseProperty, RentalWiseSearchParams } from '@/types/rentalwise';

/**
 * Hook to fetch all properties
 */
export function useProperties(searchParams?: RentalWiseSearchParams) {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await rentalwiseAPI.getProperties(searchParams);
        const transformedProperties = transformProperties(response.data);
        setProperties(transformedProperties);
      } catch (err: any) {
        console.error('Error fetching properties:', err);
        setError(err.message || 'Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, [JSON.stringify(searchParams)]);

  return { properties, loading, error };
}

/**
 * Hook to fetch a single property
 */
export function useProperty(propertyId: string | null) {
  const [property, setProperty] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId) {
      setLoading(false);
      return;
    }

    async function fetchProperty() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await rentalwiseAPI.getProperty(propertyId);
        const transformedProperty = transformProperty(data);
        setProperty(transformedProperty);
      } catch (err: any) {
        console.error('Error fetching property:', err);
        setError(err.message || 'Failed to fetch property');
      } finally {
        setLoading(false);
      }
    }

    fetchProperty();
  }, [propertyId]);

  return { property, loading, error };
}

/**
 * Hook to check availability
 */
export function useAvailability(
  propertyId: string | null,
  checkIn: string | null,
  checkOut: string | null
) {
  const [availability, setAvailability] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId || !checkIn || !checkOut) {
      setAvailability(null);
      setLoading(false);
      return;
    }

    async function checkAvailability() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await rentalwiseAPI.checkAvailability(propertyId!, checkIn!, checkOut!);
        setAvailability(data);
      } catch (err: any) {
        console.error('Error checking availability:', err);
        setError(err.message || 'Failed to check availability');
      } finally {
        setLoading(false);
      }
    }

    checkAvailability();
  }, [propertyId, checkIn, checkOut]);

  return { availability, loading, error };
}

/**
 * Hook to search properties
 */
export function usePropertySearch() {
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (searchParams: RentalWiseSearchParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await rentalwiseAPI.searchProperties(searchParams);
      const transformedProperties = transformProperties(response.data);
      setResults(transformedProperties);
      
      return transformedProperties;
    } catch (err: any) {
      console.error('Error searching properties:', err);
      setError(err.message || 'Failed to search properties');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResults([]);
    setError(null);
  };

  return { results, loading, error, search, reset };
}

/**
 * Hook to create a reservation
 */
export function useCreateReservation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createReservation = async (reservationData: any) => {
    try {
      setLoading(true);
      setError(null);
      
      const reservation = await rentalwiseAPI.createReservation(reservationData);
      return reservation;
    } catch (err: any) {
      console.error('Error creating reservation:', err);
      setError(err.message || 'Failed to create reservation');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createReservation, loading, error };
}

/**
 * Hook to get pricing quote
 */
export function usePricingQuote(
  propertyId: string | null,
  checkIn: string | null,
  checkOut: string | null,
  guests: number = 1
) {
  const [quote, setQuote] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!propertyId || !checkIn || !checkOut) {
      setQuote(null);
      setLoading(false);
      return;
    }

    async function fetchQuote() {
      try {
        setLoading(true);
        setError(null);
        
        const data = await rentalwiseAPI.getPricingQuote(propertyId!, checkIn!, checkOut!, guests);
        setQuote(data);
      } catch (err: any) {
        console.error('Error fetching quote:', err);
        setError(err.message || 'Failed to fetch pricing quote');
      } finally {
        setLoading(false);
      }
    }

    fetchQuote();
  }, [propertyId, checkIn, checkOut, guests]);

  return { quote, loading, error };
}
