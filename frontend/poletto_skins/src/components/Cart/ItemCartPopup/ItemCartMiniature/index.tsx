import AddCartButton from '@/components/AddCartButton'
import { useCart } from '@/hooks/useCart'
import { MarketItem } from '@/types/entities/steam-item'
import { extractStickerFinish } from '@/utils/extractStickerFinish'
import { itemWearAbbreviator, WearName } from '@/utils/itemWearAbbreviator'
import { AddShoppingCartRounded, RemoveShoppingCartRounded } from '@mui/icons-material'
import { Box, Paper, Stack, Tooltip, Typography } from '@mui/material'

type ItemCartMiniatureProps = {
    item: MarketItem
}

const ItemCartMiniature = ({ item }: ItemCartMiniatureProps) => {

    const { removeFromCart, isItemInCart } = useCart()

    const imageDimensions = {
        width: 115,
        height: 90
    }

    return (

        <Paper
            elevation={3}
            sx={{
                width: '100%',
                bgcolor: '#1c1a24',
                padding: 2,
                color: '#FFF'
            }}
        >
            <Stack
                direction='column'
                gap={1}
                width={imageDimensions.width}
            >

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <img
                        src={`${item.imageUrl}/${imageDimensions.width}fx${imageDimensions.height}f`}
                        alt={item.itemName}
                        loading='lazy'
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'fill'
                        }}
                    />

                </Box>

                <Box>

                    <Tooltip
                        placement='top'
                        arrow
                        title={
                            <Typography>
                                {item.fullItemName}
                            </Typography>
                        }
                    >
                        <Typography noWrap fontSize={'14px'}>
                            {item.weaponType.toLowerCase() == 'sticker'
                                ? item.stickers[0].name
                                : item.itemName
                            }
                        </Typography>
                    </Tooltip>

                    <Box>

                        {item.weaponType.toLowerCase() == 'sticker'
                            ?
                            <Typography fontSize={'14px'}>
                                {extractStickerFinish(item.fullItemName)}
                            </Typography>
                            :
                            <Stack direction={'row'} justifyContent={'space-between'}>
                                {item.quality == 9 &&
                                    <Typography color='#CF6A32' fontSize={'14px'}>
                                        ST
                                    </Typography>
                                }

                                {item.wearName &&
                                    <Typography fontSize={'14px'}>
                                        {itemWearAbbreviator(item.wearName as WearName)}
                                    </Typography>
                                }

                                {item.floatValue &&
                                    <Typography fontSize={'14px'}>
                                        {item.floatValue.toFixed(4)}
                                    </Typography>
                                }
                            </Stack>
                        }

                    </Box>

                </Box>

                <Box height={'28px'}>
                    <AddCartButton
                        isItemInCart={true}
                        onClick={() => removeFromCart(item.assetId)}
                    >
                        {isItemInCart(item.assetId)
                            ? <RemoveShoppingCartRounded />
                            : <AddShoppingCartRounded />
                        }
                    </AddCartButton>
                </Box>

            </Stack >

        </Paper >

    )

}

export default ItemCartMiniature