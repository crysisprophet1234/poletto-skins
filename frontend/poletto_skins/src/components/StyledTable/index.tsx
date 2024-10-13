import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import {
    Box,
    Collapse,
    IconButton,
    Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer,
    TableHead, TablePagination, TableRow
} from '@mui/material'
import { styled } from '@mui/material/styles'
import React, { ReactNode, useState } from 'react'

export interface Column {
    id: string
    label: string
    align?: 'left' | 'center' | 'right'
    render?: (value: unknown, rowData: Record<string, unknown>) => React.ReactNode
}

interface TableData extends Record<string, unknown> {
}

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#1c1a24',
        color: '#FFF',
        borderColor: '#666666',
        fontSize: 18,
        fontWeight: 600
    },
    [`&.${tableCellClasses.body}`]: {
        color: '#FFF',
        fontSize: 16,
        borderColor: '#666666'
    },
}))

const StyledTableRow = styled(TableRow)(() => ({
    '&:nth-of-type(odd)': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)'
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#403D4D'
    },
    '&:last-child td, &:last-child th': {
        border: 0
    }
}))

interface RowProps {
    row: TableData
    columns: Column[]
    renderCollapsibleContent: (row: TableData) => React.ReactNode
}

const Row: React.FC<RowProps> = ({ row, columns, renderCollapsibleContent }) => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <StyledTableRow>
                <StyledTableCell>
                    <IconButton
                        aria-label='expand row'
                        size='small'
                        sx={{
                            color: '#FFFFFF'
                        }}
                        onClick={() => {
                            setOpen(!open)
                        }}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </StyledTableCell>
                {columns.map((column) => (
                    <StyledTableCell key={column.id} align={column.align || 'left'}>
                        {column.render ? column.render(row[column.id], row) as ReactNode : row[column.id] as ReactNode}
                    </StyledTableCell>
                ))}
            </StyledTableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 1}>
                    <Collapse in={open} timeout='auto' unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {renderCollapsibleContent(row)}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}

interface StyledTableProps {
    data: TableData[]
    columns: Column[]
    renderCollapsibleContent: (row: TableData) => React.ReactNode
}

const StyledTable: React.FC<StyledTableProps> = ({ data, columns, renderCollapsibleContent }) => {
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    return (
        <>
            <TableContainer
                component={Paper}
                sx={{ backgroundColor: '#363445' }}
            >
                <Table sx={{ minWidth: 700 }} stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell />
                            {columns.map((column) => (
                                <StyledTableCell key={column.id} align={column.align || 'left'}>
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                                <Row key={index} row={row} columns={columns} renderCollapsibleContent={renderCollapsibleContent} />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component='div'
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    color: 'white',
                    position: 'sticky',
                    bottom: 0,
                    backgroundColor: '#363445',
                    zIndex: 1
                }}
            />
        </>
    )
}

export default StyledTable