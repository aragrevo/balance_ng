import { Injectable } from '@angular/core';
import { environment } from '@app/environments/environment';
import { AuthSession, createClient, OAuthResponse, Provider, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  readonly supabase: SupabaseClient
  _session: AuthSession | null = null
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseAnonKey)
  }

  async signInWithProvider(provider: Provider): Promise<OAuthResponse> {

    return await this.supabase.auth.signInWithOAuth({
      provider
    });

  }

}
