export type Transaction = {
    id: string
    date: Date
    totalValue: number
    transactionType: 'PURCHASE' | 'SELLING' | 'INSTANT_SELL'
    tax: number
    userId: string
    items: TransactionItem[]
}

export type TransactionItem = {
    itemId: string
    value: number
}