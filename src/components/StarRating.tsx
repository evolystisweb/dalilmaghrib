import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
}

const StarRating = ({ rating, maxRating = 5, size = 'md', showValue = false }: StarRatingProps) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, index) => {
        const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;
        
        return (
          <div key={index} className="relative">
            {/* Background Star */}
            <Star className={`${sizeClasses[size]} text-muted stroke-muted-foreground/30`} />
            
            {/* Filled Star */}
            <div 
              className="absolute inset-0 overflow-hidden" 
              style={{ width: `${fillPercentage}%` }}
            >
              <Star className={`${sizeClasses[size]} text-moroccan-gold fill-moroccan-gold`} />
            </div>
          </div>
        );
      })}
      
      {showValue && (
        <span className={`ml-1 font-medium text-foreground ${textSizes[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
