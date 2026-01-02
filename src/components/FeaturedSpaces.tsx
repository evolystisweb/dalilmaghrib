import SpaceCard from './SpaceCard';
import { Button } from '@/components/ui/button';

const featuredSpaces = [
  {
    id: '1',
    name: 'Le Jardin Secret',
    category: 'Restaurant',
    city: 'Marrakech',
    address: 'Rue Mouassine, Médina',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    rating: 4.8,
    reviewCount: 234,
    priceRange: '€€€',
    isOpen: true,
    reviews: [
      {
        author: 'Sarah M.',
        rating: 5,
        comment: 'Un cadre magnifique et une cuisine marocaine authentique. Le tajine était exceptionnel!',
        date: '2024-01-15',
      },
    ],
  },
  {
    id: '2',
    name: 'Riad Yasmine',
    category: 'Hébergement',
    city: 'Marrakech',
    address: 'Derb Sidi Ahmed Soussi',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&q=80',
    rating: 4.9,
    reviewCount: 567,
    priceRange: '€€€€',
    isOpen: true,
    reviews: [
      {
        author: 'Pierre L.',
        rating: 5,
        comment: 'Le plus beau riad que j\'ai visité. Service impeccable et petit-déjeuner divin.',
        date: '2024-01-10',
      },
    ],
  },
  {
    id: '3',
    name: 'Hammam Mouassine',
    category: 'Bien-être',
    city: 'Marrakech',
    address: 'Rue Mouassine 32',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80',
    rating: 4.6,
    reviewCount: 189,
    priceRange: '€€',
    isOpen: true,
    reviews: [
      {
        author: 'Amina K.',
        rating: 4,
        comment: 'Expérience relaxante dans un hammam traditionnel. Le gommage était parfait.',
        date: '2024-01-08',
      },
    ],
  },
  {
    id: '4',
    name: 'Rick\'s Café',
    category: 'Restaurant',
    city: 'Casablanca',
    address: '248 Bd Sour Jdid',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&q=80',
    rating: 4.5,
    reviewCount: 412,
    priceRange: '€€€',
    isOpen: false,
    reviews: [
      {
        author: 'Michel D.',
        rating: 5,
        comment: 'Ambiance unique inspirée du film. La cuisine internationale est excellente.',
        date: '2024-01-05',
      },
    ],
  },
  {
    id: '5',
    name: 'Spa Cinq Mondes',
    category: 'Bien-être',
    city: 'Rabat',
    address: 'Avenue Mohammed V',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
    rating: 4.7,
    reviewCount: 156,
    priceRange: '€€€€',
    isOpen: true,
    reviews: [
      {
        author: 'Leila B.',
        rating: 5,
        comment: 'Le meilleur spa de Rabat. Les massages sont divins et le personnel très professionnel.',
        date: '2024-01-12',
      },
    ],
  },
  {
    id: '6',
    name: 'Café Clock',
    category: 'Café',
    city: 'Fès',
    address: 'Derb el Magana, Talaa Kbira',
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&q=80',
    rating: 4.4,
    reviewCount: 298,
    priceRange: '€€',
    isOpen: true,
    reviews: [
      {
        author: 'Omar H.',
        rating: 4,
        comment: 'Café culturel avec vue sur la médina. Le burger de chameau est à essayer!',
        date: '2024-01-03',
      },
    ],
  },
];

const FeaturedSpaces = () => {
  return (
    <section id="spaces" className="py-20 bg-background star-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
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

        {/* Spaces Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredSpaces.map((space, index) => (
            <div
              key={space.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <SpaceCard space={space} />
            </div>
          ))}
        </div>

        {/* Load More */}
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
