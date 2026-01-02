import { useQuery } from '@tanstack/react-query';
import { supabase, City } from '@/lib/supabase';

export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .order('name');

      if (error) throw error;
      return data as City[];
    },
  });
};
