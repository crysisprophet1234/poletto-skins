import { Sticker } from '@/types/entities/item'
import { Listing } from '@/types/entities/listing'
import { Transaction } from '@/types/entities/transaction'
import { Skeleton, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'

interface TransactionDetailsTableProps {
    transaction: Transaction
}

const TransactionDetailsTable = ({ transaction }: TransactionDetailsTableProps) => {

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
                {!transaction.listings ? (
                    <Stack spacing={1}>
                        <Skeleton variant='text' height={60} sx={{ fontSize: '1rem' }} />
                        <Skeleton variant='rectangular' height={60} />
                        <Skeleton variant='rectangular' height={60} />
                        <Skeleton variant='rectangular' height={60} />
                        <Skeleton variant='rectangular' height={60} />
                    </Stack>
                ) : (
                    transaction.listings.map((listing: Listing) => (
                        <TableRow key={listing.id}>
                            <TableCell component='th' scope='row'>
                                {listing.item.assetId}
                            </TableCell>
                            <TableCell>{listing.item.fullItemName}</TableCell>
                            <TableCell>{listing.item.floatValue}</TableCell>
                            <TableCell>{listing.listingPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
                            <TableCell>
                                {listing.item.stickers.map((sticker: Sticker, index: number) => (
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