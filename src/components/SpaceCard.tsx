import { MapPin, Heart, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StarRating from './StarRating';
import { Link } from 'react-router-dom';
import { Space } from '@/lib/supabase';

interface SpaceCardProps {
  space: Space;
}

export const SpaceCard = ({ space }: SpaceCardProps) => {
  return (
    <Card className="group overflow-hidden hover:-translate-y-2 transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={space.image_url || '/placeholder.svg'}
          alt={space.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {space.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
              {space.category.name}
            </span>
          </div>
        )}

        <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors">
          <Heart className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
        </button>
      </div>

      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {space.name}
            </h3>
            {space.city && (
              <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{space.city.name}</span>
              </div>
            )}
          </div>
          {space.price_range && (
            <span className="text-sm font-medium text-muted-foreground">
              {space.price_range}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={space.rating} showValue />
          <span className="text-muted-foreground text-sm">
            ({space.review_count} avis)
          </span>
        </div>

        {space.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {space.description}
          </p>
        )}

        <div className="flex gap-3">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to={`/space/${space.slug}`}>
              Voir les avis
            </Link>
          </Button>
          <Button variant="moroccan" size="sm" className="flex-1" asChild>
            <Link to={`/space/${space.slug}`}>
              <ExternalLink className="w-4 h-4 mr-1" />
              Détails
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
