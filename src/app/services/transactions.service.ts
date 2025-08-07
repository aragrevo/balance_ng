import { inject, Injectable } from '@angular/core';
import { MoneyTypes } from '@app/models/money-types.enum';
import { AuthService } from './auth.service';
import { SupabaseService } from './supabase.service';
import { Transaction } from '@app/models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private readonly supabaseSvc = inject(SupabaseService)
  private readonly authSvc = inject(AuthService)


  async getTransactions(startDate: string, endDate: string): Promise<Transaction[]> {
    const user = this.authSvc.user$.value
    if (!user) {
      throw new Error('User not authenticated');
    }
    const { data, error } = await this.supabaseSvc.supabase.from("expenses").select()
      .filter("userId", "eq", user.id)
      .filter("date", "gte", startDate)
      .filter("date", "lte", endDate)
      .order("date", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async saveTransaction(transaction: Transaction) {
    const user = this.authSvc.user$.value
    if (!user) {
      throw new Error('User not authenticated');
    }
    const { data, error } = await this.supabaseSvc.supabase.from("expenses").insert({
      ...transaction,
      money: MoneyTypes.EUR,
      userId: user.id,
      date: new Date().toISOString(),
    }).select()
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }


}
