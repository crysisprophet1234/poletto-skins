import { Box, Button } from '@mui/material'
import { ReactElement } from 'react'

type AddItemButtonProps = {
    isItemInCart: boolean
    isHovered?: boolean
    children: ReactElement
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const AddItemButton = ({ isItemInCart, onClick, children, isHovered }: AddItemButtonProps) => {

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
                disableRipple
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
                {children}
            </Button>
        </Box>

    )
}

export default AddItemButton