import { AddShoppingCartRounded, RemoveShoppingCartRounded } from '@mui/icons-material'
import { Box, Button } from '@mui/material'

type AddCartButtonProps = {
    isItemInCart: boolean
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const AddCartButton = ({ isItemInCart, onClick }: AddCartButtonProps) => {

    //TODO: colors are batshit as of rn because of how the color is changed when hovering parent

    return (

        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                //width: '100%',
                height: '100%',
                cursor: 'pointer',
                backgroundColor: isItemInCart ? '#f05f75' : '#292733',
                borderRadius: '0.25rem',
                transition: 'background-color 0.3s ease-in-out',
                '&:hover': {
                    backgroundColor: isItemInCart ? '#ff8095 !important' : '#C85CD1 !important',
                    //boxShadow: '0 0 10px rgba(200, 92, 209, 0.8), 0 0 15px rgba(200, 92, 209, 0.6), 0 0 20px rgba(200, 92, 209, 0.4)',
                }
            }}
            onClick={onClick}
        >
            <Button
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    //width: '100%',
                    height: '100%',
                    minWidth: 0,
                    padding: '6px',
                    color: '#FFF',
                    backgroundColor: 'transparent',
                    '&:hover': {
                        backgroundColor: 'transparent',
                    }
                }}
            >
                {isItemInCart ? <RemoveShoppingCartRounded /> : <AddShoppingCartRounded />}
            </Button>
        </Box>

    )
}

export default AddCartButton