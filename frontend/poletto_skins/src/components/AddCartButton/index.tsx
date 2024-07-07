import { AddShoppingCartRounded } from '@mui/icons-material'
import { Box, Button } from '@mui/material'

type AddCartButtonProps = {
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const AddCartButton = ({ onClick }: AddCartButtonProps) => {

    return (

        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                cursor: 'pointer',
                backgroundColor: '#292733',
                borderRadius: '0.25rem',
                transition: 'background-color 0.3s ease-in-out',
                '&:hover': {
                    backgroundColor: '#C85CD1 !important',
                    boxShadow: '0 0 10px rgba(200, 92, 209, 0.8), 0 0 15px rgba(200, 92, 209, 0.6), 0 0 20px rgba(200, 92, 209, 0.4)',
                }
            }}
            onClick={(e) => onClick(e)}
        >
            <Button
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    minWidth: 0,
                    padding: '6px',
                    backgroundColor: 'transparent',
                    '&:hover': {
                        backgroundColor: 'transparent',
                    }
                }}
            >
                <AddShoppingCartRounded sx={{ fill: '#FFF' }} />
            </Button>
        </Box>

    )
}

export default AddCartButton