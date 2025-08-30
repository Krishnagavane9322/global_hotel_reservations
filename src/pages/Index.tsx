import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '@/components/SearchBar';
import HotelCard from '@/components/HotelCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockHotels } from '@/data/mockHotels';
import {
  TrendingUp,
  Award,
  Shield,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const featuredHotels = mockHotels.filter(h => h.featured).slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background/90 z-10" />
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=1920"
            alt="Luxury Hotel"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <Badge className="badge-gradient mb-4 animate-fade-in">
            <Sparkles className="h-3 w-3 mr-1" />
            Your Gateway to Global Luxury
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Discover Your Perfect
            <span className="gradient-text"> Hotel Stay</span>
          </h1>
          <p className="text-xl mb-8 text-foreground/80 animate-fade-in">
            Book from over 10,000 luxury hotels in 100+ cities worldwide
          </p>
          
          <div className="max-w-4xl mx-auto animate-scale-in">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gradient-to-b from-background to-accent/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Award, label: 'Best Price Guarantee', value: '100%' },
              { icon: Shield, label: 'Secure Booking', value: 'SSL Encrypted' },
              { icon: Clock, label: 'Instant Confirmation', value: '24/7 Support' },
              { icon: TrendingUp, label: 'Happy Customers', value: '2M+' },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-6 glass rounded-xl hover-lift"
              >
                <item.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-1">{item.label}</h3>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Hotels</h2>
              <p className="text-muted-foreground">
                Hand-picked properties with exceptional service
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/search')}
              className="hover-lift"
            >
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 px-4 bg-gradient-to-b from-accent/20 to-background">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { city: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400' },
              { city: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400' },
              { city: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400' },
              { city: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400' },
            ].map((dest) => (
              <div
                key={dest.city}
                className="relative h-48 rounded-xl overflow-hidden cursor-pointer hover-lift"
                onClick={() => navigate(`/search?destination=${dest.city}`)}
              >
                <img
                  src={dest.image}
                  alt={dest.city}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white font-bold text-lg">{dest.city}</h3>
                  <p className="text-white/80 text-sm">{dest.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;