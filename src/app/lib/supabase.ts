import { createClient } from '@supabase/supabase-js';
import { environment } from '@app/environments/environment';

export const supabase = createClient(
  environment.supabaseUrl,
  environment.supabaseAnonKey,
  {
    auth: {
      flowType: 'pkce',
    },
  }
);