import { useCart } from '@/hooks/useCart'
import { ShoppingCart } from '@mui/icons-material'
import { Badge, Button, Typography } from '@mui/material'

type ShowCartButtonProps = {
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ShowCartButton = ({ handleClick }: ShowCartButtonProps) => {

    const { totalItems, totalPrice } = useCart()

    return (

        <Button
            onClick={handleClick}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                gap: '10px',
                color: '#FFF',
                height: '100%',
                minWidth: 'fit-content',
                flex: 1,
                cursor: 'pointer',
                paddingX: '16px',
                paddingY: '6px',
                backgroundColor: totalItems > 0 ? '#806cf5' : '#403D4D',
                '&:hover': {
                    backgroundColor: totalItems > 0 ? '#9f8fff' : '#5A5565'
                }
            }}
        >
            <>
                <Typography lineHeight={1} fontWeight={500}>
                    R$ {totalPrice.toFixed(2)}
                </Typography>
                <Badge badgeContent={totalItems} max={9} sx={{
                    '& .MuiBadge-badge': {
                        top: '5.5px',
                        right: '-3px',
                        fontSize: '12px',
                        backgroundColor: '#5f2cff',
                        padding: .5,
                        minWidth: '16px', // Adjust width as needed
                        height: '16px'
                    }
                }}>
                    <ShoppingCart />
                </Badge>
            </>
        </Button>

    )
}

export default ShowCartButton