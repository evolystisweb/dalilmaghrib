import { useQuery } from '@tanstack/react-query';
import { supabase, Space } from '@/lib/supabase';

export const useSpaces = (filters?: {
  categorySlug?: string;
  citySlug?: string;
  isFeatured?: boolean;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['spaces', filters],
    queryFn: async () => {
      let query = supabase
        .from('spaces')
        .select(`
          *,
          category:categories(*),
          city:cities(*),
          social_links(*)
        `)
        .order('rank', { ascending: true });

      if (filters?.categorySlug) {
        query = query.eq('category.slug', filters.categorySlug);
      }

      if (filters?.citySlug) {
        query = query.eq('city.slug', filters.citySlug);
      }

      if (filters?.isFeatured) {
        query = query.eq('is_featured', true);
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Space[];
    },
  });
};

export const useSpace = (slug: string) => {
  return useQuery({
    queryKey: ['space', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('spaces')
        .select(`
          *,
          category:categories(*),
          city:cities(*),
          social_links(*)
        `)
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data as Space | null;
    },
  });
};
