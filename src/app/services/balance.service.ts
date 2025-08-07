import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { MoneyTypes } from '@app/models/money-types.enum';
import { AuthService } from './auth.service';
import { BalanceData } from '@app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  private readonly supabaseSvc = inject(SupabaseService)
  private readonly authSvc = inject(AuthService)


  async getBalance(startDate: string, endDate: string): Promise<Record<MoneyTypes, BalanceData>> {
    const user = this.authSvc.user$.value
    if (!user) {
      throw new Error('User not authenticated');
    }
    const [dataIncomes, dataExpenses] = await Promise.all([
      this.supabaseSvc.supabase.from("revenues").select()
        .filter("userId", "eq", user.id)
        .filter("date", "gte", startDate),
      // .filter("money", "eq", moneyType),
      this.supabaseSvc.supabase.from("expenses").select()
        .filter("userId", "eq", user.id)
        .filter("date", "gte", startDate)
      // .filter("money", "eq", moneyType)
    ])
    const { data: incomes, error: incomesError } = dataIncomes;
    const { data: expenses, error: expensesError } = dataExpenses;


    if (incomesError || expensesError) {
      throw new Error(incomesError?.message || expensesError?.message);
    }

    return {
      [MoneyTypes.EUR]: {
        incomes: incomes?.reduce((acc, income) => income.money === MoneyTypes.EUR ? acc + income.cost : acc, 0),
        expenses: expenses?.reduce((acc, expense) => expense.money === MoneyTypes.EUR ? acc + expense.cost : acc, 0),
      },
      [MoneyTypes.COP]: {
        incomes: incomes?.reduce((acc, income) => income.money === MoneyTypes.COP ? acc + income.cost : acc, 0),
        expenses: expenses?.reduce((acc, expense) => expense.money === MoneyTypes.COP ? acc + expense.cost : acc, 0),
      },
    };
  }

}
