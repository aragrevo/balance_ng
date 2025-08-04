export interface Transaction {
    id: string;
    money: string;
    description: string;
    date: string;
    observation?: string;
    cost: number
}