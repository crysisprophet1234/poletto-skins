import StyledTable, { Column } from '@/components/StyledTable'
import TransactionDetailsTable from '@/components/TransactionDetailsTable'
import { useAuth } from '@/hooks/useAuth'
import { get } from '@/services/api'
import { Transaction } from '@/types/entities/transaction'
import { formatDate } from '@/utils/formatDate'
import { getTransactionTypeLabel } from '@/utils/getTransactionType'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

const History = () => {
    const { user } = useAuth()

    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await get<Transaction[]>(`/users/${user?.id}/transactions`)
                setTransactions(response)
            } catch (error) {
                console.error('Error fetching transactions:', error)
            }
        }

        fetchTransactions()
    }, [user])

    const columns: Column[] = [
        {
            id: 'id', label: 'ID', align: 'left'
        },
        {
            id: 'transactionType',
            label: 'Tipo',
            align: 'left',
            render: (_value, row) => (
                <span>
                    {getTransactionTypeLabel((row as Transaction).transactionType)}
                </span>
            )
        },
        {
            id: 'date', label: 'Data', align: 'left', render: (value) => (
                <span>
                    {formatDate(String(value))}
                </span>
            )
        },
        {
            id: 'totalValue', label: 'Valor Total', align: 'left', render: (value, row) => (
                <Stack direction={'row'}>

                    <Box
                        py={1}
                        px={2}
                        borderRadius={'8px 0px 0px 8px'}
                        sx={{
                            backgroundColor: (row as Transaction).transactionType == 'PURCHASE' ? '#f14668' : '#48c774'
                        }}
                    >
                        {(row as Transaction).transactionType == 'PURCHASE' ? '-' : '+'}
                    </Box>

                    <Box
                        py={1}
                        px={2}
                        borderRadius={'0px 8px 8px 0px'}
                        sx={{
                            backgroundColor: '#292733'
                        }}
                    >
                        <Typography>
                            {Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </Typography>
                    </Box>

                </Stack>
            )
        },
        {
            id: 'tax', label: 'Taxa', align: 'left', render: (value) => (
                <span>
                    {value ? `${value}%` : '-'}
                </span>
            )
        }
    ]

    const renderCollapsibleContent = (row: unknown) => {

        return (
            <TransactionDetailsTable transaction={row as Transaction} />
        )
    }

    return (
        <Paper sx={{
            padding: 3,
            backgroundColor: '#292733',
            borderRadius: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Typography variant='h4' sx={{ marginBottom: 2, color: 'white' }}>
                Histórico de Transações
            </Typography>
            <Box sx={{
                flexGrow: 1,
                overflow: 'auto',
                maxHeight: 'calc(100vh - 200px)',
                paddingRight: '12px',
                scrollbarGutter: 'stable',
                scrollbarColor: '#555261',
                '&::-webkit-scrollbar': {
                    width: '5px',
                    borderRadius: '5px'
                },
                '&::-webkit-scrollbar-thumb': {
                    backgroundColor: '#C85CD1',
                    borderRadius: '5px'
                },
                '&::-webkit-scrollbar-track': {
                    backgroundColor: '#555261',
                    borderRadius: '5px'
                },
                '&::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: '#D63FE9'
                }
            }}>
                <StyledTable
                    data={transactions}
                    columns={columns}
                    renderCollapsibleContent={renderCollapsibleContent}
                />
            </Box>
        </Paper>
    )
}

export default History