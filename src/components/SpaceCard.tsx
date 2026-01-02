import { MapPin, Heart, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StarRating from './StarRating';

interface Review {
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface Space {
  id: string;
  name: string;
  category: string;
  city: string;
  address: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  isOpen: boolean;
  reviews: Review[];
}

interface SpaceCardProps {
  space: Space;
}

const SpaceCard = ({ space }: SpaceCardProps) => {
  return (
    <Card className="group overflow-hidden hover:-translate-y-2 transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={space.image}
          alt={space.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
            {space.category}
          </span>
        </div>

        {/* Favorite Button */}
        <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
          <Heart className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
        </button>

        {/* Open Status */}
        <div className="absolute bottom-4 left-4">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
            space.isOpen 
              ? 'bg-moroccan-emerald/90 text-primary-foreground' 
              : 'bg-destructive/90 text-destructive-foreground'
          }`}>
            <Clock className="w-3 h-3" />
            {space.isOpen ? 'Ouvert' : 'Fermé'}
          </div>
        </div>
      </div>

      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {space.name}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{space.city}</span>
            </div>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {space.priceRange}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={space.rating} showValue />
          <span className="text-muted-foreground text-sm">
            ({space.reviewCount} avis)
          </span>
        </div>

        {/* Latest Review */}
        {space.reviews.length > 0 && (
          <div className="bg-secondary/50 rounded-lg p-3 mb-4">
            <p className="text-sm text-muted-foreground line-clamp-2 italic">
              "{space.reviews[0].comment}"
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-medium text-foreground">
                — {space.reviews[0].author}
              </span>
              <StarRating rating={space.reviews[0].rating} size="sm" />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex-1">
            Voir les avis
          </Button>
          <Button variant="moroccan" size="sm" className="flex-1">
            <ExternalLink className="w-4 h-4 mr-1" />
            Détails
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SpaceCard;
