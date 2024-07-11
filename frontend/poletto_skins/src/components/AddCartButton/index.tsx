import { AddShoppingCartRounded, RemoveShoppingCartRounded } from '@mui/icons-material'
import { Box, Button } from '@mui/material'

type AddCartButtonProps = {
    isItemInCart: boolean
    isHovered?: boolean
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const AddCartButton = ({ isItemInCart, onClick, isHovered }: AddCartButtonProps) => {

    return (

        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                cursor: 'pointer',
                backgroundColor: isItemInCart ? '#f05f75' : isHovered ? '#806cf5' : '#292733',
                borderRadius: '0.25rem',
                transition: 'background-color 0.3s ease-in-out',
                '&:hover': {
                    backgroundColor: isItemInCart ? '#ff8095' : '#9F8FFF'
                }
            }}
            onClick={onClick}
        >
            <Button
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
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