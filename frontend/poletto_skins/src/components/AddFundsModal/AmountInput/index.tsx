// AmountInput.tsx
import FormInputCurrency from '@/components/FormComponents/FormInputCurrency'
import { Box, Typography, Grid, Button, IconButton } from '@mui/material'
import { Control } from 'react-hook-form'
import { DepositSchemaType } from '..'
import { Clear } from '@mui/icons-material'

type AmountInputProps = {
    control: Control<DepositSchemaType>
    onAmountChange: (value: number) => void
}

const incrementValues = [1, 5, 10, 20, 50, 100]

const AmountInput = ({ control, onAmountChange }: AmountInputProps) => {

    return (   

        <Box display='flex' flexDirection='column' gap={2}>

            <Typography variant='body1' color='#FFF'>
                Insira o valor que deseja adicionar à sua conta.
            </Typography>

            <Box display='flex' alignItems='center'>

                <FormInputCurrency
                    label='Valor'
                    control={control}
                    name='amount'
                />

                <IconButton
                    onClick={() => onAmountChange(0)}
                    sx={{
                        ml: 1,
                        color: '#817e8f',
                        '&:hover': {
                            color: '#bbb9c7',
                        },
                    }}
                >
                    <Clear fontSize='medium' />
                </IconButton>

            </Box>

            <Grid container spacing={1}>

                {incrementValues.map((value) => (

                    <Grid item xs={4} key={value}>
                        <Button
                            variant='contained'
                            onClick={() => onAmountChange(value)}
                            fullWidth
                            sx={{
                                bgcolor: '#403D4D',
                                color: '#FFF',
                                '&:hover': {
                                    bgcolor: '#4a4957',
                                },
                            }}
                        >
                            +{value}
                        </Button>
                    </Grid>

                ))}

            </Grid>

        </Box>

    )
}

export default AmountInput