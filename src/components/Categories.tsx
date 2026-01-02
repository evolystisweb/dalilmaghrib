import { Utensils, Car, Sparkles, Hotel, ShoppingBag, Stethoscope, GraduationCap, Dumbbell } from 'lucide-react';

const categories = [
  {
    icon: Utensils,
    name: 'Gastronomie',
    count: 458,
    description: 'Restaurants, cafés, pâtisseries',
    color: 'from-primary to-moroccan-gold',
  },
  {
    icon: Hotel,
    name: 'Hébergement',
    count: 312,
    description: 'Hôtels, riads, maisons d\'hôtes',
    color: 'from-moroccan-deep-blue to-moroccan-teal',
  },
  {
    icon: Sparkles,
    name: 'Beauté & Bien-être',
    count: 276,
    description: 'Salons, spas, hammams',
    color: 'from-moroccan-emerald to-moroccan-teal',
  },
  {
    icon: Car,
    name: 'Transport',
    count: 189,
    description: 'Location, taxis, transferts',
    color: 'from-moroccan-gold to-primary',
  },
  {
    icon: ShoppingBag,
    name: 'Shopping',
    count: 234,
    description: 'Boutiques, souks, artisanat',
    color: 'from-primary to-moroccan-deep-blue',
  },
  {
    icon: Stethoscope,
    name: 'Santé',
    count: 145,
    description: 'Cliniques, pharmacies, dentistes',
    color: 'from-moroccan-teal to-moroccan-emerald',
  },
  {
    icon: GraduationCap,
    name: 'Éducation',
    count: 98,
    description: 'Écoles, formations, cours',
    color: 'from-moroccan-deep-blue to-primary',
  },
  {
    icon: Dumbbell,
    name: 'Sport & Loisirs',
    count: 167,
    description: 'Salles de sport, clubs, activités',
    color: 'from-moroccan-gold to-moroccan-emerald',
  },
];

const Categories = () => {
  return (
    <section id="categories" className="py-20 bg-background moroccan-pattern">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Catégories
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Explorez par secteur
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trouvez exactement ce que vous cherchez parmi nos nombreuses catégories de services et d'espaces au Maroc.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <category.icon className="w-7 h-7 text-primary-foreground" />
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                {category.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                {category.description}
              </p>
              <span className="text-primary font-medium text-sm">
                {category.count} espaces
              </span>

              {/* Arrow */}
              <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
