import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar'
import Alert, { AlertProps } from '@mui/material/Alert'
import { Portal } from '@mui/material'

type SnackbarAlertProps = {
    open: boolean
    handleClose: () => void
    container: HTMLElement
    timeout: number
    anchorOrigin: SnackbarOrigin
    message: string
    severity: AlertProps['severity']
}

const SnackbarAlert = ({
    open,
    handleClose,
    container,
    timeout,
    anchorOrigin,
    message,
    severity
}: SnackbarAlertProps) => {

    return (

        <Portal container={container}>

            <Snackbar
                open={open && !!message}
                autoHideDuration={timeout}
                onClose={handleClose}
                anchorOrigin={anchorOrigin}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>

            </Snackbar>

        </Portal>

    )

}

export default SnackbarAlert