import { useParams } from 'react-router-dom';
import { useSpaces } from '@/hooks/useSpaces';
import { useCities } from '@/hooks/useCities';
import { SpaceCard } from '@/components/SpaceCard';

export default function CitySpaces() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const { data: spaces, isLoading } = useSpaces({ citySlug });
  const { data: cities } = useCities();

  const city = cities?.find((c) => c.slug === citySlug);

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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{city?.name || 'Ville'}</h1>
          {city?.description && (
            <p className="text-gray-600">{city.description}</p>
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
            <p className="text-gray-600">Aucun espace trouvé dans cette ville.</p>
          </div>
        )}
      </div>
    </div>
  );
}
