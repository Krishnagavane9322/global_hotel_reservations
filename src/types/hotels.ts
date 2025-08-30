export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  originalPrice?: number;
  images: string[];
  amenities: string[];
  description: string;
  rooms: Room[];
  coordinates: {
    lat: number;
    lng: number;
  };
  distance?: string;
  featured?: boolean;
  ecoFriendly?: boolean;
  petFriendly?: boolean;
  accessible?: boolean;
  freeBreakfast?: boolean;
  freeCancellation?: boolean;
}

export interface Room {
  id: string;
  type: string;
  beds: string;
  maxGuests: number;
  price: number;
  available: boolean;
  images: string[];
  amenities: string[];
}

export interface SearchFilters {
  priceRange: [number, number];
  rating: number;
  amenities: string[];
  sortBy: 'price' | 'rating' | 'distance';
  viewType: 'grid' | 'list' | 'map';
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  roomType: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  loyaltyPoints: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  bookings: Booking[];
  wishlist: string[];
}