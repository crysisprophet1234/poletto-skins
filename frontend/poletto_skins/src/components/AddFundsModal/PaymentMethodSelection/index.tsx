import { Apple, CreditCard, CurrencyBitcoin, Pix } from '@mui/icons-material'
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'

const paymentMethods = [
    { label: 'Pix', value: 'PIX', icon: <Pix fontSize='large' /> },
    { label: 'Cartão', value: 'CREDIT_CARD', icon: <CreditCard fontSize='large' /> },
    { label: 'Crypto', value: 'CRYPTO', icon: <CurrencyBitcoin fontSize='large' /> }, // TODO: find icon for paypal
    { label: 'Apple Pay', value: 'APPLE_PAY', icon: <Apple fontSize='large' /> }
]

type PaymentMethod = typeof paymentMethods[number]['value']

type PaymentMethodSelectionProps = {
    currentMethod: PaymentMethod,
    onMethodChange: (paymentMethod: PaymentMethod, label: string) => void
}

const PaymentMethodSelection = ({ currentMethod, onMethodChange }: PaymentMethodSelectionProps) => {

    return (

        <Box>

            <Typography variant='body1' color='#FFF' gutterBottom mt={2}>
                Método de Pagamento
            </Typography>

            <Grid container spacing={2}>

                {paymentMethods.map((method) => (

                    <Grid item xs={6} key={method.value}>

                        <Card
                            sx={{
                                bgcolor: currentMethod === method.value
                                    ? '#403D4D'
                                    : '#3a3947',
                                color: '#FFF',
                                border: currentMethod === method.value
                                    ? '2px solid #806cf5'
                                    : '2px solid transparent',
                                borderRadius: '0.5rem',
                            }}
                        >
                            <CardActionArea
                                onClick={() => onMethodChange(method.value, method.label)}
                            >
                                <CardContent
                                    sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                >
                                    {method.icon}

                                    <Typography variant='body1' color='#FFF' mt={1}>
                                        {method.label}
                                    </Typography>

                                </CardContent>

                            </CardActionArea>

                        </Card>

                    </Grid>

                ))}

            </Grid>

        </Box>
    )
}

export default PaymentMethodSelection