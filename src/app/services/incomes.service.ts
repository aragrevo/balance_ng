import { inject, Injectable } from '@angular/core';
import { Transaction } from '@app/models/transaction.model';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  private readonly supabaseSvc = inject(SupabaseService)
  private readonly authSvc = inject(AuthService)


  async getIncomes(startDate: string, endDate: string): Promise<Transaction[]> {
    const user = this.authSvc.user$.value
    if (!user) {
      throw new Error('User not authenticated');
    }
    const { data, error } = await this.supabaseSvc.supabase.from("revenues").select()
      .filter("userId", "eq", user.id).filter("date", "gte", startDate)
      .order("date", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }


}
