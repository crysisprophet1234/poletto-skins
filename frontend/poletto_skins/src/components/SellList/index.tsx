import { useCart } from '@/hooks/useCart'
import { Stack, Typography } from '@mui/material'
import SellItem from './SellItem'


const SellList = () => {

    const { cart } = useCart()

    return (

        <Stack direction={'column'} gap={2} alignItems={'flex-start'} p={2} bgcolor={'#292733'} borderRadius={'5px'}>

            <Typography variant={'h6'} fontWeight={'bold'} mb={'6px'}>
                Lista de Venda
            </Typography>

            {cart.map(item => (
                <SellItem item={item} />
            ))}

        </Stack>
    )

}

export default SellList