import { Listing } from '@/types/entities/listing'

export type Transaction = {
    id: string
    date: Date
    totalValue: number
    transactionType: 'PURCHASE' | 'SELLING' | 'INSTANT_SELL'
    tax: number
    userId: string
    listings: Listing[]
}