import { IconButton } from '@mui/material'

type NavbarButtonProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    children?: React.ReactNode
}

const NavbarButton = ({ onClick, children }: NavbarButtonProps) => {

    return (

        <IconButton
            onClick={onClick}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center',
                borderRadius: '5px',
                color: '#FFF',
                height: '100%',
                cursor: 'pointer',
                paddingX: '16px',
                backgroundColor: '#292733',
                '&:hover': {
                    backgroundColor: '#3a3845'
                }
            }}
        >
            {children}
        </IconButton>

    )

}

export default NavbarButton