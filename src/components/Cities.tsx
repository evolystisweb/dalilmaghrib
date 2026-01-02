import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCities } from '@/hooks/useCities';

const Cities = () => {
  const { data: cities, isLoading } = useCities();

  return (
    <section id="cities" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-moroccan-deep-blue/10 text-moroccan-deep-blue text-sm font-medium mb-4">
            Destinations
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Villes du Maroc
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            De Tanger au nord jusqu'à Agadir au sud, découvrez les trésors cachés de chaque ville marocaine.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities?.map((city, index) => (
              <Link
                key={city.id}
                to={`/city/${city.slug}`}
                className="group relative rounded-2xl overflow-hidden cursor-pointer animate-fade-in h-64"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={city.image_url || '/placeholder.svg'}
                  alt={city.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-moroccan-gold mb-2">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-moroccan-cream mb-2">
                    {city.name}
                  </h3>
                  {city.description && (
                    <p className="text-moroccan-cream/80 text-sm line-clamp-2">
                      {city.description}
                    </p>
                  )}
                </div>

                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Cities;
