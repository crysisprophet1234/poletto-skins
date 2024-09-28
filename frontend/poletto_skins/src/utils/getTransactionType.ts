import { Transaction } from '@/types/entities/transaction'


export const getTransactionTypeLabel = (type: Transaction['transactionType']): string => {
    switch (type) {
        case 'PURCHASE':
            return 'Compra'
        case 'INSTANT_SELL':
            return 'Venda Rápida'
        case 'SELLING':
            return 'Venda'

        default:
            return 'Tipo desconhecido'
    }
}