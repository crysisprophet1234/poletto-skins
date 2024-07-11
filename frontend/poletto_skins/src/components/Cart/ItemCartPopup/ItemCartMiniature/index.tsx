import { ItemType } from '@/types/entities/item'
import { Box, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { useCart } from '../../../../hooks/useCart'
import AddCartButton from '../../../AddCartButton'

type ItemCartMiniatureProps = {
    item: ItemType
}

const ItemCartMiniature = ({ item }: ItemCartMiniatureProps) => {

    const { removeFromCart } = useCart()

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
                        alt={item.name}
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
                                {`${'subCategory' in item ? item.subCategory : item.category} | ${item.name}`}
                            </Typography>
                        }
                    >
                        <Typography noWrap fontSize={'14px'}>
                            {`${'subCategory' in item ? item.subCategory : ''} ${item.name}`}
                        </Typography>
                    </Tooltip>

                    <Stack direction={'row'} justifyContent={'space-between'} fontSize={'14px'}>

                        {'statTrak' in item &&
                            <Typography color='#CF6A32' fontSize={'14px'}>
                                ST
                            </Typography>
                        }

                        {'floatShort' in item &&
                            <Typography fontSize={'14px'}>
                                {item.floatShort}
                            </Typography>
                        }

                        {'floatFull' in item &&
                            <Typography fontSize={'14px'}>
                                {item.floatFull.toFixed(4)}
                            </Typography>
                        }

                        {'finish' in item &&
                            <Typography fontSize={'14px'}>
                                {item.finish}
                            </Typography>
                        }

                    </Stack>

                </Box>

                <Box height={'28px'}>
                    <AddCartButton isItemInCart={true} onClick={() => removeFromCart(item.id)} />
                </Box>

            </Stack >

        </Paper >

    )

}

export default ItemCartMiniature