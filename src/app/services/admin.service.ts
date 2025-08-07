import { inject, Injectable } from '@angular/core';
import { Transaction } from '@app/models/transaction.model';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';
import { Category } from '@app/models/category.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly supabaseSvc = inject(SupabaseService)
  private readonly authSvc = inject(AuthService)


  async getExpenseCategories(): Promise<Category[]> {
    const user = this.authSvc.user$.value
    if (!user) {
      throw new Error('User not authenticated');
    }
    const { data, error } = await this.supabaseSvc.supabase.from("categories").select()
      .filter("type", "eq", "expense")
      .order("name", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getIncomeCategories(): Promise<Category[]> {
    const user = this.authSvc.user$.value
    if (!user) {
      throw new Error('User not authenticated');
    }
    const { data, error } = await this.supabaseSvc.supabase.from("categories").select()
      .filter("type", "eq", "revenue")
      .order("name", { ascending: true });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

}
