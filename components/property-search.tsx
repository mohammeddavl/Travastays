'use client';

import { useState } from 'react';
import { usePropertySearch } from '@/hooks/use-rentalwise';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PropertyCard } from '@/components/property-card';
import { Search, Loader2 } from 'lucide-react';
import type { RentalWiseSearchParams } from '@/types/rentalwise';

export function PropertySearch() {
  const { results, loading, error, search } = usePropertySearch();
  const [searchParams, setSearchParams] = useState<RentalWiseSearchParams>({
    checkIn: '',
    checkOut: '',
    guests: 1,
    location: '',
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty values
    const params: RentalWiseSearchParams = {};
    if (searchParams.checkIn) params.checkIn = searchParams.checkIn;
    if (searchParams.checkOut) params.checkOut = searchParams.checkOut;
    if (searchParams.guests) params.guests = searchParams.guests;
    if (searchParams.location) params.location = searchParams.location;
    if (searchParams.minPrice) params.minPrice = searchParams.minPrice;
    if (searchParams.maxPrice) params.maxPrice = searchParams.maxPrice;

    await search(params);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="space-y-4 bg-card p-6 rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="City or property name"
              value={searchParams.location}
              onChange={(e) =>
                setSearchParams({ ...searchParams, location: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkIn">Check-in</Label>
            <Input
              id="checkIn"
              type="date"
              value={searchParams.checkIn}
              onChange={(e) =>
                setSearchParams({ ...searchParams, checkIn: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkOut">Check-out</Label>
            <Input
              id="checkOut"
              type="date"
              value={searchParams.checkOut}
              onChange={(e) =>
                setSearchParams({ ...searchParams, checkOut: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests">Guests</Label>
            <Input
              id="guests"
              type="number"
              min="1"
              value={searchParams.guests}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  guests: parseInt(e.target.value) || 1,
                })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="minPrice">Min Price (per night)</Label>
            <Input
              id="minPrice"
              type="number"
              min="0"
              placeholder="0"
              value={searchParams.minPrice || ''}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  minPrice: parseInt(e.target.value) || undefined,
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxPrice">Max Price (per night)</Label>
            <Input
              id="maxPrice"
              type="number"
              min="0"
              placeholder="1000"
              value={searchParams.maxPrice || ''}
              onChange={(e) =>
                setSearchParams({
                  ...searchParams,
                  maxPrice: parseInt(e.target.value) || undefined,
                })
              }
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="mr-2 h-4 w-4" />
              Search Properties
            </>
          )}
        </Button>
      </form>

      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Found {results.length} {results.length === 1 ? 'property' : 'properties'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
