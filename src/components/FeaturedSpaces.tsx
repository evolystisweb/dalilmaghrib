import { SpaceCard } from './SpaceCard';
import { Button } from '@/components/ui/button';
import { useSpaces } from '@/hooks/useSpaces';

const FeaturedSpaces = () => {
  const { data: spaces, isLoading } = useSpaces({ isFeatured: true, limit: 6 });

  return (
    <section id="spaces" className="py-20 bg-background star-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-moroccan-gold/20 text-moroccan-gold text-sm font-medium mb-4">
            Sélection
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Espaces populaires
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Les établissements les mieux notés par notre communauté. Découvrez leurs avis authentiques.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {spaces?.map((space, index) => (
              <div
                key={space.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <SpaceCard space={space} />
              </div>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button variant="outline" size="lg">
            Voir plus d'espaces
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSpaces;
