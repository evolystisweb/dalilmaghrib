import { MapPin } from 'lucide-react';

const cities = [
  {
    name: 'Marrakech',
    region: 'Marrakech-Safi',
    spaces: 523,
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&q=80',
    featured: true,
  },
  {
    name: 'Casablanca',
    region: 'Casablanca-Settat',
    spaces: 687,
    image: 'https://images.unsplash.com/photo-1577147443647-81856d5d0b90?w=600&q=80',
    featured: true,
  },
  {
    name: 'Fès',
    region: 'Fès-Meknès',
    spaces: 342,
    image: 'https://images.unsplash.com/photo-1548017544-22c1a8f1d9c2?w=600&q=80',
    featured: true,
  },
  {
    name: 'Rabat',
    region: 'Rabat-Salé-Kénitra',
    spaces: 456,
    image: 'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=600&q=80',
    featured: false,
  },
  {
    name: 'Tanger',
    region: 'Tanger-Tétouan-Al Hoceïma',
    spaces: 298,
    image: 'https://images.unsplash.com/photo-1553522991-71439aa62779?w=600&q=80',
    featured: false,
  },
  {
    name: 'Agadir',
    region: 'Souss-Massa',
    spaces: 234,
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=600&q=80',
    featured: false,
  },
];

const Cities = () => {
  return (
    <section id="cities" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
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

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <div
              key={city.name}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer animate-fade-in ${
                city.featured ? 'md:row-span-2' : ''
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                minHeight: city.featured ? '400px' : '200px'
              }}
            >
              {/* Image */}
              <img
                src={city.image}
                alt={city.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-moroccan-gold mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{city.region}</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-moroccan-cream mb-2">
                  {city.name}
                </h3>
                <p className="text-moroccan-cream/80 text-sm">
                  {city.spaces} espaces à découvrir
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cities;
