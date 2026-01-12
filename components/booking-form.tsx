'use client';

import { useState } from 'react';
import { useCreateReservation, usePricingQuote, useAvailability } from '@/hooks/use-rentalwise';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Calendar, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatPrice, calculateNights, validateDateRange } from '@/lib/rentalwise/transformers';

interface BookingFormProps {
  propertyId: string;
  propertyName: string;
  basePrice: number;
}

export function BookingForm({ propertyId, propertyName, basePrice }: BookingFormProps) {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { createReservation, loading: bookingLoading, error: bookingError } = useCreateReservation();
  const { quote, loading: quoteLoading } = usePricingQuote(
    propertyId,
    formData.checkIn,
    formData.checkOut,
    formData.guests
  );
  const { availability, loading: availabilityLoading } = useAvailability(
    propertyId,
    formData.checkIn,
    formData.checkOut
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    // Validate dates
    const dateValidation = validateDateRange(formData.checkIn, formData.checkOut);
    if (!dateValidation.valid) {
      setValidationError(dateValidation.error || 'Invalid dates');
      return;
    }

    // Check availability
    if (availability && !availability.available) {
      setValidationError('This property is not available for the selected dates');
      return;
    }

    try {
      const reservation = await createReservation({
        propertyId,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        guestInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
      });

      setBookingSuccess(true);
      console.log('Reservation created:', reservation);
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  if (bookingSuccess) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <CardTitle className="text-green-900">Booking Confirmed!</CardTitle>
          </div>
          <CardDescription className="text-green-700">
            Your reservation for {propertyName} has been confirmed. You will receive a confirmation email shortly.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const nights = formData.checkIn && formData.checkOut 
    ? calculateNights(formData.checkIn, formData.checkOut) 
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Your Stay</CardTitle>
        <CardDescription>
          {formatPrice(basePrice)}/night
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Date Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="checkIn">
                <Calendar className="inline mr-2 h-4 w-4" />
                Check-in
              </Label>
              <Input
                id="checkIn"
                type="date"
                required
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut">
                <Calendar className="inline mr-2 h-4 w-4" />
                Check-out
              </Label>
              <Input
                id="checkOut"
                type="date"
                required
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                min={formData.checkIn || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">
              <Users className="inline mr-2 h-4 w-4" />
              Number of Guests
            </Label>
            <Input
              id="guests"
              type="number"
              min="1"
              required
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
            />
          </div>

          {/* Availability Check */}
          {formData.checkIn && formData.checkOut && (
            <div className="p-4 bg-muted rounded-lg">
              {availabilityLoading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Checking availability...
                </div>
              ) : availability?.available ? (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Available for selected dates
                </div>
              ) : availability?.available === false ? (
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  Not available for selected dates
                </div>
              ) : null}
            </div>
          )}

          {/* Price Summary */}
          {nights > 0 && (
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>{formatPrice(basePrice)} × {nights} nights</span>
                <span>{formatPrice(basePrice * nights)}</span>
              </div>
              {quote && (
                <>
                  {quote.cleaningFee && (
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>{formatPrice(quote.cleaningFee)}</span>
                    </div>
                  )}
                  {quote.serviceFee && (
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>{formatPrice(quote.serviceFee)}</span>
                    </div>
                  )}
                  {quote.taxes && (
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>{formatPrice(quote.taxes)}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(quote.total)}</span>
                  </div>
                </>
              )}
              {quoteLoading && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Calculating total...
                </div>
              )}
            </div>
          )}

          {/* Guest Information */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold">Guest Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          {/* Errors */}
          {(validationError || bookingError) && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {validationError || bookingError}
              </AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={bookingLoading || (availability && !availability.available)}
          >
            {bookingLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              'Confirm Booking'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
