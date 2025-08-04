import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '@app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly supabaseSvc = inject(SupabaseService)
  private readonly router = inject(Router)

  user$ = new BehaviorSubject<User | null>(null);

  constructor() {
    this.supabaseSvc.supabase.auth.onAuthStateChange((event, session) => {
      console.log(event);
      console.log(session);

      if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION')) {
        this.user$.next({
          id: session!.user.id,
          name: session!.user.user_metadata['name'],
          avatar: session!.user.user_metadata['avatar_url'],
        });
        this.router.navigate(['/dashboard']);
        return;
      }
      this.user$.next(null);

    });
  }

  async signInWithGithub() {
    const res = await this.supabaseSvc.signInWithProvider('github')
    if (res.error) {
      throw res.error
    }
    return res.data
  }

  async signOut() {
    const res = await this.supabaseSvc.supabase.auth.signOut({
      scope: 'global',
    })
    if (res.error) {
      throw res.error
    }
    this.user$.next(null);
    this.router.navigate(['/']);
    return res.error === null
  }

}
