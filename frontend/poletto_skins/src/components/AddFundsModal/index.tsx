import { useEffect, useState } from 'react'
import { Close } from '@mui/icons-material'
import {
    Modal,
    Box,
    Typography,
    Button,
    IconButton,
    Grid,
    Alert,
    Snackbar,
    Portal,
    CircularProgress
} from '@mui/material'
import { number, z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import PaymentMethodSelection from './PaymentMethodSelection'
import AmountInput from './AmountInput'
import { useAuth } from '@/hooks/useAuth'
import { post } from '@/services/api'

type AddFundsModalProps = {
    open: boolean
    onClose: () => void
}

const depositSchema = z.object({
    amount: number(),
    method: z.string()
})

export type DepositSchemaType = z.infer<typeof depositSchema>

const AddFundsModal = ({ open, onClose }: AddFundsModalProps) => {

    const { user, refreshUser } = useAuth()

    const [loading, setLoading] = useState(false)

    const [success, setSuccess] = useState({
        isSuccess: false,
        message: ''
    })

    const [openSnackbar, setOpenSnackbar] = useState(false)

    const {
        control,
        setValue,
        reset,
        watch,
        handleSubmit
    } = useForm<DepositSchemaType>({
        resolver: zodResolver(depositSchema),
        defaultValues: {
            amount: 0,
            method: 'PIX'
        }
    })

    const watchedAmount = watch('amount')
    const watchedMethod = watch('method')

    const [paymentMethodLabel, setPaymentMethodLabel] = useState('Pix')

    const handleAmountChange = (value: number) => {
        if (value == 0) {
            setValue('amount', 0)
        } else {
            setValue('amount', watchedAmount + value)
        }
    }

    const handlePaymentMethodChange = (method: string, label: string) => {
        setValue('method', method)
        setPaymentMethodLabel(label)
    }

    const onSubmit = async (data: DepositSchemaType) => {

        setLoading(true)

        if (!user) {
            throw new Error('Usuário deve estar logado.')
        }

        const requestData = {
            user: {
                id: user.id
            },
            amount: data.amount,
            type: 'DEPOSIT',
            paymentMethod: data.method
        }

        await post('/balance/add-funds', requestData)
            .then(() => {

                setSuccess({
                    isSuccess: true,
                    message: 'Depósito realizado com sucesso!'
                })

                setOpenSnackbar(true)

                reset({ amount: 0, method: 'PIX' })

                refreshUser()
            })
            .catch((error) => {

                setSuccess({
                    isSuccess: false,
                    message: `Erro ao realizar o depósito: ${(error as Error).message}`
                })

                setOpenSnackbar(true)

                console.error('Error submitting deposit:', error)

            }).finally(() => {
                setLoading(false)
            })
    }

    const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {

        setSuccess({
            isSuccess: false,
            message: ''
        })

        if (reason === 'clickaway') {
            return
        }
        setOpenSnackbar(false)
    }

    useEffect(() => {
        if (open) {
            reset({ amount: 0, method: 'PIX' })
        }
        setPaymentMethodLabel('Pix')
    }, [open, reset])

    return (

        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby='add-funds-modal-title'
            aria-describedby='add-funds-modal-description'
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 900,
                    bgcolor: '#282633',
                    borderRadius: '0.5rem',
                    boxShadow: 24,
                    p: 4,
                    outline: 0,
                }}
            >
                <Box display='flex' justifyContent='space-between' alignItems='center' mb={2}>
                    <Typography
                        id='add-funds-modal-title'
                        variant='h5'
                        fontWeight={600}
                        color='#FFF'
                    >
                        Adicionar Fundos
                    </Typography>

                    <IconButton
                        onClick={onClose}
                        sx={{
                            pt: 0,
                            pr: 0
                        }}
                    >
                        <Close
                            fontSize='large'
                            sx={{
                                fill: '#817e8f',
                                '&:hover': {
                                    fill: '#bbb9c7'
                                }
                            }}
                        />
                    </IconButton>

                </Box>

                <Grid container spacing={4}>

                    <Grid item xs={12} md={6}>

                        <AmountInput control={control} onAmountChange={handleAmountChange} />

                        <PaymentMethodSelection currentMethod={watchedMethod} onMethodChange={handlePaymentMethodChange} />

                    </Grid>

                    <Grid item xs={12} md={6}>

                        <Box
                            sx={{
                                p: 2,
                                bgcolor: '#403D4D',
                                borderRadius: '0.5rem',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >

                            <Typography variant='h6' color='#FFF' gutterBottom>
                                Confirmação do Pagamento
                            </Typography>

                            <Box mt={2}>

                                <Typography variant='body2' color='#BCBCC2' gutterBottom>
                                    Método de Pagamento:
                                </Typography>

                                <Typography variant='body1' fontWeight={600} color='#FFF' mb={2}>
                                    {paymentMethodLabel}
                                </Typography>

                                <Typography variant='body2' color='#BCBCC2' gutterBottom>
                                    Valor Total:
                                </Typography>

                                <Typography variant='body1' color='#FFF' mb={2}>
                                    {watchedAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Typography>

                                <Typography variant='body2' color='#BCBCC2' gutterBottom>
                                    <strong>Você irá receber:</strong>
                                </Typography>

                                <Typography
                                    variant='h4'
                                    color='#ffffff'
                                    fontWeight='bold'
                                    mb={2}
                                >
                                    {watchedAmount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                </Typography>

                            </Box>

                            <Box mt='auto'>

                                <Button
                                    variant='contained'
                                    color='primary'
                                    onClick={handleSubmit(onSubmit)}
                                    fullWidth
                                    disabled={watchedAmount <= 0 || !watchedMethod || loading}
                                    sx={{
                                        bgcolor: '#806cf5',
                                        color: '#FFF',
                                        '&:hover': {
                                            bgcolor: '#9F8FFF'
                                        }
                                    }}
                                >
                                    {loading
                                        ? <CircularProgress size={24} sx={{ color: '#FFF', marginRight: '8px' }} />
                                        : 'Confirmar Pagamento'
                                    }
                                </Button>

                            </Box>

                        </Box>

                    </Grid>

                </Grid>

                <Portal container={document.body}>

                    <Snackbar
                        open={openSnackbar && !!success.message}
                        autoHideDuration={5000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    >
                        <Alert
                            onClose={handleClose}
                            severity={success.isSuccess ? 'success' : 'error'}
                            sx={{
                                width: '100%'
                            }}
                        >
                            {success.message}
                        </Alert>
                    </Snackbar>

                </Portal>

            </Box>

        </Modal>

    )
}

export default AddFundsModal