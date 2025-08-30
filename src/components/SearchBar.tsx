import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  Search,
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Plus,
  Minus,
} from 'lucide-react';
import { cities } from '@/data/cities';

interface SearchBarProps {
  className?: string;
  variant?: 'default' | 'compact';
}

const SearchBar: React.FC<SearchBarProps> = ({ className, variant = 'default' }) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date());
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    new Date(Date.now() + 86400000)
  );
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    if (value.length > 0) {
      const filtered = cities.filter((city) =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 8));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setDestination(city);
    setShowSuggestions(false);
  };

  const handleSearch = () => {
    const params = new URLSearchParams({
      destination,
      checkIn: checkIn?.toISOString() || '',
      checkOut: checkOut?.toISOString() || '',
      guests: guests.toString(),
      rooms: rooms.toString(),
    });
    navigate(`/search?${params.toString()}`);
  };

  if (variant === 'compact') {
    return (
      <div className={cn('flex flex-col sm:flex-row gap-2', className)}>
        <div className="relative flex-1">
          <Input
            placeholder="Where are you going?"
            value={destination}
            onChange={(e) => handleDestinationChange(e.target.value)}
            className="pl-10 input-glass"
          />
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button
          onClick={handleSearch}
          variant="gradient"
          className="hover-lift"
        >
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'glass rounded-xl p-4 shadow-lg',
        className
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="relative" ref={suggestionsRef}>
          <Label className="text-xs text-muted-foreground mb-1">
            Destination
          </Label>
          <div className="relative">
            <Input
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => handleDestinationChange(e.target.value)}
              onFocus={() => destination && setShowSuggestions(true)}
              className="pl-10 input-glass"
            />
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute z-50 w-full mt-1 glass rounded-lg shadow-xl max-h-60 overflow-auto">
              {suggestions.map((city) => (
                <button
                  key={city}
                  className="w-full text-left px-4 py-2 hover:bg-accent text-sm transition-colors"
                  onClick={() => handleSuggestionClick(city)}
                >
                  <MapPin className="inline h-3 w-3 mr-2 text-muted-foreground" />
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Check-in Date */}
        <div>
          <Label className="text-xs text-muted-foreground mb-1">
            Check-in
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal input-glass',
                  !checkIn && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, 'PPP') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 glass" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                disabled={(date) => date < new Date()}
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div>
          <Label className="text-xs text-muted-foreground mb-1">
            Check-out
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal input-glass',
                  !checkOut && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, 'PPP') : 'Select date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 glass" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                disabled={(date) =>
                  date < (checkIn || new Date()) ||
                  date < new Date()
                }
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests & Rooms */}
        <div>
          <Label className="text-xs text-muted-foreground mb-1">
            Guests & Rooms
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal input-glass"
              >
                <Users className="mr-2 h-4 w-4" />
                {guests} guests, {rooms} room{rooms > 1 ? 's' : ''}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 glass">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Guests</span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{guests}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => setGuests(guests + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Rooms</span>
                  <div className="flex items-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => setRooms(Math.max(1, rooms - 1))}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center">{rooms}</span>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8"
                      onClick={() => setRooms(rooms + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          onClick={handleSearch}
          variant="gradient"
          size="lg"
          className="hover-lift"
        >
          <Search className="h-5 w-5 mr-2" />
          Search Hotels
        </Button>
      </div>
    </div>
  );
};



export default SearchBar;