import { useParams } from 'react-router-dom';
import { useSpace } from '@/hooks/useSpaces';
import { useReviews, useCreateReview } from '@/hooks/useReviews';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import StarRating from '@/components/StarRating';
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Twitter } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export default function SpaceDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { data: space, isLoading } = useSpace(slug || '');
  const { data: reviews } = useReviews(space?.id || '');
  const createReview = useCreateReview();

  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: '',
  });

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      toast.error('Vous devez être connecté pour laisser un avis');
      return;
    }

    if (!space) return;

    try {
      await createReview.mutateAsync({
        space_id: space.id,
        rating: reviewForm.rating,
        title: reviewForm.title,
        comment: reviewForm.comment,
      });

      setIsReviewDialogOpen(false);
      setReviewForm({ rating: 5, title: '', comment: '' });
      toast.success('Avis publié avec succès');
    } catch (error) {
      toast.error('Erreur lors de la publication de l\'avis');
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-gray-200 rounded-lg"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!space) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl font-bold">Espace non trouvé</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="relative h-96 rounded-lg overflow-hidden mb-8">
          <img
            src={space.image_url || ''}
            alt={space.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{space.name}</h1>
                <div className="flex items-center gap-4">
                  <StarRating rating={space.rating} />
                  <span className="text-sm text-gray-600">
                    {space.review_count} avis
                  </span>
                  {space.price_range && (
                    <Badge variant="secondary">{space.price_range}</Badge>
                  )}
                </div>
              </div>
              {space.logo_url && (
                <img
                  src={space.logo_url}
                  alt={`${space.name} logo`}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
            </div>

            {space.description && (
              <p className="text-gray-700 mb-6 leading-relaxed">
                {space.description}
              </p>
            )}

            <Separator className="my-6" />

            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Avis</h2>
                <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>Laisser un avis</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Laisser un avis</DialogTitle>
                      <DialogDescription>
                        Partagez votre expérience avec {space.name}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <Label>Note</Label>
                        <div className="flex gap-2 mt-2">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, rating })}
                              className={`text-2xl ${
                                rating <= reviewForm.rating
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="title">Titre</Label>
                        <Input
                          id="title"
                          value={reviewForm.title}
                          onChange={(e) =>
                            setReviewForm({ ...reviewForm, title: e.target.value })
                          }
                          placeholder="Résumé de votre expérience"
                        />
                      </div>
                      <div>
                        <Label htmlFor="comment">Commentaire</Label>
                        <Textarea
                          id="comment"
                          value={reviewForm.comment}
                          onChange={(e) =>
                            setReviewForm({ ...reviewForm, comment: e.target.value })
                          }
                          placeholder="Décrivez votre expérience..."
                          rows={4}
                        />
                      </div>
                      <Button type="submit" className="w-full">
                        Publier l'avis
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="space-y-4">
                {reviews && reviews.length > 0 ? (
                  reviews.map((review) => (
                    <Card key={review.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-lg">
                              {review.title || 'Avis'}
                            </CardTitle>
                            <CardDescription>
                              {review.user_profile?.full_name || 'Utilisateur'}
                            </CardDescription>
                          </div>
                          <StarRating rating={review.rating} size="sm" />
                        </div>
                      </CardHeader>
                      {review.comment && (
                        <CardContent>
                          <p className="text-gray-700">{review.comment}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {new Date(review.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </CardContent>
                      )}
                    </Card>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Aucun avis pour le moment. Soyez le premier à laisser un avis!
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Informations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {space.address && (
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-gray-600">Adresse</p>
                      <p className="text-sm">{space.address}</p>
                    </div>
                  </div>
                )}

                {space.phone && (
                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-gray-600">Téléphone</p>
                      <a href={`tel:${space.phone}`} className="text-sm hover:underline">
                        {space.phone}
                      </a>
                    </div>
                  </div>
                )}

                {space.email && (
                  <div className="flex gap-3">
                    <Mail className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-gray-600">Email</p>
                      <a
                        href={`mailto:${space.email}`}
                        className="text-sm hover:underline"
                      >
                        {space.email}
                      </a>
                    </div>
                  </div>
                )}

                {space.website && (
                  <div className="flex gap-3">
                    <Globe className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm text-gray-600">Site web</p>
                      <a
                        href={space.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:underline"
                      >
                        Visiter le site
                      </a>
                    </div>
                  </div>
                )}

                {space.city && (
                  <div>
                    <p className="font-medium text-sm text-gray-600 mb-1">Ville</p>
                    <Badge>{space.city.name}</Badge>
                  </div>
                )}

                {space.category && (
                  <div>
                    <p className="font-medium text-sm text-gray-600 mb-1">Catégorie</p>
                    <Badge variant="secondary">{space.category.name}</Badge>
                  </div>
                )}

                {space.social_links && space.social_links.length > 0 && (
                  <div>
                    <p className="font-medium text-sm text-gray-600 mb-2">
                      Réseaux sociaux
                    </p>
                    <div className="flex gap-2">
                      {space.social_links.map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          {getSocialIcon(link.platform)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
