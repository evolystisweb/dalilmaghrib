import { Utensils, Sparkles, Hotel, Activity, Landmark, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCategories } from '@/hooks/useCategories';

const iconMap: Record<string, typeof Utensils> = {
  utensils: Utensils,
  hotel: Hotel,
  spa: Sparkles,
  activity: Activity,
  landmark: Landmark,
  'shopping-bag': ShoppingBag,
};

const colorMap: string[] = [
  'from-primary to-moroccan-gold',
  'from-moroccan-deep-blue to-moroccan-teal',
  'from-moroccan-emerald to-moroccan-teal',
  'from-moroccan-gold to-primary',
  'from-primary to-moroccan-deep-blue',
  'from-moroccan-teal to-moroccan-emerald',
];

const Categories = () => {
  const { data: categories, isLoading } = useCategories();

  return (
    <section id="categories" className="py-20 bg-background moroccan-pattern">
      <div className="container mx-auto px-4">
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

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories?.map((category, index) => {
              const Icon = iconMap[category.icon || 'utensils'] || Utensils;
              const color = colorMap[index % colorMap.length];

              return (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="group relative bg-card rounded-2xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>

                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-muted-foreground text-sm mb-3">
                      {category.description}
                    </p>
                  )}

                  <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
