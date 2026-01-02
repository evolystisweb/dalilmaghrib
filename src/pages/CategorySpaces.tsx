import { useParams, Link } from 'react-router-dom';
import { useSpaces } from '@/hooks/useSpaces';
import { useCategories } from '@/hooks/useCategories';
import { SpaceCard } from '@/components/SpaceCard';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function CategorySpaces() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { data: spaces, isLoading } = useSpaces({ categorySlug });
  const { data: categories } = useCategories();

  const category = categories?.find((c) => c.slug === categorySlug);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-7xl mx-auto">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link to="/">
            <Home className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {category?.name || 'Catégorie'}
          </h1>
          {category?.description && (
            <p className="text-gray-600">{category.description}</p>
          )}
        </div>

        {spaces && spaces.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun espace trouvé dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
}
