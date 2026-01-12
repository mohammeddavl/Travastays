'use client';

import { useEffect, useState } from 'react';
import { rentalwiseAPI } from '@/lib/rentalwise/api';
import { PropertyCard } from "@/components/property-card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function StaysGridRobust() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Fetching properties from RentalWise...');
        const response = await rentalwiseAPI.getProperties();
        console.log('✅ API Response:', response);
        
        // Handle different response formats
        let propertyList: any[] = [];
        
        if (Array.isArray(response)) {
          // Response is directly an array
          propertyList = response;
        } else if (response && typeof response === 'object') {
          // Response is an object, look for data property
          if (Array.isArray(response.data)) {
            propertyList = response.data;
          } else if (response.properties && Array.isArray(response.properties)) {
            propertyList = response.properties;
          } else if (response.items && Array.isArray(response.items)) {
            propertyList = response.items;
          } else {
            // Try to find any array in the response
            const arrayKey = Object.keys(response).find(key => Array.isArray(response[key]));
            if (arrayKey) {
              propertyList = response[arrayKey];
            }
          }
        }
        
        console.log('📦 Extracted properties:', propertyList.length, propertyList);
        
        // Transform properties to match our format
        const transformedProperties = propertyList.map((prop: any) => {
          // Handle different property formats
          return {
            id: prop.id || prop._id || prop.propertyId || String(Math.random()),
            name: prop.name || prop.title || prop.propertyName || 'Unnamed Property',
            location: formatLocation(prop),
            price: getPrice(prop),
            image: getImage(prop),
            amenities: getAmenities(prop),
            description: prop.description || prop.desc || '',
            bedrooms: prop.bedrooms || prop.beds || prop.capacity?.bedrooms || 1,
            bathrooms: prop.bathrooms || prop.baths || prop.capacity?.bathrooms || 1,
            guests: prop.guests || prop.maxGuests || prop.capacity?.guests || 2,
            images: getImages(prop),
          };
        });
        
        console.log('✨ Transformed properties:', transformedProperties);
        setProperties(transformedProperties);
        
      } catch (err: any) {
        console.error('❌ Error fetching properties:', err);
        setError(err.message || 'Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    }

    fetchProperties();
  }, []);

  // Helper functions
  function formatLocation(prop: any): string {
    if (prop.location) {
      if (typeof prop.location === 'string') return prop.location;
      if (prop.location.city && prop.location.state) {
        return `${prop.location.city}, ${prop.location.state}`;
      }
      if (prop.location.address) return prop.location.address;
    }
    return prop.city || prop.address || 'Unknown Location';
  }

  function getPrice(prop: any): number {
    return prop.price || 
           prop.basePrice || 
           prop.pricing?.basePrice || 
           prop.pricing?.price || 
           prop.rate || 
           prop.nightlyRate ||
           0;
  }

  function getImage(prop: any): string {
    if (prop.image) return prop.image;
    if (prop.primaryImage) return prop.primaryImage;
    if (prop.images && prop.images.length > 0) {
      const firstImage = prop.images[0];
      return typeof firstImage === 'string' ? firstImage : firstImage.url;
    }
    return '/placeholder.jpg';
  }

  function getImages(prop: any): string[] {
    if (prop.images && Array.isArray(prop.images)) {
      return prop.images.map((img: any) => 
        typeof img === 'string' ? img : img.url
      );
    }
    return [getImage(prop)];
  }

  function getAmenities(prop: any): string[] {
    if (prop.amenities && Array.isArray(prop.amenities)) {
      return prop.amenities;
    }
    if (prop.features && Array.isArray(prop.features)) {
      return prop.features;
    }
    return [];
  }

  // Render loading state
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error Loading Properties</AlertTitle>
        <AlertDescription>
          {error}
          <br />
          <br />
          <strong>Troubleshooting steps:</strong>
          <ul className="list-disc list-inside mt-2 text-sm">
            <li>Check that .env.local file exists with your API key</li>
            <li>Verify your API key is correct</li>
            <li>Check browser console (F12) for detailed errors</li>
            <li>Visit <a href="/stays-debug" className="underline">/stays-debug</a> for more information</li>
          </ul>
        </AlertDescription>
      </Alert>
    );
  }

  // Render empty state
  if (properties.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg mb-4">No properties found.</p>
        <p className="text-sm text-gray-500">
          The API returned successfully but with no properties.
          <br />
          Visit <a href="/stays-debug" className="underline text-blue-600">/stays-debug</a> to see the raw response.
        </p>
      </div>
    );
  }

  // Render properties
  return (
    <div className="space-y-4">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <p className="text-green-800 font-semibold">
          ✅ Successfully loaded {properties.length} properties from RentalWise API
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
}
