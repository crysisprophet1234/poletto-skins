import { Button, CircularProgress } from '@mui/material'

type BuyModalButton = {
    onClick: () => void
    loading: boolean
    text: string
    color: string
    hoverColor: string
    disabled?: boolean
}

const BuyModalButton = ({ onClick, loading, text, color, hoverColor, disabled }: BuyModalButton) => {

    return (
        <Button
            onClick={onClick}
            disabled={loading || disabled}
            sx={{
                color: '#FFF',
                fontWeight: 'bold',
                width: 'calc(100% - 16px)',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: color,
                '&:hover': {
                    backgroundColor: hoverColor
                }
            }}
        >
            {loading ? <CircularProgress size={30} sx={{ color: '#FFF' }} /> : text}
        </Button>
    )

}

export default BuyModalButton