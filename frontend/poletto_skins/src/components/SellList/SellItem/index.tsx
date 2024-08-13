import ItemCartMiniature from '@/components/Cart/ItemCartPopup/ItemCartMiniature'
import { MarketItem } from '@/types/entities/steam-item'
import { RemoveCircle } from '@mui/icons-material'
import { Box, IconButton, Stack, TextField, Typography } from '@mui/material'

type SellItemProps = {
    item: MarketItem
}

const SellItem = ({ item }: SellItemProps) => {

    return (

        <Box
            sx={{
                minWidth: '350px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >

            <Stack direction={'row'} justifyContent={'space-between'}>

                <Box>
                    <ItemCartMiniature item={item} />
                </Box>

                <Typography variant='body2'>
                    {item.itemName}
                </Typography>

                <IconButton sx={{ alignItems: 'flex-start' }}>
                    <RemoveCircle
                        fontSize='large'
                        sx={{
                            fill: '#f05f75',
                            '&:hover': {
                                fill: '#ff8095'
                            }
                        }}
                    />
                </IconButton>

            </Stack>

            <Box
                component='form'
                noValidate
                autoComplete='off'
                display='flex'
                flexDirection='row'
                gap={2}
            >
                <TextField
                    id='outlined-number'
                    label='Você recebe'
                    type='number'
                    size='small'
                    InputLabelProps={{
                        shrink: true,
                        sx: { fontSize: '1.25rem', color: '#FFF' }, // Adjust label font size here
                    }}
                    InputProps={{
                        sx: {
                            backgroundColor: '#403D4D', // Set background color
                            color: '#fff', // Optional: Set text color to ensure readability
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#403D4D', // Optional: Set border color to match background
                            }
                        },
                    }}
                />

                <TextField
                    id='outlined-number'
                    label='Comprador paga'
                    type='number'
                    size='small'
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </Box>


        </Box>
    )
}

export default SellItem