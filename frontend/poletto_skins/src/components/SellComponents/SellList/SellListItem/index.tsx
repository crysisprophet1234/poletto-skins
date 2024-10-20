import FormInputCurrency from '@/components/FormComponents/FormInputCurrency'
import { useSell } from '@/hooks/useSell'
import { MarketItem } from '@/types/entities/steam-item'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Stack, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { number, z } from 'zod'
import ItemCard from '@sell/ItemCard'

interface SellListItemProps {
    marketItem: MarketItem
}

const priceSchema = z.object({
    sellingPrice: number(),
    userPrice: number()
})

type PriceSchemaType = z.infer<typeof priceSchema>

const SellListItem = ({ marketItem }: SellListItemProps) => {

    const TAX_RATE = 0.1

    const { updateItemValue, removeFromSellList } = useSell()

    const {
        control,
        setValue,
        watch
    } = useForm<PriceSchemaType>({
        resolver: zodResolver(priceSchema),
        defaultValues: {
            sellingPrice: marketItem.price.lowestPrice,
            userPrice: marketItem.price.lowestPrice * (1 - TAX_RATE) * 100 / 100
        }
    })

    const sellingPrice = watch('sellingPrice')

    useEffect(() => {

        if (marketItem.price.lowestPrice !== sellingPrice) {
            updateItemValue(marketItem.item.assetId, sellingPrice)
            setValue('userPrice', sellingPrice * (1 - TAX_RATE) * 100 / 100)
        }

    }, [sellingPrice, setValue, marketItem, updateItemValue])

    return (
        <Box sx={{ mb: 2, pr: 1 }}>
            <Stack direction={'row'} spacing={1} height={'260px'}>
                <Box sx={{ transform: 'scale(0.9, 0.75)', transformOrigin: 'top center' }}>
                    <ItemCard
                        itemProps={marketItem}
                        itemAction={() => removeFromSellList(marketItem.item.assetId)}
                        openModal={() => { }}
                    />
                </Box>
                <Box>
                    <Stack spacing={2}>
                        <Box>
                            <Typography>Valor de Venda</Typography>
                            <FormInputCurrency
                                name={'sellingPrice'}
                                control={control}
                                label='Valor de venda'
                            />
                        </Box>

                        <Box>
                            <Typography>Você recebe</Typography>
                            <FormInputCurrency
                                name={'userPrice'}
                                control={control}
                                label='Você recebe'
                                disabled
                            />
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default SellListItem