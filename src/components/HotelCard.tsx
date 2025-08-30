import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hotel } from '@/types/hotels';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Coffee,
  Heart,
  Users,
  Check,
} from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
  viewType?: 'grid' | 'list';
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel, viewType = 'grid' }) => {
  const navigate = useNavigate();

  const amenityIcons: { [key: string]: React.ReactNode } = {
    WiFi: <Wifi className="h-3 w-3" />,
    Parking: <Car className="h-3 w-3" />,
    Breakfast: <Coffee className="h-3 w-3" />,
  };

  if (viewType === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift glass">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 h-48 md:h-64 relative overflow-hidden">
            <img
              src={hotel.images[0]}
              alt={hotel.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
            {hotel.featured && (
              <Badge className="absolute top-2 left-2 badge-gradient">
                Featured
              </Badge>
            )}
            {hotel.originalPrice && (
              <Badge className="absolute top-2 right-2 bg-destructive text-white">
                -{Math.round((1 - hotel.pricePerNight / hotel.originalPrice) * 100)}%
              </Badge>
            )}
          </div>
          <CardContent className="flex-1 p-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold hover:text-primary transition-colors cursor-pointer"
                    onClick={() => navigate(`/hotels/${hotel.id}`)}>
                  {hotel.name}
                </h3>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                  <MapPin className="h-3 w-3" />
                  <span>{hotel.city}, {hotel.country}</span>
                  {hotel.distance && (
                    <span className="text-xs">• {hotel.distance}</span>
                  )}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="hover-scale"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center gap-4 mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-semibold">{hotel.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({hotel.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {hotel.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {hotel.amenities.slice(0, 5).map((amenity) => (
                <Badge key={amenity} variant="secondary" className="text-xs">
                  {amenityIcons[amenity] || null}
                  {amenity}
                </Badge>
              ))}
              {hotel.amenities.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{hotel.amenities.length - 5} more
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {hotel.freeCancellation && (
                <Badge variant="outline" className="text-xs text-success border-success">
                  <Check className="h-3 w-3 mr-1" />
                  Free Cancellation
                </Badge>
              )}
              {hotel.freeBreakfast && (
                <Badge variant="outline" className="text-xs text-info border-info">
                  <Coffee className="h-3 w-3 mr-1" />
                  Free Breakfast
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div>
                {hotel.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${hotel.originalPrice}
                  </span>
                )}
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">
                    ${hotel.pricePerNight}
                  </span>
                  <span className="text-sm text-muted-foreground">/night</span>
                </div>
              </div>
              <Button
                variant="gradient"
                onClick={() => navigate(`/hotels/${hotel.id}`)}
                className="hover-lift"
              >
                View Details
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover-lift glass">
      <div className="h-48 relative overflow-hidden">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        {hotel.featured && (
          <Badge className="absolute top-2 left-2 badge-gradient">
            Featured
          </Badge>
        )}
        {hotel.originalPrice && (
          <Badge className="absolute top-2 right-2 bg-destructive text-white">
            -{Math.round((1 - hotel.pricePerNight / hotel.originalPrice) * 100)}%
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white hover-scale"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-colors cursor-pointer"
            onClick={() => navigate(`/hotels/${hotel.id}`)}>
          {hotel.name}
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
          <MapPin className="h-3 w-3" />
          <span>{hotel.city}, {hotel.country}</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <Star className="h-4 w-4 fill-warning text-warning" />
          <span className="font-semibold">{hotel.rating}</span>
          <span className="text-sm text-muted-foreground">
            ({hotel.reviewCount})
          </span>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {hotel.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="secondary" className="text-xs">
              {amenity}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div>
            {hotel.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${hotel.originalPrice}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-primary">
                ${hotel.pricePerNight}
              </span>
              <span className="text-xs text-muted-foreground">/night</span>
            </div>
          </div>
          <Button
            variant="gradient"
            size="sm"
            onClick={() => navigate(`/hotels/${hotel.id}`)}
          >
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelCard;