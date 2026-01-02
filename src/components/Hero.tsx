import { Search, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-morocco.jpg';

const Hero = () => {
  const popularCities = ['Marrakech', 'Casablanca', 'Fès', 'Rabat', 'Tanger'];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Marrakech, Maroc"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-foreground/70" />
      </div>

      {/* Moroccan Pattern Overlay */}
      <div className="absolute inset-0 moroccan-pattern opacity-20" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-8 animate-fade-in">
            <MapPin className="w-4 h-4 text-moroccan-gold" />
            <span className="text-moroccan-cream text-sm font-medium">
              +2000 espaces à découvrir au Maroc
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-moroccan-cream mb-6 animate-slide-up">
            Découvrez les meilleurs
            <span className="block text-moroccan-gold mt-2">espaces du Maroc</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-moroccan-cream/80 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Gastronomie, hébergement, beauté, transport et plus encore. 
            Trouvez et évaluez les meilleurs établissements près de chez vous.
          </p>

          {/* Search Bar */}
          <div className="bg-background/95 backdrop-blur-md rounded-2xl p-3 shadow-elevated max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Que recherchez-vous?"
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary/50 border-0 focus:ring-2 focus:ring-primary outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Ville"
                  className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary/50 border-0 focus:ring-2 focus:ring-primary outline-none text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <Button variant="moroccan" size="xl" className="md:w-auto">
                <Search className="w-5 h-5 mr-2" />
                Rechercher
              </Button>
            </div>
          </div>

          {/* Popular Cities */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <span className="text-moroccan-cream/60 text-sm">Populaires:</span>
            {popularCities.map((city) => (
              <button
                key={city}
                className="px-4 py-2 rounded-full bg-moroccan-cream/10 backdrop-blur-sm border border-moroccan-cream/20 text-moroccan-cream text-sm hover:bg-moroccan-cream/20 transition-colors"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-moroccan-cream/40 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-moroccan-gold animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
