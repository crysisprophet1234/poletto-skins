import { Box, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { AddShoppingCartRounded, RemoveShoppingCartRounded } from '@mui/icons-material'
import { useCart } from '@/hooks/useCart'
import { Listing } from '@/types/entities/listing'
import { extractStickerFinish } from '@/utils/extractStickerFinish'
import { itemWearAbbreviator, WearName } from '@/utils/itemWearAbbreviator'
import AddItemButton from '@/components/AddItemButton'

type ListingCartMiniatureProps = {
    listing: Listing
}

const ItemCartMiniature = ({ listing }: ListingCartMiniatureProps) => {

    const { removeFromCart, isListingInCart } = useCart()

    const imageDimensions = {
        width: 115,
        height: 90
    }

    return (
        <Paper
            elevation={3}
            sx={{
                width: '100%',
                height: '100%',
                bgcolor: '#1c1a24',
                padding: 2,
                color: '#FFF'
            }}
        >
            <Stack
                direction='column'
                justifyContent='space-between'
                height='100%'
                width={imageDimensions.width}
            >
                <Stack gap={1}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <img
                            src={`${listing.item.imageUrl}/${imageDimensions.width}fx${imageDimensions.height}f`}
                            alt={listing.item.itemName}
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
                                    {listing.item.fullItemName}
                                </Typography>
                            }
                        >
                            <Typography noWrap fontSize={'14px'}>
                                {listing.item.weaponType.toLowerCase() == 'sticker'
                                    ? listing.item.stickers[0].name
                                    : listing.item.itemName
                                }
                            </Typography>
                        </Tooltip>

                        <Box>
                            {['sticker', 'operator'].includes(listing.item.weaponType.toLowerCase())
                                ?
                                <Typography fontSize={'14px'}>
                                    {extractStickerFinish(listing.item.fullItemName)}
                                </Typography>
                                :
                                <Stack direction={'row'} justifyContent={'space-between'}>
                                    {listing.item.quality == 9 &&
                                        <Typography color='#CF6A32' fontSize={'14px'}>
                                            ST
                                        </Typography>
                                    }

                                    {listing.item.wearName &&
                                        <Typography fontSize={'14px'}>
                                            {itemWearAbbreviator(listing.item.wearName as WearName)}
                                        </Typography>
                                    }

                                    {listing.item.floatValue &&
                                        <Typography fontSize={'14px'}>
                                            {listing.item.floatValue.toFixed(4)}
                                        </Typography>
                                    }
                                </Stack>
                            }
                        </Box>
                    </Box>
                </Stack>

                <Box height={'28px'}>
                    <AddItemButton
                        isItemInCart={true}
                        onClick={() => removeFromCart(listing.id)}
                    >
                        {isListingInCart(listing.id)
                            ? <RemoveShoppingCartRounded />
                            : <AddShoppingCartRounded />
                        }
                    </AddItemButton>
                </Box>
            </Stack>
        </Paper>
    )
}

export default ItemCartMiniature