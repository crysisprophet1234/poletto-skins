import { get } from '@/services/api'
import { SteamItem } from '@/types/entities/steam-item'
import { TransactionItem, Transaction } from '@/types/entities/transaction'
import { Skeleton, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { useEffect, useState } from 'react'

/*
interface PurchaseDetailsTableProps {
    itemDetails: SteamItem[]
}
*/

type CombinedItem = SteamItem & Pick<TransactionItem, 'value'>

interface TransactionDetailsTableProps {
    transaction: Transaction
}

const TransactionDetailsTable = ({ transaction }: TransactionDetailsTableProps) => {

    const [itemDetails, setItemsDetails] = useState<CombinedItem[]>([])

    const fetchItemDetails = async (items: TransactionItem[]) => {
        console.log(items)
        const itemDetailsPromises = items.map(item => get<SteamItem>(`/items/${item.itemId}`))
        const itemDetails = await Promise.all(itemDetailsPromises)
        return itemDetails
    }

    useEffect(() => {
        const fetchAndCombineDetails = async () => {

            const combinedDetails: CombinedItem[] = []
            const steamItems = await fetchItemDetails(transaction.items)
            const combinedItems = steamItems.map((steamItem, index) => ({
                ...steamItem,
                ...transaction.items[index],
            }))
            combinedDetails.push(...combinedItems)

            setItemsDetails(combinedDetails)
        }

        if (transaction.items.length > 0) {
            fetchAndCombineDetails()
        }
    }, [transaction])

    return (
        <Table
            size='small'
            aria-label='purchases'
            sx={{
                '& .MuiTableCell-root': {
                    color: 'white',
                    padding: '16px 8px',
                    fontSize: '16px',
                    borderRight: '1px solid rgba(255, 255, 255, 0.12)'
                },
                '& .MuiTableCell-root:last-child': {
                    borderRight: 'none'
                },
                '& .MuiTableBody-root .MuiTableRow-root:last-child .MuiTableCell-root': {
                    borderBottom: 'none'
                },
                '& .MuiTableHead-root .MuiTableCell-root': {
                    fontWeight: '600'
                }
            }}
        >
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Float</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Adesivos</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {!itemDetails ? (
                    <Stack spacing={1}>
                        <Skeleton variant='text' height={60} sx={{ fontSize: '1rem' }} />
                        <Skeleton variant='rectangular' height={60} />
                        <Skeleton variant='rectangular' height={60} />
                        <Skeleton variant='rectangular' height={60} />
                        <Skeleton variant='rectangular' height={60} />
                    </Stack>
                ) : (
                    itemDetails.map((item) => (
                        <TableRow key={item.assetId}>
                            <TableCell component='th' scope='row'>
                                {item.assetId}
                            </TableCell>
                            <TableCell>{item.fullItemName}</TableCell>
                            <TableCell>{item.floatValue}</TableCell>
                            <TableCell>{item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                            <TableCell>
                                {item.stickers.map((sticker, index) => (
                                    <Stack key={index} direction={'column'}>
                                        {sticker.name}
                                    </Stack>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    )
}

export default TransactionDetailsTable